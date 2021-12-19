import { ResultReason, SpeechConfig, AudioConfig, SpeechRecognizer } from 'microsoft-cognitiveservices-speech-sdk';
import axios from 'axios';
import { useState, useEffect } from 'react'
import { TextAnalyticsClient, AzureKeyCredential } from "@azure/ai-text-analytics";
import { writeToEmotionContainer } from '@lib/emotionContainer';

const sentimentAnalysisWithOpinionMining = async (text, setFunc) => {
  const key = '57f53b75f70f4aeb9c1f70309495fe8b';
  const endpoint = 'https://papipuppe-language-service-01.cognitiveservices.azure.com/'
  const textAnalyticsClient = new TextAnalyticsClient(endpoint,  new AzureKeyCredential(key));

  const sentimentInput = [
    {
      text: text,
      // text: '昨日ね聞いてよ硫酸嫌だよね。やっぱり人の前で喋るのは嫌だよね。いや、無理無理だって発表とか怖いもん恥ずかしいはもう離婚したしさ最悪、アメリカコロナもさあじゃまだしもマスクも邪魔やだ。やりたくないもうお腹痛い眠たい帰りたい。離婚しちゃったんだよね。',
      id: "0",
      language: "ja"
    }
  ];
  const results = await textAnalyticsClient.analyzeSentiment(sentimentInput, { includeOpinionMining: true, modelVersion: '2021-10-01-preview' });
  setFunc(results)
}
const newItem = (pos, feeling, text) => {
  const d = new Date()
  const date = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`
  return {
    "Date": date,
    "User": "1",
    "Lat": pos.latitude,
    "Lng": pos.longitude,
    "DocumentText": text,
    "OverallSentiment": feeling[0].sentiment,
    "SentimentConfidenceScores": feeling[0].confidenceScores,
  }
}

export const useSpeechInput = () => {
  const [isAvailable, setAvailable] = useState(false);
  const [position, setPosition] = useState(undefined);
  const [feeling, setFeeling] = useState(undefined);
  const [displayText, setDisplayText] = useState(undefined);
  const [authToken, setAuthToken] = useState(undefined);
  const [speechStatus, setSpeechStatus]  = useState('initialize')
  const speechKey = 'b326dbf6a7e84c939627258908fff724'
  const region='japaneast'

  // === begin for mic ====
  useEffect(async () => {
    const headers = { 
        headers: {
            'Ocp-Apim-Subscription-Key': speechKey,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const tokenResponse = await axios.post(`https://${region}.api.cognitive.microsoft.com/sts/v1.0/issueToken`, null, headers);
    setAuthToken(tokenResponse.data)
  }, [authToken]);

  const sttFromMic = async () => {
    const speechConfig = SpeechConfig.fromAuthorizationToken(authToken, region);
    speechConfig.speechRecognitionLanguage = 'ja-JP';
    
    const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new SpeechRecognizer(speechConfig, audioConfig);

    setDisplayText('speak into your microphone...');
    recognizer.recognizeOnceAsync(result => {
        let displayText;
        if (result.reason === ResultReason.RecognizedSpeech) {
            displayText = result.text
        } else {
            displayText = 'ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.';
        }
        sentimentAnalysisWithOpinionMining(displayText, setFeeling)
        setDisplayText(displayText)
    });
  }
  // === end for mic ===
  useEffect(() => {
    if ('geolocation' in navigator) {
      setAvailable(true);
    }
  }, [isAvailable]);

  const getCurrentPosition = (setFunc) => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setFunc({ latitude, longitude });
    });
  };

  useEffect(() => {
    const [pos, fel] = [position, feeling]
    if(pos && fel) {
      const item = newItem(pos, fel, displayText)
      writeToEmotionContainer(item)
      // DBに登録した場合は初期化して、次のインプットに備える
      setPosition(undefined);
      setFeeling(undefined);
      setSpeechStatus('finished')
    }
  }, [position, feeling]);

  const callback = async() => {
    setSpeechStatus('loading')
    getCurrentPosition(setPosition);
    sttFromMic();
  }

  return { callback, displayText, speechStatus }
};

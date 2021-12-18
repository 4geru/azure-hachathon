// import { ResultReason, SpeechConfig, AudioConfig, SpeechRecognizer } from 'microsoft-cognitiveservices-speech-sdk';
// import axios from 'axios';
// import { useState, useEffect } from 'react'
// import { TextAnalyticsClient, AzureKeyCredential } from "@azure/ai-text-analytics";
// // import sentimentAnalysisWithOpinionMining from '@lib/feeling'

// const sentimentAnalysisWithOpinionMining = async (text) => {
//   const key = '57f53b75f70f4aeb9c1f70309495fe8b';
//   const endpoint = 'https://papipuppe-language-service-01.cognitiveservices.azure.com/'
//   const textAnalyticsClient = new TextAnalyticsClient(endpoint,  new AzureKeyCredential(key));

//   const sentimentInput = [
//     {
//       text: text,
//       // text: '昨日ね聞いてよ硫酸嫌だよね。やっぱり人の前で喋るのは嫌だよね。いや、無理無理だって発表とか怖いもん恥ずかしいはもう離婚したしさ最悪、アメリカコロナもさあじゃまだしもマスクも邪魔やだ。やりたくないもうお腹痛い眠たい帰りたい。離婚しちゃったんだよね。',
//       id: "0",
//       language: "ja"
//     }
//   ];
//   const results = await textAnalyticsClient.analyzeSentiment(sentimentInput, { includeOpinionMining: true, modelVersion: '2021-10-01-preview' });
//   debugger
//   // for (let i = 0; i < results.length; i++) {
//   //   const result = results[i];
//   //   console.log(`- Document ${result.id}`);
//   //   if (!result.error) {
//   //     console.log(`\tDocument text: ${sentimentInput[i].text}`);
//   //     console.log(`\tOverall Sentiment: ${result.sentiment}`);
//   //     console.log("\tSentiment confidence scores:", result.confidenceScores);
//   //     console.log("\tSentences");
//   //     for (const { sentiment, confidenceScores, opinions } of result.sentences) {
//   //       console.log(`\t- Sentence sentiment: ${sentiment}`);
//   //       console.log("\t  Confidence scores:", confidenceScores);
//   //       console.log("\t  Mined opinions");
//   //       for (const { target, assessments } of opinions) {
//   //         console.log(`\t\t- Target text: ${target.text}`);
//   //         console.log(`\t\t  Target sentiment: ${target.sentiment}`);
//   //         console.log("\t\t  Target confidence scores:", target.confidenceScores);
//   //         console.log("\t\t  Target assessments");
//   //         for (const { text, sentiment } of assessments) {
//   //           console.log(`\t\t\t- Text: ${text}`);
//   //           console.log(`\t\t\t  Sentiment: ${sentiment}`);
//   //         }
//   //       }
//   //     }
//   //   } else {
//   //     console.error(`\tError: ${JSON.stringify(result.error)}`);
//   //   }
//   // }
// }

// export const useSpeechInput = () => {
//   const [displayText, setDisplayText] = useState('INITIALIZED: ready to test speech...');
//   const [authToken, setAuthToken] = useState(undefined);
//   const speechKey = 'b326dbf6a7e84c939627258908fff724'
//   const region='japaneast'

//   useEffect(async () => {
//     const headers = { 
//         headers: {
//             'Ocp-Apim-Subscription-Key': speechKey,
//             'Content-Type': 'application/x-www-form-urlencoded'
//         }
//     };
//     const tokenResponse = await axios.post(`https://${region}.api.cognitive.microsoft.com/sts/v1.0/issueToken`, null, headers);
//     setAuthToken(tokenResponse.data)
//   }, []);

//   const sttFromMic = async () => {
//     const speechConfig = SpeechConfig.fromAuthorizationToken(authToken, region);
//     speechConfig.speechRecognitionLanguage = 'ja-JP';
    
//     const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
//     const recognizer = new SpeechRecognizer(speechConfig, audioConfig);

//     setDisplayText('speak into your microphone...');
//     recognizer.recognizeOnceAsync(result => {
//         let displayText;
//         if (result.reason === ResultReason.RecognizedSpeech) {
//             displayText = result.text
//         } else {
//             displayText = 'ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.';
//         }
//         sentimentAnalysisWithOpinionMining(displayText)
//         setDisplayText(displayText)
//     });
//   }


//   return { sttFromMic, displayText }
// };

import *  as React from "react"
import { useState, useEffect } from 'react'
import { Container } from 'reactstrap';
import { ResultReason, SpeechConfig, AudioConfig, SpeechRecognizer } from 'microsoft-cognitiveservices-speech-sdk';
import axios from 'axios';

export const SpeechInput = () => {
    const [displayText, setDisplayText] = useState('INITIALIZED: ready to test speech...');
    const [authToken, setAuthToken] = useState(undefined);
    const speechKey = 'b326dbf6a7e84c939627258908fff724'
    const region='japaneast'

    useEffect(async () => {
        const headers = { 
            headers: {
                'Ocp-Apim-Subscription-Key': speechKey,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        const tokenResponse = await axios.post(`https://${region}.api.cognitive.microsoft.com/sts/v1.0/issueToken`, null, headers);
        setAuthToken(tokenResponse.data)
    }, []);

    useEffect(() => {
        // TODO
    }, [displayText])

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
    
            setDisplayText(displayText)
        });
    }

    return (
        <Container className="app-container">
            <h1 className="display-4 mb-3">Speech sample app</h1>
            <div className="row main-container">
                <div className="col-6">
                    <i className="fas fa-microphone fa-lg mr-2" onClick={() => sttFromMic()}></i>
                    <button onClick={() => sttFromMic()}>
                        mew
                    </button>
                    Convert speech to text from your mic.
                </div>
                <div className="col-6 output-display rounded">
                    <code>{displayText}</code>
                </div>
            </div>
        </Container>
    )
}

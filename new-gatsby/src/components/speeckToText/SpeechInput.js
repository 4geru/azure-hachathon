import *  as React from "react"
import { Container } from 'reactstrap';
import { useSpeechInput } from "./hook";
import { useEffect } from 'react'


export const SpeechInput = () => {
    const { displayText, sttFromMic } = useSpeechInput()
    useEffect(() => {
        // TODO
    }, [displayText])

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

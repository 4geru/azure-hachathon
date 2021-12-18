import *  as React from "react"
import { Container } from 'reactstrap';
import { useSpeechInput } from "./hook";
import { useEffect } from 'react'
import { readToEmotionContainer } from '@lib/emotionContainer';



export const SpeechInput = () => {
    const { displayText, callback } = useSpeechInput()
    readToEmotionContainer()
    useEffect(() => {
        // TODO
    }, [displayText])

    return (
        <Container className="app-container">
            <h1 className="display-4 mb-3">Speech sample app</h1>
            <div className="row main-container">
                <div className="col-6">
                    <button onClick={() => callback()}>
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

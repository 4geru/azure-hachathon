import *  as React from "react"
import { useSpeechInput } from "./hook";
import { readToEmotionContainer } from '@lib/emotionContainer';
import { Button } from 'react-bootstrap'
import { Link } from "gatsby"

export const SpeechInput = () => {
    const { displayText, callback, speechStatus } = useSpeechInput()
    readToEmotionContainer()

    const { buttonMessage, contentMessage } = {
        initialize: {
            buttonMessage: '録音開始',
            contentMessage: <Button style={{backgroundColor: '#FAFDC5', color: 'black'}} onClick={callback} className="me-2">
                さあ！<br />録音をはじめよう！
            </Button>
        },
        loading: {
            buttonMessage: '録音中',
            contentMessage: <Button disabled style={{backgroundColor: '#FAFDC5', color: 'black'}} onClick={callback} className="me-2">
                さあ！<br />たくさん会話しよう！
            </Button>
        },
        finished: {
            buttonMessage: '録音終了！',
            contentMessage: <Link to="/map" style={{backgroundColor: '#FAFDC5', color: 'black'}} className='btn button button--link me-2' role="button">
                ポジティブタウンを探そう
            </Link>
        }
    }[speechStatus || 'initialize']

    return (
        <div class="container h-100">
            <div
                class="rounded row align-items-start"
                style={{textAlign: 'center'}}
            >
            <h1 className="display-4 mb-3 text-truncate">録音画面</h1>
            </div>
            <div
                class="rounded h-50 row align-items-start border border-4 border-secondary"
                style={{height: '100px', backgroundColor: 'white', textAlign: 'center'}}
            >
                <h1 style={{paddingTop: "10px"}}>{displayText}</h1>
            </div>
            <div
                class="rounded row align-items-start border border-4 border-secondary"
                style={{height: '100px', backgroundColor: 'white', textAlign: 'center', marginTop: '10px'}}
            >
                <h1 style={{margin: "auto 0"}}>{buttonMessage}</h1>
            </div>
            <div class="row align-items-end h-25">                
                {contentMessage}
            </div>
        </div>
    )
}

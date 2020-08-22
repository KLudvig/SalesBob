import React from 'react';
import './Bob.css'
import BobWaiting from '../../../assets/images/bobWaiting.gif'
import BobThinking from '../../../assets/images/BobThinking.gif'
import {Result} from './Result/Result'
import {Messages} from './Messages/Messages'

export class Bob extends React.Component {
    constructor() {
        super();
        this.state = { 
        BobWaitingImg: require('../../../assets/images/bobWaiting.gif'),
        BobThinkingImg: require('../../../assets/images/BobThinking.gif'),
        BobWaiting: true,
        bobState: 'waiting',
        displayLoader: 'none',
        result: [],
        resultNr: 0,
         }

         this.scrapeData = this.scrapeData.bind(this);
         this.answerNotWork = this.answerNotWork.bind(this);
         this.talkBob = this.talkBob.bind(this);
    }

    scrapeData() {
        /* Change display settings */
        this.setState({ BobWaiting: false, bobState: 'thinking', displayLoader: 'block'})
        /* Fetch to start scraping */
        let postData = { 
            method: 'POST', 
            //body: data,
            //headers: new Headers()
        }
        fetch(`api/scraper`, postData)
        .then(resp => resp.json())
        .then(data => {
            this.setState({ 
                result: [data],
                resultNr: data[0].length,
                BobWaiting: true, 
                displayLoader: 'none', 
                bobState: 'finished' })
            })
    }

    answerNotWork() {
        this.setState({bobState: 'sing'})
    }
    talkBob() {
        this.setState({bobState: 'ask'})
    }

    render() { 
        return(
            <div className="container">
                <div className="bob-container">
                    <div className="bob-image-container">
                        <img alt="Bob" src={(this.state.BobWaiting ? this.state.BobWaitingImg : this.state.BobThinkingImg)} className="BobImage"/>
                    </div>
                    <Messages 
                    bobState={this.state.bobState} 
                    function={this.scrapeData} 
                    answerNotWork={this.answerNotWork} 
                    talkBob={this.talkBob}
                    resultNr={this.state.resultNr} />
                </div>
                <Result display={this.state.displayLoader} data={this.state.result} />
            </div>
        )
    }
}


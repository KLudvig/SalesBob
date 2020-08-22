import React from 'react';
import './Result.css'
import email from '../../../../assets/images/email.png'
import autoSend from '../../../../assets/images/autosend.png'
import remove from '../../../../assets/images/remove.png'
import loading from '../../../../assets/images/loading.gif'

export class Result extends React.Component {

    render() {
        let data = this.props.data
        let listItem = <></>
        let time = ''; //Set time from MongoDB here

        if (data.length > 0) {
            time = 'Last updated ' + data[0][1] // the date and time the data was collected
            console.log('data: ')
            console.log(data)
            listItem = data[0][0].map((item) =>
                <li className="list-items">
                    <div className="list-left">
                        <span className="list-text" style={{
                            display: "block",
                            paddingBottom: 15,
                            fontWeight: 700,
                            fontSize: 18,
                            width: "70%",
                            maxWidth: "70%",
                            cursor: "pointer"
                        }}>
                            <a target="_blank" rel="noopener noreferrer" href={item.url}>
                                {item.jobTitle}
                            </a>
                        </span>
                        <div>
                            <span className="list-text">Company</span>
                            <span className="list-text">Type</span>
                            <span className="list-text">Location</span>
                        </div>
                        <div style={{ marginTop: 8 }}>
                            <span className="list-text list-text-big">{item.companyName}</span>
                            <span className="list-text list-text-big">{item.jobType}</span>
                            <span className="list-text list-text-big">{item.jobLocation}</span>
                        </div>
                    </div>
                    <div className="list-right">
                        <span className="buttons"><a href={"mailto:" + item.email}><img src={email} style={{ width: 28 }} /></a><span className="button-text">Contact</span></span>
                        <span className="buttons"><img src={autoSend} style={{ width: 36 }} /><span className="button-text">Autosend</span></span>
                        <span className="buttons"><img src={remove} style={{ width: 27, marginRight: -22 }} /><span className="button-text">Remove</span></span>
                    </div>
                </li>
            )
        } else {
            listItem = <></>
        }

        return (
            <>
                <div style={{ display: `${this.props.display}` }} class="overlay-when-scraping">
                    <img src={loading} className="loading-icon" />
                </div>
                <div className="result-container">
                    <h1>Results</h1>
                    <span style={{ marginTop: -10, display: "block", fontSize: 14 }}>{time}</span>
                    <div className="selection-box">
                        <h2 className="h2-not-contacted">Not contacted</h2>
                        <span style={{ fontSize: 30, fontWeight: 200 }}> | </span>
                        <h2 className="h2-contacted">Contacted</h2>
                    </div>
                    <div className="not-contacted-container">
                        <ul>
                            {listItem}
                        </ul>
                    </div>
                    <div style={{ display: "none" }} className="contacted-container">
                        <ul>
                            <li className="list-items"></li>
                        </ul>
                    </div>
                </div>
            </>
        )
    }
}

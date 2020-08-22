import React from "react";
import "./Messages.css";
import { NavLink } from "react-router-dom";

export class Messages extends React.Component {
  render() {
    if (this.props.bobState === "waiting") {
      return (
        <div className="messenger-container">
          <div style={{ minWidth: 300 }}>
            <div className="message bob-message">
              Hello, I am ready to work! Should I get started?
            </div>
          </div>
          <div className="answer-container">
            <div onClick={this.props.function} className="answer-yes">
              <span className="message answer"><b>Yes</b>, start looking for leads.</span>
            </div>
            <div onClick={this.props.answerNotWork}>
              <span className="message answer"><b>No</b>, not yet.</span>
            </div>
          </div>
        </div>
      );
    }

    if (this.props.bobState === "thinking") {
      return (
        <div className="messenger-container">
          <div style={{ minWidth: 300 }}>
            <div className="message bob-message">
              I'm working.. do not close this window. This can take a couple of
              minutes.
            </div>
          </div>
          <div className="answer-container"></div>
        </div>
      );
    }

    if (this.props.bobState === "finished") {
      return (
        <div className="messenger-container">
          <div style={{ minWidth: 300 }}>
            <div className="message bob-message">
              I found {this.props.resultNr} new leads🚀 Do you want me to contact them?
            </div>
          </div>
          <div className="answer-container">
            <div onClick={this.props.function} className="answer-yes">
              <span className="message answer"><b>Yes</b>, do it!</span>
            </div>
            <div><span className="message answer"><b>No</b>, I'll do it myself.</span>
            </div>
          </div>
        </div>
      );
    }

    if (this.props.bobState === "sing") {
      return (
        <div className="messenger-container">
          <div style={{ minWidth: 300 }}>
            <div
              style={{
                width: 30,
                fontSize: 25,
                paddingBottom: 5,
                paddingLeft: 15,
                paddingTop: 10,
              }}
              className="message bob-message shakeIt"
            >
              🎶
            </div>
          </div>
          <div className="answer-container">
            <div onClick={this.props.talkBob} className="answer-yes">
              <span className="message answer">Talk to Bob</span>
            </div>
          </div>
        </div>
      );
    }

    if (this.props.bobState === "ask") {
      return (
        <div className="messenger-container">
          <div style={{ minWidth: 300 }}>
            <div
              style={{
                width: 165,
                marginTop: 20,
                marginBottom: 13,
              }}
              className="message bob-message"
            >
              What can I do for you?
            </div>
          </div>
          <div className="answer-container">
            <div onClick={this.props.function} style={{ paddingBottom: 35 }}>
              <span className="message answer">Search new leads.</span>
            </div>
            <div style={{ paddingBottom: 35 }}>
              <span className="message answer">Contact all leads.</span>
            </div>
            <NavLink style={{ color: "white" }} exact to="/settings">
              <div style={{ paddingBottom: 35 }}>
                <span className="message answer">Change Bobs permissions.</span>
              </div>
            </NavLink>
            <div
              onClick={this.props.answerNotWork}
              style={{ paddingBottom: 35 }}
            >
              <span className="message answer">Do nothing.</span>
            </div>
          </div>
        </div>
      );
    }
  }
}

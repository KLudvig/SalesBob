import React from "react";
import "./Settings.css";
import { SideMenu } from "../SideMenu/SideMenu";
import deleteImg from "../../assets/images/delete.png";

export class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      bobAutoCollect: "No",
      bobAutoEmails: "No",
      location: "Halland",
      jobType: "HR",
      fromEmail: "",
      emailSubject: "",
      emailContent: "",
      excludedCompanies: ["Ica", "Ikea"],
    };
  }

  componentDidMount() {
    //load settings from DB
    const postData = {
      method: "POST",
    };
    fetch(`api/loadSettings`, postData)
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          bobAutoCollect: data.settings.bobAutoCollect,
          bobAutoEmails: data.settings.bobAutoEmails,
          location: data.settings.location,
          jobType: data.settings.jobType,
          fromEmail: data.settings.fromEmail,
          emailSubject: data.settings.emailSubject,
          emailContent: data.settings.emailContent,
          excludedCompanies: data.settings.excludedCompanies,
        });
      });
    console.log("Settings Loaded");
  }

  saveSettings = () => {
    const data = this.state;
    const postData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch(`api/saveSettings`, postData).then(alert("Settings saved!"));
  };

  handleBobCollection = (changeEvent) => {
    this.setState({
      bobAutoCollect: changeEvent.target.value,
    });
  };

  handleBobEmails = (changeEvent) => {
    this.setState({
      bobAutoEmails: changeEvent.target.value,
    });
  };

  handleLocation = (changeEvent) => {
    this.setState({
      location: changeEvent.target.value,
    });
  };

  handleJobType = (changeEvent) => {
    this.setState({
      jobType: changeEvent.target.value,
    });
  };

  handleFromEmail = (changeEvent) => {
    this.setState({
      fromEmail: changeEvent.target.value,
    });
  };

  handleEmailSubject = (changeEvent) => {
    this.setState({
      emailSubject: changeEvent.target.value,
    });
  };

  handleEmailContent = (changeEvent) => {
    this.setState({
      emailContent: changeEvent.target.value,
    });
  };

  handleExcludedCompanies = (keyPress) => {
    if (keyPress.keyCode == 13) { //13 is enter key
      //Array concat creates a new array, leaving the old array intact, so we dont mutate the state array
      const newArray = this.state.excludedCompanies.concat(
        keyPress.target.value
      );
      this.setState({ excludedCompanies: newArray });
    }
  };

  removeExcludedCompany = (company) => {
    const newArray = this.state.excludedCompanies.filter(
      (companyInList) => companyInList !== company.target.id
    );
    this.setState({ excludedCompanies: newArray });
  };

  render() {
    let listExcludedCompanies = <></>;
    if (this.state.excludedCompanies != "") {
      listExcludedCompanies = this.state.excludedCompanies.map((item) => (
        <li key={item}>
          <img
            src={deleteImg}
            id={item}
            style={{ width: 15, marginRight: 8, cursor: "pointer" }}
            onClick={this.removeExcludedCompany}
            alt="X"
          />
          {item}
        </li>
      ));
    }

    return (
      <>
        <SideMenu />
        <div className="container">
          <div className="settings-card">
            <h2 className="settings-header">Bob's permissions</h2>
            <h4 className="settings-h4">Let Bob collect leads automatically</h4>
            <input
              type="radio"
              onChange={this.handleBobCollection}
              id="collectYes"
              name="autoCollect"
              value="Yes"
              checked={this.state.bobAutoCollect === "Yes"}
            />
            <label style={{ marginLeft: 8 }} htmlFor="collectYes">
              Yes
            </label>
            <br />
            <input
              style={{ marginTop: 13 }}
              type="radio"
              onChange={this.handleBobCollection}
              id="collectNo"
              name="autoCollect"
              value="No"
              checked={this.state.bobAutoCollect === "No"}
            />
            <label style={{ marginLeft: 8 }} htmlFor="collectNo">
              No, Bob will only collect leads when you tell him to.
            </label>

            <h4 className="settings-h4">Let Bob send emails automatically</h4>
            <input
              type="radio"
              onChange={this.handleBobEmails}
              id="mailYes"
              name="automail"
              checked={this.state.bobAutoEmails === "Yes"}
              value="Yes"
            />
            <label style={{ marginLeft: 8 }} htmlFor="mailYes">
              Yes
            </label>
            <br />
            <input
              style={{ marginTop: 13 }}
              type="radio"
              onChange={this.handleBobEmails}
              id="mailNo"
              name="automail"
              value="No"
              checked={this.state.bobAutoEmails === "No"}
            />
            <label style={{ marginLeft: 8 }} htmlFor="mailNo">
              No, send manually
            </label>
          </div>

          <div className="settings-card">
            <h2 className="settings-header">Lead collection settings</h2>
            <h4 className="settings-h4">Location</h4>
            <select value={this.state.location} onChange={this.handleLocation}>
              <option value="Stockholm">Stockholm</option>
              <option value="Göteborg">Göteborg</option>
              <option value="Malmö">Malmö</option>
              <option disabled>──────────</option>
              <option value="Stockholms län">Stockholms län</option>
              <option value="Västra Götalands län">Västra Götalands län</option>
              <option value="Skåne län">Skåne län</option>
              <option disabled>──────────</option>
              <option value="Blekinge län">Blekinge län</option>
              <option value="Dalarnas län">Dalarnas län</option>
              <option value="Gotlands län">Gotlands län</option>
              <option value="Gävleborgs län">Gävleborgs län</option>
              <option value="Hallands län">Hallands län</option>
              <option value="Jämtlands län">Jämtlands län</option>
              <option value="Jönköpings län">Jönköpings län</option>
              <option value="Kalmar län">Kalmar län</option>
              <option value="Kronobergs län">Kronobergs län</option>
              <option value="Norrbottens län">Norrbottens län</option>
              <option value="Södermanlands län">Södermanlands län</option>
              <option value="Uppsala län">Uppsala län</option>
              <option value="Värmlands län">Värmlands län</option>
              <option value="Västerbottens län">Västerbottens län</option>
              <option value="Västernorrlands län">Västernorrlands län</option>
              <option value="Västmanlands län">Västmanlands län</option>
              <option value="Örebro län">Örebro län</option>
              <option value="Östergötlands län">Östergötlands län</option>
            </select>

            <h4 className="settings-h4">Job type</h4>
            <select value={this.state.jobType} onChange={this.handleJobType}>
              <option value="Economy">Economy</option>
              <option value="HR">HR</option>
              <option value="Industry">Industry</option>
              <option value="IT">IT</option>
              <option value="IT - only programming">
                IT - only programming
              </option>
              <option value="Leaders">Leaders</option>
              <option value="Marketing">Marketing</option>
              <option value="Office work">Office work</option>
              <option value="Sales">Sales</option>
            </select>

            <h4 className="settings-h4">Excluded companies</h4>
            <input
              type="text"
              placeholder="Add company to exclude"
              onKeyDown={this.handleExcludedCompanies}
            />
            <ul className="excluded-company-ul">{listExcludedCompanies}</ul>
          </div>

          <div className="settings-card">
            <h2 className="settings-header">Email settings</h2>
            <h4 className="settings-h4">From email</h4>
            <input
              type="email"
              value={this.state.fromEmail}
              placeholder="Add from email"
              onChange={this.handleFromEmail}
            />

            <h4 className="settings-h4">Email content</h4>
            <input
              value={this.state.emailSubject}
              style={{ minWidth: 250 }}
              type="text"
              placeholder="Email subject line"
              onChange={this.handleEmailSubject}
            />
            <textarea
              value={this.state.emailContent}
              onChange={this.handleEmailContent}
              className="settings-textarea"
              rows="11"
              placeholder="Email text"
            />
          </div>

          <div className="saveButton" onClick={this.saveSettings}>
            Save settings
          </div>
        </div>
      </>
    );
  }
}

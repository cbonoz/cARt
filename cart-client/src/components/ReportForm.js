import React, { Component } from 'react';

import Form from "react-jsonschema-form";
import { uploadReport, getReportUrl } from './../helper/api'
import logo from './../assets/build_sage_icon.png'
import {NotificationContainer, NotificationManager} from 'react-notifications';


const schema = {
    title: "Enter your Construction Lesson Details",
    type: "object",
    properties: {
        country: { type: "string", title: "Country", default: 'US' },
        title: { type: "string", title: "Title", default: 'Overused Materials' },
        description: { type: "string", title: "Description", default: "Overpurchased a particular material while building this project. Scope ahead of time" },
        project_type: { type: "string", title: "Project Type", default: "Condo" },
        construction_technology: { type: "string", title: "Construction Technology", default: "Steel" },
        importance: { type: "number", title: "Importance level: 1 (low), 2 (medium), 3 (high)", default: 2 },
        experience_type: { type: "string", title: "Best Practice or Problem", default: "Best Practice" },
        report_link: { type: "string", title: "Report Link (Optional)", default: "" },
    }
};

class ReportForm extends Component {

    componentWillMount() {
        this.state = {
            value: "",
            loading: false
        }
    }

    upload(data) {
        const self = this;
        const url = getReportUrl()
        const payload = data.formData;
        self.setState({ loading: true });
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(payload), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => {
                self.setState({ value: "", loading: false })
                console.error('Error:', error)
            })
            .then(response => {
                console.log('Success:', response)
                self.setState({ loading: false })
                NotificationManager.success(payload.title, 'Submittted your Report!');
                this.props.history.push('/search')
            });
    }

    render() {
        const self = this;
        const value = self.state.value;
        const loading = self.state.loading;
        return (
            <div>
                <div className="form-area">
                    <img className="centered" src={logo}/>
                    <div className="header-text-area">
                        <h2 className="centered green form-header-text">We get smarter with each contribution</h2>
                    </div>
                    {(value == "" && !loading) && <Form schema={schema}
                        onChange={console.log("changed")}
                        onSubmit={(data) => {self.upload(data)}}
                        onError={console.log("errors")} />}
                    {loading && <h3>Loading...</h3>}
                    {(value != "" && !loading) && <div><p className="centered">Estimate: <span className="green">{value}</span></p></div>}
                </div>
            </div>
        );
    }
}

export default ReportForm;
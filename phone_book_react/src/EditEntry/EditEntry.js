import React, { PureComponent } from 'react';
import { Button } from 'react-bootstrap';

class Addentry extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            entry: null,
            buttonText: "Home Page"
        };
    }

    updateFirstNameValue = (inputEvent) => {
        let { entry } = this.state;
        entry.firstName = inputEvent.target.value;
        if (entry.firstName || entry.lastName || entry.phoneNumber)
            this.setState({ entry: entry, buttonText: "Edit Entry" });
        else
            this.setState({ entry: entry, buttonText: "Home Page" });
    }

    updateLastNameValue = (inputEvent) => {
        let { entry } = this.state;
        entry.lastName = inputEvent.target.value;
        if (entry.firstName || entry.lastName || entry.phoneNumber)
            this.setState({ entry: entry, buttonText: "Edit Entry" });
        else
            this.setState({ entry: entry, buttonText: "Home Page" });
    }

    updatePhoneNumberValue = (inputEvent) => {
        let { entry } = this.state;
        entry.phoneNumber = inputEvent.target.value;
        if (entry.firstName || entry.lastName || entry.phoneNumber)
            this.setState({ entry: entry, buttonText: "Edit Entry" });
        else
            this.setState({ entry: entry, buttonText: "Home Page" });
    }

    copyOldEntry = (oldEntry) => {
        oldEntry.oldPhoneNumber = oldEntry.phoneNumber;
        this.setState({ entry: oldEntry });
    }

    render() {
        const { homePageRenderer, oldEntry } = this.props;
        const { entry, buttonText } = this.state;
        entry === null && this.copyOldEntry(oldEntry);
        return (
            <div >
                <p>FIRST NAME</p>
                <input
                    id="firstName"
                    type="text"
                    placeholder={entry && entry.firstName}
                    onKeyUp={this.updateFirstNameValue}
                />
                <br />

                <p>LAST NAME</p>
                <input
                    id="lastName"
                    type="text"
                    placeholder={entry && entry.lastName}
                    onKeyUp={this.updateLastNameValue}
                />
                <br />

                <p>PHONE NUMBER</p>
                <input
                    id="phoneNumber"
                    type="text"
                    placeholder={entry && entry.phoneNumber}
                    onKeyUp={this.updatePhoneNumberValue}
                />
                <br />
                <br />

                <Button onClick={() => homePageRenderer({ entry: entry, toEdit: true })}>
                    {buttonText}
                </Button>
            </div>
        );
    }
}

export default Addentry;

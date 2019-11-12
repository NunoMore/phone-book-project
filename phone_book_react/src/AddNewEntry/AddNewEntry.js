import React, { PureComponent } from 'react';
import { Button } from 'react-bootstrap';

class AddNewEntry extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            newEntry: {
                firstName: "",
                lastName: "",
                phoneNumber: ""
            },
            buttonText: "Home Page"
        };
    }

    updateFirstNameValue = (inputEvent) => {
        let { newEntry } = this.state;
        newEntry.firstName = inputEvent.target.value;
        if (newEntry.firstName && newEntry.firstName !== ""
            && newEntry.lastName && newEntry.lastName !== ""
            && newEntry.phoneNumber && newEntry.phoneNumber !== "")
            this.setState({ newEntry: newEntry, buttonText: "Add New Entry" });
        else
            this.setState({ newEntry: newEntry, buttonText: "Home Page" });
    }

    updateLastNameValue = (inputEvent) => {
        let { newEntry } = this.state;
        newEntry.lastName = inputEvent.target.value;
        if (newEntry.firstName && newEntry.firstName !== ""
            && newEntry.lastName && newEntry.lastName !== ""
            && newEntry.phoneNumber && newEntry.phoneNumber !== "")
            this.setState({ newEntry: newEntry, buttonText: "Add New Entry" });
        else
            this.setState({ newEntry: newEntry, buttonText: "Home Page" });
    }

    updatePhoneNumberValue = (inputEvent) => {

        // phone number must be unique
        // const isUnique = phoneBookList.find(entry => entry.phoneNumber === inputEvent.target.value) ? false : true;

        // must be of a specific format "+xxx xx xxxxxx"
        // const isRightFormat = inputEvent.target.value.includes('+');

        let { newEntry } = this.state;
        newEntry.phoneNumber = inputEvent.target.value;
        if (newEntry.firstName && newEntry.firstName !== ""
            && newEntry.lastName && newEntry.lastName !== ""
            && newEntry.phoneNumber && newEntry.phoneNumber !== "")
            this.setState({ newEntry: newEntry, buttonText: "Add New Entry" });
        else
            this.setState({ newEntry: newEntry, buttonText: "Home Page" });
    }

    render() {
        const { homePageRenderer, phoneBookList } = this.props;
        const { newEntry, buttonText } = this.state;

        return (
            <div >
                <p>FIRST NAME</p>
                <input
                    id="firstName"
                    type="text"
                    placeholder={newEntry.firstName}
                    onKeyUp={this.updateFirstNameValue}
                />
                <br />

                <p>LAST NAME</p>
                <input
                    id="lastName"
                    type="text"
                    placeholder={newEntry.lastName}
                    onKeyUp={this.updateLastNameValue}
                />
                <br />

                <p>PHONE NUMBER</p>
                <input
                    id="phoneNumber"
                    type="text"
                    placeholder={newEntry.phoneNumber}
                    onKeyUp={() => this.updatePhoneNumberValue()}
                    // onKeyUp={() => this.updatePhoneNumberValue(phoneBookList)}
                />
                <br />
                <br />

                <Button onClick={() => homePageRenderer({ entry: newEntry, toAdd: true })}>
                    {buttonText}
                </Button>
            </div>
        );
    }
}

export default AddNewEntry;

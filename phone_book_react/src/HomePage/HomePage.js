import React, { PureComponent } from 'react';
import { Button } from 'react-bootstrap';
import './HomePage.css';
import NodeApi from '../NodeApi/NodeApi';


class HomePage extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            phoneBookList: [],
            phoneBookFilteredList: [],
            filter: "",
        };
    }

    getPhoneBookList = () => {
        NodeApi.readEntries()
            .then((phoneBookList) => {
                if (phoneBookList && phoneBookList.length !== 0)
                    this.setState({ phoneBookList: phoneBookList });
            });
    }

    filterPhoneBook = () => {
        const { phoneBookList, filter } = this.state;
        var filteredPhoneBook = phoneBookList ? phoneBookList.filter((entry) =>
            entry.firstName.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
            || entry.lastName.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
            || entry.phoneNumber.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
        ) : [];

        this.setState({ phoneBookFilteredList: filteredPhoneBook });
    }

    updateInputValue = (inputEvent) => {
        this.setState({
            filter: inputEvent.target.value
        });
    }

    render() {
        const { phoneBookList, phoneBookFilteredList } = this.state;
        const { editEntryRenderer, addNewEntryRenderer, hasChanges } = this.props;

        // get data from db only when list is empty or hasChanges
        hasChanges || (phoneBookList && phoneBookList.length === 0 && this.getPhoneBookList());
        return (
            <div>
                <input
                    onChange={this.updateInputValue}
                    type="text"
                    id="myInput"
                    onKeyUp={this.filterPhoneBook}
                    placeholder="Search..." />
                {
                    phoneBookFilteredList.length !== 0 &&
                    <table>
                        <tr>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>PhoneNumber</th>
                        </tr>
                        {
                            phoneBookFilteredList.map((entry) =>
                                <tr onClick={() => editEntryRenderer(entry)}>
                                    <td>{entry.firstName}</td>
                                    <td>{entry.lastName}</td>
                                    <td>{entry.phoneNumber}</td>
                                </tr>
                            )
                        }
                    </table>

                    || "There is no data available..."
                }
                <br />

                <Button onClick={addNewEntryRenderer} >
                    Add New Entry
                </Button>
            </div >
        )
    }
}
export default HomePage;
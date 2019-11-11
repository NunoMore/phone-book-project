import './App.css';
import NodeApi from './NodeApi/NodeApi';
import HomePage from './HomePage/HomePage';
import React, { PureComponent } from 'react';
import EditEntry from './EditEntry/EditEntry';
import AddNewEntry from './AddNewEntry/AddNewEntry';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false, // possible necessity to create a loader (?)
      renderHomePage: true,
      renderAddNewEntry: false,
      renderEditEntry: false,
      hasChanges: false,
      oldEntry: null,
    };
  }

  addNewEntryRenderer = () => {
    this.setState({ renderHomePage: false, renderEditEntry: false, renderAddNewEntry: true });
  }

  editEntryRenderer = (entry) => {
    this.setState({ oldEntry: entry, renderHomePage: false, renderEditEntry: true, renderAddNewEntry: false });
  }

  homePageRenderer = ({ entry, toAdd, toDelete, toEdit }) => {
    var hasChanges = false;

    if (toDelete) {
      hasChanges = true;
      NodeApi.deleteEntry(entry.number)
        .then((resultObj) => {
          if (resultObj.success) { console.log("entry deleted") } // toastr stating success
          else { console.log("entry not deleted with error: " + resultObj.sqlMessage) } // toastr stating failed and possibly the sql message associated
        });
    }

    if (toAdd
      && entry.firstName && entry.firstName !== ""
      && entry.lastName && entry.lastName !== ""
      && entry.phoneNumber && entry.phoneNumber !== "") {
      hasChanges = true;
      NodeApi.addNewEntry(entry)
        .then((resultObj) => {
          if (resultObj.success) { console.log("new entry created") } // toastr stating success
          else { console.log("entry not created with error: " + resultObj.sqlMessage) } // toastr stating failed and possibly the sql message associated
        });
    }

    if (toEdit
      && entry.firstName && entry.firstName !== ""
      && entry.lastName && entry.lastName !== ""
      && entry.phoneNumber && entry.phoneNumber !== "") {
      hasChanges = true;
      NodeApi.editEntry(entry)
        .then((resultObj) => {
          if (resultObj.success) { console.log("entry updated") } // toastr stating success
          else { console.log("entry not updated with error: " + resultObj.sqlMessage) } // toastr stating failed and possibly the sql message associated
        });
    }

    this.setState({ renderHomePage: true, renderEditEntry: false, renderAddNewEntry: false, hasChanges: hasChanges });
  }

  render() {
    const {
      loading,
      renderHomePage,
      renderAddNewEntry,
      renderEditEntry,
      hasChanges,
      oldEntry,
    } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          {
            loading &&
            (
              true
              // TODO: create loader 
            )

            ||

            !loading &&
            (
              renderHomePage &&
              <HomePage
                addNewEntryRenderer={this.addNewEntryRenderer}
                editEntryRenderer={this.editEntryRenderer}
                hasChanges={hasChanges}
              />

              ||

              renderEditEntry &&
              <EditEntry
                oldEntry={oldEntry}
                homePageRenderer={this.homePageRenderer}
              />

              ||

              renderAddNewEntry &&
              <AddNewEntry
                homePageRenderer={this.homePageRenderer}
              />
            )
          }
        </header>
      </div>
    );
  }
}
export default App;

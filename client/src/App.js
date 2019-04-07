import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

    // Initialize our state
    state = {
        data: [],
        id: 0,
        message: null,
        intervalIsSet: false,
        idToDelete: null,
        idToUpdate: null,
        objectToUpdate: null
    };

    // When componenet mounts, first thing it does is
    // fetch all existing data in our db then we incorporate
    // a polling logic so that we can easily see if our db
    // has changed and implement those changes into our UI
    componentDidMount() {
        this.getDataFromDB();
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getDataFromDB, 1000);
            this.setState({
                intervalIsSet: interval
            });
        };
    };

    // Never let a process live forever
    // Always kill a process everytime we are done using it
    componentWillUnmount() {
        if (this.state.intervalIsSet) {
            clearInterval(this.state.intervalIsSet);
            this.setState({
                intervalIsSet: null
            });
        };
    };

    // Just a note, here, in the front end, we use th id
    // key of our data object in order to indentify which
    // we want to Update or Delete.
    // For our back end, we use the object id assigned by
    // MongoDB to modify database entries

    // Our first get method that uses our backed api to 
    // fetch data from our database
    getDataFromDB = () => {
        fetch("http://localhost:3001/db/v1/getData")
        .then(data => data.json())
        .then(res => this.setState({
            data: res.data
        }));
    };

    // Our put method that uses our backend API to create
    // new query into our database
    B = message => {
        let currentIds = this.state.data.map(data => data.id);
        let idToBeAdded = 0;
        while (currentIds.includes(idToBeAdded)) {
            ++idToBeAdded;
        };

        axios.post("http://localhost:3001/db/v1/putData", {
            id: idToBeAdded,
            message: message
        });
    };

    // Our delete method that uses our backend API to remove
    // existing database information
    deleteFromDb = idToDelete => {
        let objIdToDelete = null;
        this.state.data.forEach(dat => {
            if (dat.id == idToDelete) {
                objIdToDelete = dat._id;
            };
        });

        axios.delete("http://localhost:3001/db/v1/deleteData", {
            data: {
                id: idToDelete
            }
        });
    };

    // Our update method that uses our backend API to
    // overwrite existing database information
    updateDb = (idToUpdate, updateToApply) => {
        let objIdToUpdate = null;
        this.state.data.forEach(dat => {
            if (dat.id == idToUpdate) {
                objIdToUpdate = dat._id;
            };
        });

        axios.post("http://localhost:3001/db/v1/updateData", {
            id: objIdToUpdate,
            update: {message: updateToApply}
        });
    };

    // Here is our UI
    // It is easy to understand their functions when you
    // se them rendered onto your screen
    render() {
        const { data } = this.state;
        return (
          <div>
            <ul>
              {data.length <= 0
                ? "NO DB ENTRIES YET"
                : data.map(dat => (
                    <li style={{ padding: "10px" }} key={data.message}>
                      <span style={{ color: "gray" }}> id: </span> {dat.id} <br />
                      <span style={{ color: "gray" }}> data: </span>
                      {dat.message}
                    </li>
                  ))}
            </ul>
            <div style={{ padding: "10px" }}>
              <input
                type="text"
                onChange={e => this.setState({ message: e.target.value })}
                placeholder="add something in the database"
                style={{ width: "200px" }}
              />
              <button onClick={() => this.putDataToDB(this.state.message)}>
                ADD
              </button>
            </div>
            <div style={{ padding: "10px" }}>
              <input
                type="text"
                style={{ width: "200px" }}
                onChange={e => this.setState({ idToDelete: e.target.value })}
                placeholder="put id of item to delete here"
              />
              <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
                DELETE
              </button>
            </div>
            <div style={{ padding: "10px" }}>
              <input
                type="text"
                style={{ width: "200px" }}
                onChange={e => this.setState({ idToUpdate: e.target.value })}
                placeholder="id of item to update here"
              />
              <input
                type="text"
                style={{ width: "200px" }}
                onChange={e => this.setState({ updateToApply: e.target.value })}
                placeholder="put new value of the item here"
              />
              <button
                onClick={() =>
                  this.updateDB(this.state.idToUpdate, this.state.updateToApply)
                }
              >
                UPDATE
              </button>
            </div>
          </div>
        );
    }
}

export default App;

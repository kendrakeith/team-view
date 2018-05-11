import React, { Component } from "react";
import axios from "axios";

import NameList from "./components/NameList/NameList.js";

class App extends Component {
  state = {
    names: []
  };

  componentDidMount() {
    axios
      .get("https://h93rvy36y7.execute-api.us-east-1.amazonaws.com/teams")
      .then(response => {
        //Filter by state
        var stateFilter = response.data.filter(data => data.state === "VA");

        //Filter by role
        var roleFilter = [];
        for (var i = 0; i < stateFilter.length; i++) {
          roleFilter.push(
            stateFilter[i].members.filter(
              members => members.role === "Software Engineer"
            )
          );
        }
        var flatArray = [].concat.apply([], roleFilter);

        //Sort by last then first name
        function firstCompare(a, b) {
          if (a.firstName < b.firstName) return -1;
          if (a.firstName > b.firstName) return 1;
          return 0;
        }
        flatArray.sort(firstCompare);

        function lastCompare(a, b) {
          if (a.lastName < b.lastName) return -1;
          if (a.lastName > b.lastName) return 1;
          return 0;
        }
        flatArray.sort(lastCompare);

        //Concat first and last names
        var fullNames = [];
        for (var j = 0; j < flatArray.length; j++) {
          fullNames.push({
            name: flatArray[j].firstName + " " + flatArray[j].lastName
          });
        }

        //Set state
        const newState = Object.assign({}, this.state, {
          names: fullNames
        });

        this.setState(newState);
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="App">
        <NameList names={this.state.names} />
      </div>
    );
  }
}

export default App;

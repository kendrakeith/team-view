import React, { Component } from "react";
import axios from "axios";

import NameList from "./components/NameList/NameList.js";

class App extends Component {
  state = {
    names: []
  };

  componentDidMount() {
    var onlyVirginia = team => team.state === "VA";
    var reduceTeamsToMembers = function(teamMembers, data) {
      data.members.forEach(member => {
        teamMembers.push(member);
      });
      return teamMembers;
    };
    var onlyEngineersAndTechLeads = member =>
      member.role === "Software Engineer" || member.role === "Technical Lead";
    var byLastThenFirst = function(a, b) {
      if (a.lastName > b.lastName) {
        return 1;
      } else if (a.lastName < b.lastName) {
        return -1;
      }
      if (a.firstName > b.firstName) {
        return 1;
      } else if (a.firstName < b.firstName) {
        return -1;
      } else {
        return 0;
      }
    };
    var combineFirstAndLastName = member =>
      JSON.parse(
        '{"name": "' + member.firstName + " " + member.lastName + '" }'
      );

    axios
      .get("https://h93rvy36y7.execute-api.us-east-1.amazonaws.com/teams")
      .then(response => {
        let memberNames = response.data
          .filter(onlyVirginia)
          .reduce(reduceTeamsToMembers, [])
          .filter(onlyEngineersAndTechLeads)
          .sort(byLastThenFirst)
          .map(combineFirstAndLastName);

        const newState = Object.assign({}, this.state, {
          names: memberNames
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

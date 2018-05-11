import React from "react";

import Name from "../Name/Name.js";
import "./name-list.css";

function NameList(props) {
  return (
    <div className="name-list">
      {props.names.map((data, index) => <Name key={index} name={data.name} />)}
    </div>
  );
}

export default NameList;

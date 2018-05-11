import React from "react";
import PropTypes from "prop-types";

import "./name.css";

function Name(props) {
  return (
    <div className="name">
      <span>{props.name}</span>
    </div>
  );
}

Name.propTypes = {
  name: PropTypes.string.isRequired
};

export default Name;

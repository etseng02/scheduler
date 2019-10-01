import React from "react";

const classNames = require('classnames');

export default function Header(props) {
  return (
  <header className="appointment__time">
    <h4 className="text--semi-bold">{props.time}</h4>
    <hr className="appointment__separator" />
  </header>
  )
}
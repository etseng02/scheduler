import React from "react";

import "components/InterviewerListItem.scss";

const classNames = require('classnames');

export default function InterviewerListItem(props) {
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  const formatName = function(name){
    if (props.selected) {
      return name
    }
  }

  return (
    <li 
    className={interviewerClass}
    onClick={() => props.setInterviewer(props.id)}>
    <img
      className="interviewers__item-image"
      src= {props.avatar}
      alt= {props.name}
    />
  {formatName(props.name)}
</li>
  )

}
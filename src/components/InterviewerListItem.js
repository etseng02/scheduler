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
    onClick={() => props.setInterviewer(props.name)}>
    >
    <img
      className="interviewers__item-image"
      src="https://i.imgur.com/LpaY82x.png"
      alt="Sylvia Palmer"
    />
  {formatName(props.name)}
</li>
  )

}
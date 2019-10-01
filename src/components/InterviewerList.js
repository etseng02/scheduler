import React from "react";

import InterviewerListItem from "components/InterviewerListItem"

export default function InterviewerList(props) {

  const interviewers = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      src ={interviewer.avatar}
      selected={interviewer.name === props.name}
      setInterviewer={props.setInterviewer}
      />
    )
  })
return interviewers;
}
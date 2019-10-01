import React from "react";

import "components/InterviewerList";

import InterviewerListItem from "components/InterviewerListItem"

export default function InterviewerList(props) {

  const interviewers = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar ={interviewer.avatar}
      selected={interviewer.id === props.interviewer}
      setInterviewer={props.setInterviewer}
      />
    )
  })
return interviewers;
}
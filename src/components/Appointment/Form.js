import React, { useState } from "react";

import InterviewerList from "components/InterviewerList"
import Button from "components/Button";
const classNames = require('classnames');

export default function Form(props) {
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  const reset = function() {
    setName("")
    setInterviewer(null)
  }

  const cancel = function() {
    reset()
    props.onCancel();
  }

  const save = function() {
    props.onSave(name, interviewer);
  }

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

 
  return (
  <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off">
        <input
          className="appointment__create-input text--semi-bold"
          value={name}
          type="text"
          placeholder="Enter Student Name"
          onChange={(event) => setName(event.target.value)}
        />
      </form>
      <InterviewerList 
      interviewers={props.interviewers}
      interviewer={interviewer}
      setInterviewer={setInterviewer} />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={() => cancel()}>Cancel</Button>
        <Button confirm onClick = {() => save()}>Save</Button>
      </section>
    </section>
  </main>
  )
}
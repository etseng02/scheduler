import React, { useState } from "react";

import InterviewerList from "components/InterviewerList"
import Button from "components/Button";

export default function Form(props) {

  const reset = function() {
    setName("")
    setInterviewer(null)
  }

  const cancel = function() {
    reset()
    props.onCancel();
  }

  // const save = function() {
  //   props.saveAppointment(name, interviewer);
  // }

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    
    props.onSave(name, interviewer);
  }
  

 
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
          data-testid="student-name-input"
        />
      </form>
      <section className="appointment__validation">{error}</section>
      <InterviewerList
      interviewers={props.interviewers}
      interviewer={interviewer}
      setInterviewer={setInterviewer} />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={() => cancel()}>Cancel</Button>
        <Button confirm onClick = {() => validate()}>Save</Button>
      </section>
    </section>
  </main>
  )
}
import React, { Fragment } from 'react'

import "components/Appointment/styles.scss";

import useVisualMode from "hooks/useVisualMode";


import Header from "components/Appointment/Header.js"
import Empty from "components/Appointment/Empty.js"
import Show from "components/Appointment/Show.js"
import Form from "components/Appointment/Form.js"




// All Appointment components will render a Header that takes in a time prop.
// If props.interview is truthy (an interview object) the Appointment will render 
// the <Show /> component, else it should render the <Empty /> component.

// console.log("helloThere!")





export default function Appointment(props) {
  //const Appointments = props.time.map(Appointment => {
    // console.log(props)
    // console.log("PROPS INTERIVEW:", props.interview)
    
    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const CREATE = "CREATE";
    
    const { mode, transition, back } = useVisualMode(
      props.interview ? SHOW : EMPTY
    );

    function addAppointment() {
      transition(CREATE)
    }

    function goBack() {
      back()
    }

    function save(name, interviewer) {
      const interview = {
      student: name,
        interviewer
      };
      props.bookInterview(props.id, interview)
      transition(SHOW)
    }

      return (
        <Fragment>
         <Header
         time = {props.time}
         />
          {mode === SHOW && (
            <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer.name}
            />)}
          {mode === EMPTY && 
          <Empty onAdd = {() => addAppointment()} />}
          {mode === CREATE && 
          <Form 
          interviewers = {props.interviewers}
          onCancel = {() => goBack()} 
          saveAppointment={save}
          />}
        </Fragment>
      )

}
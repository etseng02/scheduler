import React, { Fragment } from 'react'

import "components/Appointment/styles.scss";

import useVisualMode from "hooks/useVisualMode";


import Header from "components/Appointment/Header.js"
import Empty from "components/Appointment/Empty.js"
import Show from "components/Appointment/Show.js"
import Form from "components/Appointment/Form.js"
import Status from "components/Appointment/Status.js"
import Confirm from "components/Appointment/Confirm.js"




// All Appointment components will render a Header that takes in a time prop.
// If props.interview is truthy (an interview object) the Appointment will render 
// the <Show /> component, else it should render the <Empty /> component.

// console.log("helloThere!")





export default function Appointment(props) {
    
    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const CREATE = "CREATE";
    const SAVING = "SAVING";
    const CONFIRM = "CONFIRM";
    const EDIT = "EDIT";
    
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
      transition(SAVING)
      props.bookInterview(props.id, interview)
      transition(SHOW)
    }


    function deleteConfirm () {
      transition(CONFIRM)
    }

    function editForm () {
      transition(EDIT)
    }
    
    function deleteAppointment() {
      const interview = null
      transition(SAVING)
      props.deleteInterview(props.id, interview)
      transition(EMPTY)
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
            onDelete = {() => deleteConfirm()}
            onEdit = {() => editForm()}
            />)}
          {mode === EMPTY && 
          <Empty onAdd = {() => addAppointment()} />}
          {mode === CREATE && 
          <Form 
          interviewers = {props.interviewers}
          onCancel = {() => goBack()} 
          saveAppointment={save}
          />}
          {mode === EDIT && 
          <Form 
          interviewers = {props.interviewers}
          onCancel = {() => goBack()} 
          saveAppointment={save}
          />}
          {mode === SAVING && 
          <Status
          />}
          {mode === CONFIRM && 
          <Confirm
          onCancel = {() => goBack()} 
          onConfirm = {() => deleteAppointment()} 
          />}
        </Fragment>
      )

}
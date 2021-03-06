import React, { Fragment } from 'react'

import "components/Appointment/styles.scss";

import useVisualMode from "hooks/useVisualMode";


import Header from "components/Appointment/Header.js"
import Empty from "components/Appointment/Empty.js"
import Show from "components/Appointment/Show.js"
import Form from "components/Appointment/Form.js"
import Status from "components/Appointment/Status.js"
import Confirm from "components/Appointment/Confirm.js"
import Error from "components/Appointment/Error.js"

export default function Appointment(props) {
  
  //All display modes for each appointment slot
    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const CREATE = "CREATE";
    const SAVING = "SAVING";
    const DELETING = "DELETING";
    const CONFIRM = "CONFIRM";
    const EDIT = "EDIT";
    const ERROR_SAVE = "ERROR_SAVE"
    const ERROR_DELETE = "ERROR_DELETE"
    
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
    
      if (name && interviewer) {
        transition(SAVING, true);
        props.bookInterview(props.id, interview)
        .then((response) => {
          if (response === "saved") {
            transition(SHOW)
          } else {
            transition(ERROR_SAVE, true)
          }
        })
      } else {
        transition(ERROR_SAVE, true)
      }
    }

    function deleteConfirm () {
      transition(CONFIRM)
    }

    function editForm () {
      transition(EDIT)
    }
    
    function deleteAppointment() {
      const interview = null
      transition(DELETING, true)
      props.deleteInterview(props.id, interview)
      .then((response) => {
        if (response === "deleted") {
          transition(EMPTY, true)
        } else {
          transition(ERROR_DELETE, true)
        }
      })
    }


    //adds "5pm" to the end of the appointment lists
    if (props.time === "5pm") {
      return(
      <Header
          time = {props.time}
         />
      )
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
          <Empty
            onAdd = {() => addAppointment()}
          />}

          {mode === CREATE && 
          <Form
            interviewers = {props.interviewers}
            onCancel = {() => goBack()} 
            onSave={save}
          />}

          {mode === SAVING && 
          <Status
            statusMessage = "Saving"
          />}

          {mode === DELETING && 
          <Status
            statusMessage = "Deleting"
          />}

          {mode === CONFIRM && 
          <Confirm
          onCancel = {() => goBack()} 
          onConfirm = {() => deleteAppointment()} 
          />}

          {mode === EDIT && 
          <Form
            name = {props.interview.student}
            interviewer = {props.interview.interviewer.id}
            interviewers = {props.interviewers}
            onCancel = {() => goBack()} 
            onSave={save}
          />}

          {mode === ERROR_SAVE && 
          <Error
            onClose = {() => goBack()}
            errorMessage = "Could not save appointment"
          />}

          {mode === ERROR_DELETE && 
          <Error
            onClose = {() => goBack()}
            errorMessage = "Could not delete appointment"
          />}

        </Fragment>
      )

}
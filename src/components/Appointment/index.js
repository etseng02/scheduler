import React, { Fragment } from 'react'

import "components/Appointment/styles.scss";


import Header from "components/Appointment/Header.js"
import Empty from "components/Appointment/Empty.js"
import Show from "components/Appointment/Show.js"



// All Appointment components will render a Header that takes in a time prop.
// If props.interview is truthy (an interview object) the Appointment will render 
// the <Show /> component, else it should render the <Empty /> component.

// console.log("helloThere!")



export default function Appointment(props) {
  //const Appointments = props.time.map(Appointment => {
    console.log(props)
    console.log("PROPS INTERIVEW:", props.interview)
    
    if (props.interview) {
      return (
        <Fragment>
          <Header
          time = {props.time}
          />
          <Show
          student={props.student}
          interviewer={props.interviewer}
          />
        </Fragment>
      )
    } else {
      return (
        <Fragment>
        <Header
        time = {props.time}
        />
        <Empty
        />
        </Fragment>
      )
    }
}
import React, { Fragment, useEffect } from 'react'

import "components/Appointment/styles.scss";

import useVisualMode from "hooks/useVisualMode";


import Header from "components/Appointment/Header.js"
import Empty from "components/Appointment/Empty.js"
import Show from "components/Appointment/Show.js"



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
    
    const { mode, transition, back } = useVisualMode(
      props.interview ? SHOW : EMPTY
    );
    

      if (props.interview) {
        return (
          <Fragment>
          {mode === SHOW && (
            <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer.name}
            />
          )}
        </Fragment>
        )
      } else if (!props.interview){
        return (
          <Fragment>
          {mode === EMPTY && <Empty onAdd={props.onAdd} />}
          </Fragment>
        )
        
      }
      
      
      
      
    // if (props.interview) {
    //   return (
    //     <Fragment>
    //       <Header
    //       time = {props.time}
    //       />
    //       {mode === SHOW && (
    //         <Show
    //           student={props.interview.student}
    //           interviewer={props.interview.interviewer}
    //         />
    //       )}
    //     </Fragment>
    //   )
    // } else {
    //   return (
    //     <Fragment>
    //       <Header
    //         time = {props.time}
    //       />
    //       {mode === EMPTY && <Empty onAdd={props.onAdd} />}
    //     </Fragment>
    //   )
    // }
}
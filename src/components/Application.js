import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "components/Appointment/index.js"
import {getAppointmentsForDay , getInterview, getInterviewersForDay }from "../helpers/selectors.js"

const axios = require('axios');



export default function Application(props) {
  

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

 useEffect(() => {
  Promise.all([
    Promise.resolve(
      axios
      .get("/api/days")
    ),
    Promise.resolve(
      axios
      .get("/api/appointments")
    ),
    Promise.resolve(
      axios
      .get("/api/interviewers")
    ),
  ]).then((all) => {
    setState({ ...state, 
      days: all[0].data,
      appointments: all[1].data,
      interviewers: all[2].data

    });

  });
},[])


//helper Function calls to assist in displaying and booking an interview
const appointments = getAppointmentsForDay(state, state.day);
const interviewerIDs = getInterviewersForDay(state, state.day);
const interviewers = interviewerIDs.map(id => state.interviewers[id])

function bookInterview(id, interview) {
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };

  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  setState({...state, appointments})

  return axios
    .put(`/api/appointments/${id}`, {
      interview: interview
    })
    .then((response) => {
      return "saved"
    })
    .catch((error) => {
      return "error"
    })

}

function deleteInterview (id, interview) {
  //console.log(id, interview);


  const appointment = {
    ...state.appointments[id],
    interview: null
  };

  
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  
  
  
  axios
  .delete(`/api/appointments/${id}`, {
    // id: id,
    // time: "12pm",
    //interview: {student:null, interviewer:null}
  })
  .then((response) => {
    setState({...state, appointments})
    //console.log(response)
    //console.log("state after appointment change", state.appointments)
  })

  
}

const schedule = appointments.map((appointment) => {

  const interview = getInterview(state, appointment.interview);
  return (
    
    <Appointment
      deleteInterview = {deleteInterview}
      bookInterview = {bookInterview}
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers ={interviewers}
    />
  );
});


  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
      <DayList
        days={state.days}
        day={state.day}
        setDay={setDay}
      />
      </nav>

      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
      {schedule}
      </section>
    </main>
  );
}

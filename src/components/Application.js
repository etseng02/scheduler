import React from "react";
import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "components/Appointment/index.js"
import {getAppointmentsForDay , getInterview, getInterviewersForDay }from "../helpers/selectors.js"
import useApplicationData from "hooks/useApplicationData.js";


export default function Application(props) {
  
  const {
    state,
    setDay,
    bookInterview,
    deleteInterview
  } = useApplicationData();

//helper Function calls to assist in displaying and booking an interview
const appointments = getAppointmentsForDay(state, state.day);
const interviewerIDs = getInterviewersForDay(state, state.day);
const interviewers = interviewerIDs.map(id => state.interviewers[id])

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
      <nav className="sidebar__menu" data-testid="day">
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
      <section className="schedule" data-testid="appointment">
      {schedule}
      <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

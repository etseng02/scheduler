import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList"
//import InterviewerList from "components/InterviewerList"
import Appointment from "components/Appointment/index.js"
//import { METHODS } from "http";

const axios = require('axios');

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Eddie T",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
  }
}


];

// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

export default function Application(props) {
  

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  
  //const [day, setDay] = useState("Monday");
 // const [days, setDays] = useState([]);

  useEffect(() => {
    axios
    .get("/api/days")
    .then((response) => {
      //console.log("Hello",response.data);
      setState({ ...state, days: response.data });
      //setDays(response.data);
    }).catch((error) => {
      console.log(error)
    })
  }, []);

  useEffect(() => {
    axios
    .get("/api/appointments")
    .then((response) => {
      console.log("appointments",response.data);
      setState({ ...state, appointments: response.data });
      //setState({ ...state, days: response.data });
      //setDays(response.data);
    }).catch((error) => {
      console.log(error)
    })
  }, []);

  const schedule =
    appointments.map(appointment => {
    return (
      <Appointment
        key= {appointment.id}
        id = {appointment.id}
        time = {appointment.time}
        interview = {appointment.interview}
      />
    )
  })


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
        setDay={setState.days}
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
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}

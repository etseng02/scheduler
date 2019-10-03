import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList"
//import InterviewerList from "components/InterviewerList"
import Appointment from "components/Appointment/index.js"
//import { METHODS } from "http";
import {getAppointmentsForDay , getInterview }from "../helpers/selectors.js"
//import getInterview from "../helpers/selectors.js"

const axios = require('axios');

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//     interview: {
//       student: "Eddie T",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//   }
// }


// ];

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
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  
  //const [day, setDay] = useState("Monday");
 // const [days, setDays] = useState([]);

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
   //setState({ ...state,  });
    //const [first, second, third] = all;

    //console.log(first, second, third);

  });
},[])

//console.log(state.interviewers)

  // useEffect(() => {
  //   axios
  //   .get("/api/days")
  //   .then((response) => {
  //     //console.log("Hello",response.data);
  //     setState({ ...state, days: response.data });
  //     //setDays(response.data);
  //   }).catch((error) => {
  //     console.log(error)
  //   })
  // }, []);

  // useEffect(() => {
  //   axios
  //   .get("/api/appointments")
  //   .then((response) => {
  //     console.log("appointments",response.data);
  //     setState({ ...state, appointments: response.data });
  //     //setState({ ...state, days: response.data });
  //     //setDays(response.data);
  //   }).catch((error) => {
  //     console.log(error)
  //   })
  // }, []);

  //console.log(getAppointmentsForDay(state, state.day));

  // const schedule =
  // getAppointmentsForDay(state, state.day).map(appointment => {
  //   return (
  //     <Appointment
  //       key= {appointment.id}
  //       id = {appointment.id}
  //       time = {appointment.time}
  //       interview = {appointment.interview}
  //     />
  //   )
  // })


const appointments = getAppointmentsForDay(state, state.day);

const schedule = appointments.map((appointment) => {

  const interview = getInterview(state, appointment.interview);
  if (appointment.interview) {
    //console.log("THSUITEHISTE INTERVIEW", interview)
    //console.log("THIS IS THE APPOINTMENT.INTERVIEW DATA I AM LOOKING FOR THANKS", appointment.interview)
    //console.log(appointment.interview.interviewer)
  }

  // for (let interviewerss in state.interviewers) {
  //   console.log(interviewerss)
  // }
  //console.log("iNNNTERRVIEWERRR: ", appointment.interview.interviewer)

  return (
    <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
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
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}

import React, { useState, useEffect } from "react";

const axios = require('axios');


export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  

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

    const appointment = {
      ...state.appointments[id],
      interview: null
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
   return axios
    .delete(`/api/appointments/${id}`, {
    })
    .then((response) => {
      setState({...state, appointments})
      return "deleted"
    })
    .catch((error) => {
        return "error"
      })
  }

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

  return {
    state,
    setDay,
    bookInterview,
    deleteInterview
  };

}


import React, { useState, useEffect, useReducer } from "react";

const axios = require('axios');


export default function useApplicationData() {

  //const setDay = day => setState({ ...state, day });

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_SPOTS = "SET_SPOTS";

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return {
          ...state,
          day: action.value
        }
      case SET_APPLICATION_DATA:
        return {
          ...state,
          days: action.value[0].data,
          appointments: action.value[1].data,
          interviewers: action.value[2].data
        }
      case SET_INTERVIEW:
        return {
          ...state,
          appointments: action.value
        }
      case SET_SPOTS:
        return {
          ...state
        }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });


  const setDay = day => dispatch({
    type: SET_DAY,
    value: day
  });

  

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    return axios
    .put(`/api/appointments/${id}`, {
      interview: interview
    })
    .then((response) => {
      dispatch({
        type: SET_INTERVIEW,
        value: appointments
      });
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
      dispatch({
        type: SET_INTERVIEW,
        value: appointments
      });
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
      dispatch({
        type: SET_APPLICATION_DATA,
        value: all
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


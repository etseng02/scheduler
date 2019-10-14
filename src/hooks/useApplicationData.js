import { useEffect, useReducer } from "react";

import axios from 'axios';

// const axios = require('axios');

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

export default function useApplicationData() {

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  //recognizeDay converts the day of the week into an index of weekdays
  const recognizeDay = function(day) {
    const daysOfWeek = ["Monday","Tuesday","Wednesday","Thursday","Friday"]
    return( daysOfWeek.indexOf(day))
  }

  //updateSpots takes the index of the day in relationship to the days of the the week and updates the state based on the action: adding or deleting an appointment
  const updateSpots = function(day, number) {
    recognizeDay(day)
    state.days[recognizeDay(day)].spots = state.days[recognizeDay(day)].spots + number;
  }


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

      //If adding new appointment, change the state of spots, else assume editing appointment, do not change spots state.
      if (state.appointments[id].interview === null) {
        updateSpots(state.day, -1)
      }

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
      updateSpots(state.day, 1)
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


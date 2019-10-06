// import { useState } from "react";

// const axios = require('axios');


// export default function useApplicationData(initial) {
//   const [state, setState] = useState({
//     day: "Monday",
//     days: [],
//     appointments: {},
//     interviewers: {}
//   });

//   const setDay = day => setState({ ...state, day });

//   function bookInterview(id, interview) {
//     const appointment = {
//       ...state.appointments[id],
//       interview: { ...interview }
//     };
  
//     const appointments = {
//       ...state.appointments,
//       [id]: appointment
//     };
  
//     setState({...state, appointments})
  
//     axios
//       .put(`/api/appointments/${id}`, {
//         interview: interview
//       })
//       .then((response) => {
//         console.log("THIS IS THE AXIOS RESPONSEE FROM BOOKING AN INTERVIEW!!!! ", response)
//         return response
//       })
//       .catch((error) => {
//         console.log(error)
//       })
  
//   }
  
//   function deleteInterview (id, interview) {
//     //console.log(id, interview);
  
  
//     const appointment = {
//       ...state.appointments[id],
//       interview: null
//     };
  
    
//     const appointments = {
//       ...state.appointments,
//       [id]: appointment
//     };
    
    
    
//     axios
//     .delete(`/api/appointments/${id}`, {
//       // id: id,
//       // time: "12pm",
//       //interview: {student:null, interviewer:null}
//     })
//     .then((response) => {
//       setState({...state, appointments})
//       //console.log(response)
//       //console.log("state after appointment change", state.appointments)
//     })
  
    
//   }

// }
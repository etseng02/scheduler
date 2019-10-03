
export function getAppointmentsForDay(state, day) {
  
  const appointmentsOnDay = []
  const appointmentDay = state.days.filter(forDay => forDay.name === day)
  for (let appointment of appointmentDay) {
    appointment.appointments.forEach(element => {
      if (appointment.appointments) {
        appointmentsOnDay.push(state.appointments[element])
      } else {
        return [];
      }
    })
  }
  return appointmentsOnDay;
}

export function getInterview(state, interview) {
  let newObject = {}
  if (!interview) {
    return console.log("interview not found")
  }

  let interviewerID = interview.interviewer
  let interviewer = state.interviewers[interviewerID]

  //console.log(interviewer)
  //console.log("STUEEDENT NAME",interview.student)

  newObject.student = interview.student
  newObject.interviewer = interviewer
  //console.log("FEH SUIF HESUIFH EUI", newObject)


  // for (let interviews in state.interviewers) {
  // }


return newObject
}

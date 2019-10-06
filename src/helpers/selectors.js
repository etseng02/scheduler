
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
    return;
  }

  let interviewerID = interview.interviewer
  let interviewer = state.interviewers[interviewerID]

  newObject.student = interview.student
  newObject.interviewer = interviewer

return newObject
}

export function getInterviewersForDay(state, day) {

  const interviewersOnDay = []
  const appointmentDay = state.days.filter(forDay => forDay.name === day)
  for (let appointment of appointmentDay) {
    appointment.interviewers.forEach(element => {
      interviewersOnDay.push(element)
    })
  }
  return interviewersOnDay;
}
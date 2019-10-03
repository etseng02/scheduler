
export default function getAppointmentsForDay(state, day) {
  
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

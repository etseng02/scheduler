import React from "react";

import DayListItem from "components/DayListItem"
import updateSpots from "hooks/useApplicationData.js";

export default function DayList(props) {

  const days = props.days.map(day => {
    //updateSpots(day)

    return (
      <DayListItem
      key ={day.id}
      name={day.name} 
      spots={day.spots} 
      selected={day.name === props.day}
      setDay={props.setDay}  />
    )
  })
return days;
}
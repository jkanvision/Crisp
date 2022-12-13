import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const locales = { "en-US": require("date-fns/locale/en-US")
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

const events = [
    {
        title: "Project 3",
        allDay: true,
        start: new Date(2022, 11, 13),
        end: new Date(2022, 11, 19),
    },
    {
        title: "Vacation",
        start: new Date(2022, 11, 20),
        end: new Date(2022, 11, 26),
    },
    {
        title: "Graduation",
        start: new Date(2022, 11, 19),
        end: new Date(2022, 11, 19),
    },
];



 function CalendarComp() {
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState(events);
    console.log(allEvents)
    function handleAddEvent() {
        setAllEvents([...allEvents, newEvent])
      }
      
 
  return (
    <div className="App">
        <h1>Crisp</h1>
        <h2>Add New Event</h2>
        <div>
        <input type='text' placeholder='Add Event' style={{width: '20%', marginRight: '10px'}}
        value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
        />
        <DatePicker placeholderText='Start Date' style={{marginRight: '10px'}}
        selected={newEvent.start} onChange={(start) => setNewEvent({...newEvent, start})}
        />
        <DatePicker placeholderText='End Date' 
        selected={newEvent.end} onChange={(end) => setNewEvent({...newEvent, end})}
        />
        <button  placeholder='Add Event' style={{marginTop: '50px'}} onClick={handleAddEvent}></button>
      </div>
      <Calendar
        localizer={localizer}
        startAccessor="start"
        events={allEvents}
        endAccessor="end"
        style={{ height: 1000 }}
      />
    </div>
  );
  
}
export default CalendarComp;
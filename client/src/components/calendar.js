import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import './calendar.css'
import AuthService from '../utils/auth'
import { gql, useMutation, useQuery } from '@apollo/client';
import { ADD_EVENT, UPDATE_EVENT, DELETE_EVENT, } from "../utils/mutations";
import { QUERY_EVENT, QUERY_USER } from "../utils/queries";





import './calendar.css';
import AuthService from '../utils/auth';




const locales = { "en-US": require("date-fns/locale/en-US")
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

const hardevents = [
    {
        title: "Project 3",
        allDay: true,
        start: "Mon Dec 19 2022 00:00:00 GMT-0500 (Eastern Standard Time)",
        end: "Mon Dec 20 2022 00:00:00 GMT-0500 (Eastern Standard Time)",
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
    const [allEvents, setAllEvents] = useState(hardevents);
    const [addEvent, { error }] = useMutation(ADD_EVENT);
    /// QUERY COURSE ///
  const { loading, data } = useQuery(QUERY_USER);
  const events = data?.user.events;
    console.log(data?.user.events)
    async function handleAddEvent() {
        // setAllEvents([...allEvents, newEvent])
        try {
          const data = await addEvent({
            variables: {
               title: newEvent.title,
               start: newEvent.start, 
               end: newEvent.end, 
              },
              refetchQueries: [
                {
                  query: QUERY_USER,
                },
              ],
          });
          setNewEvent({title: "", start: "", end: "" })
        } catch (err) {
          console.error(err);
        }
      }
      

 
  return (
    <>
    <div className="quick_style">
      <button onClick={AuthService.logout}>Logout</button>
      <h1>Crisp</h1>
      <h2>Add New Event</h2>
      <div>
        <input type='text' placeholder='Add Event' style={{width: '20%', marginRight: '10px',}}
        value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
        />
        <DatePicker placeholderText='Start Date' style={{marginRight: '10px'}}
        selected={newEvent.start} onChange={(start) => setNewEvent({...newEvent, start})}
        />
        <DatePicker placeholderText='End Date' 
        selected={newEvent.end} onChange={(end) => setNewEvent({...newEvent, end})}
        />
        <button type='text' placeholder='Add Event' style={{marginTop: '10px', height: '20px', width: '5%'}} onClick={handleAddEvent}></button>
      </div>
    </div>
    <Calendar
        localizer={localizer}
        startAccessor="start"
        events={events}
        endAccessor="end"
        style={{ height: 1000 }}
      />
    </>
  );
  
}
export default CalendarComp;
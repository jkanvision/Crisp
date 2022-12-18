import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen, faPlus, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import './calendar.css'
import AuthService from '../utils/auth'
import { gql, useMutation, useQuery } from '@apollo/client';
import { ADD_EVENT, UPDATE_EVENT, DELETE_EVENT, } from "../utils/mutations";
import { QUERY_EVENT, QUERY_USER } from "../utils/queries";

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

// function test() {
//   console.log(document.getElementById('title_test'));
// }

// Card template html
function card_temp(cardTitle = "") {
  return `
  <div class="card">
    <div class="card_title">
      <input
        type='text' 
        value='${cardTitle}'
      />
    </div>
    <div class="card_inner">
      <textarea placeholder="Add description"></textarea>
      <button class="card_delete">
        X
      </button>
    </div>
  </div>
  `;
};

let storeCard = "";
let storeEvents = [];

window.onresize = function() {
  if (document.querySelector('.card')) {
    document.querySelector('.card').style.width = `${storeCard.offsetWidth}px`;
  }
}

// When the user clicks on the button, toggle between hiding and showing the dropdown content
window.onclick = function(event) {
  if (event.target.matches('.plusBtn *, .plusBtn')) {
    document.querySelector('.eventDropdown').classList.toggle("show");
  } else if (event.target.matches('.rbc-event-content') && event.target.innerText === "Vacation") {
    storeCard = document.querySelector('[title="Vacation"]');
    storeCard.insertAdjacentHTML('afterend', card_temp("Vacation"));
    document.querySelector('.card').style.width = `${storeCard.offsetWidth}px`;
  } else if (!event.target.matches('.card_title') && !event.target.matches('.card_inner') && !event.target.matches('.card_delete') && !event.target.matches('input') && !event.target.matches('textarea')) {
    console.log(event.target);
    if (document.querySelector('.card')) {
      document.querySelector('.card').style.display = "none";
    }
    console.log(storeEvents);
  } else {
    console.log(event.target);
  }
}

 function CalendarComp() {
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState(hardevents);
    const [addEvent, { error }] = useMutation(ADD_EVENT);
    const [deleteEvent] = useMutation(DELETE_EVENT);
    /// QUERY COURSE ///
  const { loading, data } = useQuery(QUERY_USER);
  const events = data?.user.events;
  storeEvents = hardevents;
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

      async function handleDeleteEvent(e) {
        console.log(e)
        try {
          const data = await deleteEvent({
            variables: {
              eventId: e._id
            },
            refetchQueries: [
              {
                query: QUERY_USER,
              },
            ],
          })
        } catch (err) {
          console.error(err);
        }
      }
      
  return (
    <>
    <div className="custom_panels">
      <div className="buttonPositioning">
        <button onClick={AuthService.logout} className="logOut"><FontAwesomeIcon icon={faDoorOpen} /></button>
        <button className="plusBtn"><FontAwesomeIcon icon={faPlus} /></button>
      </div>
      <div className="eventDropdown">
        <div className="row">
          <h3>Title</h3>
          <input 
            type='text' 
            placeholder=''
            value={newEvent.title} 
            onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
          />
        </div>
        <div className="col">
          <div className="row">
            <h3>Start Date</h3>
            <DatePicker 
              placeholderText=''
              selected={newEvent.start} 
              onChange={(start) => setNewEvent({...newEvent, start})}
            />
          </div>
          <div className="row">
            <h3>End Date</h3>
            <DatePicker 
              placeholderText='' 
              selected={newEvent.end} 
              onChange={(end) => setNewEvent({...newEvent, end})}
            />
          </div>
        </div>
        <button 
          type='text' 
          placeholder='Add Event' 
          onClick={handleAddEvent}
          style={{padding: '10px 10px 5px 10px'}}
        >Add Event</button>
        <button className="plusBtn minusBtn"><FontAwesomeIcon icon={faCaretUp} /></button>
      </div>
    </div>
    {/* <div className="quick_style">
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
    </div> */}
    <Calendar
        localizer={localizer}
        startAccessor="start"
        events={events}
        endAccessor="end"
        onSelectEvent={handleDeleteEvent}
        style={{ height: 1000 }}
      />
    </>
  );
}

export default CalendarComp;
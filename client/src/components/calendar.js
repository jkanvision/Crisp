import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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

const events = [
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
  {
    title: "Graduation2",
    start: new Date(2022, 11, 19),
    end: new Date(2022, 11, 19),
  },
  {
    title: "Graduation3",
    start: new Date(2022, 11, 19),
    end: new Date(2022, 11, 19),
  },
  {
    title: "Graduation4",
    start: new Date(2022, 11, 19),
    end: new Date(2022, 11, 19),
  },
  {
    title: "Graduation5",
    start: new Date(2022, 11, 19),
    end: new Date(2022, 11, 19),
  },
  {
    title: "Graduation6",
    start: new Date(2022, 11, 19),
    end: new Date(2022, 11, 19),
  },
  {
    title: "Graduation7",
    start: new Date(2022, 11, 19),
    end: new Date(2022, 11, 19),
  }
];

// Card template html
function card_temp(cardTitle = "") {
  newTitle = events.find(item => item.title === cardTitle).title;

  return `
  <div class="card">
    <div class="card_title">
      <input 
        type='text' 
        placeholder='${cardTitle}'
        value={${cardTitle}} 
        onChange={(e) => ${newTitle} = e.target.value}
      />
    </div>
    <div class="card_inner">
      test
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
  if (event.target.matches('.plusBtn')) {
    document.querySelector('.eventDropdown').classList.toggle("show");
  } else if (event.target.matches('.rbc-event-content') && event.target.innerText === "Vacation") {
    storeCard = document.querySelector('[title="Vacation"]');
    storeCard.insertAdjacentHTML('afterend', card_temp("Vacation"));
    document.querySelector('.card').style.width = `${storeCard.offsetWidth}px`;
  } else if (!event.target.matches('.card_title') && !event.target.matches('.card_inner')) {
    console.log(event.target);
    if (document.querySelector('.card')) {
      document.querySelector('.card').style.display = "none";
    }
    console.log(storeEvents);
  } else {
    console.log(event.target);
    console.log(events.find(item => item.title === "Vacation").title);
    events.find(item => item.title === "Vacation").title = "vaca";
    console.log(events);
    console.log(events.find(item => item.title === "vaca").title);
  }
}

function CalendarComp() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);
  storeEvents = events;
  console.log(allEvents)
  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent])
  }
 
  return (
    <>
    <div className="custom_panels">
      <button onClick={AuthService.logout}>Logout</button>
      <button className="plusBtn">+</button>
      <div className="eventDropdown">
        <div className="row">
          <h3>Add Event</h3>
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
        <button className="plusBtn">-</button>
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
        events={allEvents}
        endAccessor="end"
        style={{ height: 1000 }}
      />
    </>
  );
}

export default CalendarComp;
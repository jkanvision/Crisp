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

function CalendarComp() {
  let storeCard = "";
  let storeEvents = [];
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(hardevents);
  const [addEvent, { error }] = useMutation(ADD_EVENT);
  const [deleteEvent] = useMutation(DELETE_EVENT);
  const [updateEvent] = useMutation(UPDATE_EVENT);
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

  // Card template html
  function card_temp(cardTitle = "") {
    return `
    <div class="card">
      <div class="card_title">
        <input
          type='text' 
          id='update_title'
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

  window.onresize = function() {
    if (document.querySelector('.card')) {
      document.querySelector('.card').style.width = `${storeCard.offsetWidth}px`;
    }
  }

  // When the user clicks on the button, toggle between hiding and showing the dropdown content
  window.onclick = function(event) {
    if (event.target.matches('.plusBtn *, .plusBtn')) {
      document.querySelector('.eventDropdown').classList.toggle("show");
    } else if (event.target.matches('.rbc-event-content')) {
      console.log(this._id);
      if (document.querySelector('.card')) {
        document.querySelector('.card').outerHTML = "";
      }
      // add 'event.target.title' to local storage in a var named 'card_title'
      localStorage.setItem("card_title", `${event.target.title}`);

      storeCard = event.target;
      storeCard.insertAdjacentHTML('afterend', card_temp(`${event.target.title}`));
      document.querySelector('.card').style.width = `${storeCard.offsetWidth}px`;
    } else if (event.target.matches('.card_delete')) {
      DeleteNOW();
      // delete card
      if (document.querySelector('.card')) {
        document.querySelector('.card').outerHTML = "";
      }
    // } else if (event.target.matches('#update_title')) {
    //   if (document.querySelector('#update_title')) {
    //     console.log(document.querySelector('#update_title').setAttribute("onchange", UpdateNOW()));
    //   }
    } else if (!event.target.matches('.card_title') && !event.target.matches('.card_inner') && !event.target.matches('.card_delete') && !event. target.matches('input') && !event.target.matches('textarea')) {
      console.log(event.target);
      if (document.querySelector('.card')) {
        document.querySelector('.card').style.display = "none";
      }
      console.log(storeEvents);
    }
    console.log(event.target);
  }

  async function DeleteNOW() {
    let dbEvents = data?.user.events;
    let targetID = "";
    // get 'card_title' from local storage
    let localTitle = localStorage.getItem("card_title");
    // compare local storage title to db title via a for loop
    for (let i = 0; i < dbEvents.length; i++) {
      if (dbEvents[i].title === localTitle) {
        targetID = dbEvents[i]._id;
      }
    }

    try {
      const data = await deleteEvent({
        variables: {
          eventId: targetID
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

  // async function UpdateNOW() {
  //   let dbEvents = data?.user.events;
  //   let targetID = "";
  //   // get 'card_title' from local storage
  //   let localTitle = localStorage.getItem("card_title");
  //   // compare local storage title to db title via a for loop
  //   for (let i = 0; i < dbEvents.length; i++) {
  //     if (dbEvents[i].title === localTitle) {
  //       targetID = dbEvents[i]._id;
  //     }
  //   }
  //   var updateTitle = document.getElementById("update_title");

  //   try {
  //     const data = await updateEvent({
  //       variables: {
  //         eventId: targetID
  //       },
  //       refetchQueries: [
  //         {
  //           query: QUERY_USER,
  //         },
  //       ],
  //     })
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
      
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
    <Calendar
        localizer={localizer}
        startAccessor="start"
        events={events}
        endAccessor="end"
        // onSelectEvent={handleDeleteEvent}
        style={{ height: 1000 }}
      />
    </>
  );
}

export default CalendarComp;
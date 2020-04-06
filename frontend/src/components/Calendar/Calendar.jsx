import React, { Fragment, useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import Container from "@material-ui/core/Container";
import { Swipeable } from "react-swipeable";
import axios from "axios";

function Calendar() {
  const calendarComponentRef = useRef(null);

  const [events, setEvents] = useState([]);

  async function fetchEvents() {
    const response = await axios("/api/events");
    setEvents(response.data);
    console.info({ response });
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  function previous() {
    if (calendarComponentRef.current) {
      const calendarApi = calendarComponentRef.current.getApi();
      calendarApi.prev();
    }
  }

  function next() {
    if (calendarComponentRef.current) {
      const calendarApi = calendarComponentRef.current.getApi();
      calendarApi.next();
    }
  }

  return (
    <Fragment>
      <Swipeable
        onSwipedRight={previous}
        onSwipedLeft={next}
        preventDefaultTouchmoveEvent={true}
      >
        <Container className={"calendar-container"}>
          <FullCalendar
            defaultView="dayGridMonth"
            plugins={[dayGridPlugin, timeGridPlugin]}
            locale="it"
            weekends={false}
            height="parent"
            titleFormat={{ year: "numeric", month: "long" }}
            allDayText={"Tutto il giorno"}
            views={{
              dayGridMonth: {
                columnHeaderFormat: {
                  weekday: "narrow"
                }
              },
              timeGridWeek: {
                columnHeaderFormat: {
                  weekday: "short",
                  day: "numeric"
                }
              },
              timeGridDay: {
                columnHeaderFormat: {
                  month: "numeric",
                  weekday: "long",
                  day: "numeric"
                }
              }
            }}
            events={events}
            buttonText={{
              today: "Oggi",
              month: "Mese",
              week: "Settimana",
              day: "Giorno",
              list: "Lista"
            }}
            header={{
              left: "dayGridMonth,timeGridWeek,timeGridDay",
              center: "title",
              right: "prev,next"
            }}
            footer={{
              left: "",
              center: "",
              right: "prev,next"
            }}
            ref={calendarComponentRef}
          />
        </Container>
      </Swipeable>
    </Fragment>
  );
}

export default Calendar;

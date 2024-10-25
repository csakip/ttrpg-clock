import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./bootstrap-overrides.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import useLocalStorageState from "use-local-storage-state";
import Clock from "./Components/Clock";
import EventLog from "./Components/EventLog";
import EventComponent from "./Components/Events";
import { useEffect, useState } from "react";
import { TimedEvent } from "./classes";
import HelpDialog from "./Components/HelpDialog";

function App() {
  const [date, setDate] = useLocalStorageState("ttrpg-clock-date", {
    defaultValue: new Date().toISOString().split("T")[0],
  });
  const [time, setTime] = useLocalStorageState("ttrpg-clock-time", {
    defaultValue: "12:00",
  });
  const [events, setEvents] = useLocalStorageState("ttrpg-clock-events", {
    defaultValue: [],
    serializer: {
      parse: (str) => {
        const objArray = JSON.parse(str);
        return objArray.map(
          (item) =>
            new TimedEvent(
              item.date,
              item.time,
              item.description,
              item.repeat,
              item.repeatTimes,
              item.active
            )
        );
      },
    },
  });
  const [logs, setLogs] = useState([]);
  const [helpDialog, setHelpDialog] = useState(false);

  const logEvent = (message) => {
    setLogs((prevLogs) => [message, ...prevLogs]);
  };

  useEffect(() => {
    events
      .filter((event) => event.active)
      .forEach((event) => {
        const currentDate = new Date(`${date}T${time}`);
        const eventDate = new Date(`${event.date}T${event.time}`);
        if (eventDate < currentDate) {
          event.active = false;
          logEvent(`${event.description} (${event.asRelativeDate(date, time)})`);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, time]);

  return (
    <>
      <Container className='mt-5 mx-5' fluid>
        <Button variant='outline-secondary' className='position-absolute top-0 end-0 border-0'>
          <i className='bi bi-question-circle' onClick={() => setHelpDialog(true)} />
        </Button>
        <Row className='h-100'>
          <Col md='auto' style={{ width: "35rem" }}>
            <h3 className='mb-4'>TTRPG Clock</h3>
            <Clock date={date} time={time} setDate={setDate} setTime={setTime} size='lg' />
            <EventComponent
              date={date}
              time={time}
              logEvent={logEvent}
              events={events}
              setEvents={setEvents}
            />
          </Col>
          <Col style={{ maxHeight: "50%" }}>
            <EventLog logs={logs} />
          </Col>
        </Row>
      </Container>
      <HelpDialog show={helpDialog} setShow={setHelpDialog} />
    </>
  );
}

export default App;

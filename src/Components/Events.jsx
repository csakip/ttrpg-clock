import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  InputGroup,
  ListGroup,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { TimedEvent } from "../classes";
import Clock from "./Clock";

export default function EventComponent({ date, time, events, setEvents, logEvent }) {
  const [open, setOpen] = useState(false);
  const [eventDate, setEventDate] = useState(date);
  const [eventTime, setEventTime] = useState(time);
  const [description, setDescription] = useState("");
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    setValidated(false);
    if (open) {
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const submitHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setValidated(true);
    if (description.trim() === "") return;
    const currentTime = new Date(`${date}T${time}`);
    const thisTime = new Date(`${eventDate}T${eventTime}`);

    const timedEvent = new TimedEvent(
      eventDate,
      eventTime,
      description,
      false,
      0,
      thisTime > currentTime
    );
    setEvents([...events, timedEvent]);

    logEvent("Created: " + timedEvent.asString());

    resetForm();
    setOpen(false);
  };

  function resetForm() {
    setEventDate(date);
    setEventTime(time);
    setDescription("");
    setValidated(false);
  }

  const tooltip = <Tooltip data-bs-theme='light'>Set the time to the current time.</Tooltip>;

  return (
    <>
      {events.length > 0 && (
        <>
          <h4>Events</h4>
          <ListGroup className='mb-3'>
            {events.map((event, index) => (
              <ListGroup.Item key={index}>
                <Row>
                  <Col>
                    <Form.Check
                      type='checkbox'
                      checked={event.active}
                      onChange={(e) => {
                        event.active = e.target.checked;
                        setEvents([...events]);
                      }}
                      label={event.asRelativeDate(date, time) + " - " + event.description}
                    />
                  </Col>
                  <Col md={"auto"}>
                    <Button
                      size='sm'
                      variant='outline-secondary'
                      className='py-0 px-1 border-0'
                      onClick={() => {
                        setEvents(events.filter((e) => e !== event));
                      }}>
                      <i className='bi bi-x'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      )}
      {open ? (
        <>
          <h4 className='mb-3'>Add New Event</h4>
          <Clock
            date={eventDate}
            time={eventTime}
            setDate={setEventDate}
            setTime={setEventTime}
            size='sm'>
            <OverlayTrigger placement='right' overlay={tooltip}>
              <Button
                onClick={() => {
                  setEventDate(date);
                  setEventTime(time);
                }}>
                <i className='bi bi-arrow-return-left'></i>
              </Button>
            </OverlayTrigger>
          </Clock>
          <Form onSubmit={submitHandler} noValidate validated={validated}>
            <Row className='mb-3'>
              <Col>
                <FormGroup as={InputGroup} controlId='validationDescription'>
                  <InputGroup.Text htmlFor='eventTextInput'>Description</InputGroup.Text>
                  <Form.Control
                    required
                    type='text'
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Button onClick={submitHandler}>Submit</Button>
            <Button onClick={() => setOpen(false)} className='ms-3' variant='secondary'>
              Cancel
            </Button>
          </Form>
        </>
      ) : (
        <Button onClick={() => setOpen(true)} size='sm'>
          Add New Event
        </Button>
      )}
    </>
  );
}

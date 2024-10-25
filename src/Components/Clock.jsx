import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";

export default function Clock({ date, time, setDate, setTime, size, children }) {
  const adjustTime = (minutes) => {
    const currentDate = new Date(`${date}T${time}`);
    currentDate.setMinutes(currentDate.getMinutes() + minutes);

    setDate(currentDate.toISOString().split("T")[0]);
    setTime(currentDate.toTimeString().split(" ")[0].substring(0, 5));
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  return (
    <>
      <Row className='mb-3'>
        <Col>
          <InputGroup>
            <InputGroup.Text htmlFor='dateInput'>Date</InputGroup.Text>
            <Form.Control
              type='date'
              size={size}
              id='dateInput'
              value={date}
              variant='warning'
              onChange={handleDateChange}
            />
          </InputGroup>
        </Col>
        <Col>
          <InputGroup>
            <InputGroup.Text htmlFor='timeInput'>Time</InputGroup.Text>
            <Form.Control
              size={size}
              type='time'
              id='timeInput'
              step='60'
              value={time}
              onChange={handleTimeChange}
            />
          </InputGroup>
        </Col>
        {children && <Col md={"auto"}>{children}</Col>}
      </Row>
      <Row className='mb-3'>
        <Col>
          <Button variant='secondary' onClick={() => adjustTime(6 * 60)} className='me-2 mb-2'>
            +6h
          </Button>
          <Button variant='secondary' onClick={() => adjustTime(60)} className='me-2 mb-2'>
            +1h
          </Button>
          <Button variant='secondary' onClick={() => adjustTime(30)} className='me-2 mb-2'>
            +30m
          </Button>
          <Button variant='secondary' onClick={() => adjustTime(15)} className='me-2 mb-2'>
            +15m
          </Button>
          <Button variant='secondary' onClick={() => adjustTime(10)} className='me-2 mb-2'>
            +10m
          </Button>
          <Button variant='secondary' onClick={() => adjustTime(5)} className='me-2 mb-2'>
            +5m
          </Button>
          <Button variant='secondary' onClick={() => adjustTime(1)} className='me-2 mb-2'>
            +1m
          </Button>
        </Col>
      </Row>
    </>
  );
}

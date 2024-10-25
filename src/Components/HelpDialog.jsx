import { Button, Modal } from "react-bootstrap";

export default function HelpDialog({ show, setShow }) {
  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose} centered fullscreen='md-down' size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>TTRPG Clock</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <section>
          <p>
            This clock helps track in-game time, allowing you to set and manage events for your
            TTRPG sessions. Move time forward manually, set single or recurring events, and receive
            reminders when important moments arrive.
          </p>
        </section>

        <section>
          <ul>
            <li>
              <strong>Adjustable Clock</strong> - Manually move the clock forward to keep track of
              the session.
            </li>
            <li>
              <strong>Event Scheduling</strong> - Create events for a specific time, add a
              description. When the clock reaches the set time, it will show in the log. You can set
              them to be reoccurring or not.
            </li>
          </ul>
        </section>

        <section>
          <h5>Setting Up Events</h5>
          <p>Click on the &quot;Add New Event&quot; button to add an event.</p>
          <ul>
            <li>
              <strong>Description</strong> - Add a brief description for easy reference during play.
            </li>
            <li>
              <strong>Date & Time</strong> - Specify when the event should happen, and it will
              automatically trigger when the clock reaches that moment.
            </li>
            <li>
              <strong>Repeat Options</strong> - Select an interval for recurring events, and the
              clock will notify you each time they reoccur.
            </li>
          </ul>
        </section>

        <section>
          <h5>Event list</h5>
          <p>The checkbox shows if the event is currently active. If not, it will not trigger.</p>
        </section>

        <section className='float-end'>
          <p>
            <span className='me-2'>25/10/2024</span>
            <a href='https://github.com/csakip' target='_blank'>
              Csokáv
            </a>
          </p>
        </section>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

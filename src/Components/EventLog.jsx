import { ListGroup } from "react-bootstrap";

export default function EventLog({ logs }) {
  return (
    <>
      {logs.length > 0 && <h4>Event Log</h4>}
      <div style={{ overflowY: "auto", maxHeight: "100%" }}>
        <ListGroup>
          {logs.map((log, index) => (
            <ListGroup.Item key={index}>{log}</ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </>
  );
}

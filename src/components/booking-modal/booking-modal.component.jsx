import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const BookingModal = ({ show, handleClose, bookingRequest, timeSlot }) => {
  const [formDataName, setFormDataName] = useState("");
  const [formDataEmail, setFormDataEmail] = useState("");
  const { date, time } = timeSlot;
  

  const handleBookingRequest = () => {
    handleClose();
    bookingRequest({name: formDataName, email: formDataEmail, timeSlot: timeSlot });
  };

  const handleEmailInputChange = (e) => {
    const emailInput = e.target.value
    setFormDataEmail(emailInput)
  };

  const handleNameInputChange = (e) => {
    const nameInput = e.target.value
    setFormDataName(nameInput)
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Book for {date} at {time}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" placeholder="" autoFocus onChange={handleNameInputChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" onChange={handleEmailInputChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleBookingRequest}>
          Book
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookingModal;

import React, { useState, useEffect } from "react";
import ButtonList from "./components/button-list/button-list.component";
import Table from "./components/table/table.component";
import BookingModal from "./components/booking-modal/booking-modal.component";
import WeekPicker from "./components/datepicker/date-picker.component";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./App.css";

const App = () => {
  const [coachAvailabilities, setCoachAvailabilities] = useState([]);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [timeSlot, setTimeSlot] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [filteredAvailability, setFilteredAvailability] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [show, setShow] = useState(false);
  const [tick, setTick] = useState(false);
  const handleClose = () => setShow(false);

  useEffect(() => {
    // Fetch coach availabilities from the API
    fetch("http://localhost:3000/coach_availabilities")
      .then((response) => response.json())
      .then((data) => setCoachAvailabilities(data))
      .catch((error) =>
        console.error("Error fetching coach availabilities:", error)
      );

    fetch("http://localhost:3000/coaches")
      .then((response) => response.json())
      .then((data) => setCoaches(data))
      .catch((error) => console.error("Error fetching coaches:", error));
  }, []);

  useEffect(() => {
    setFilteredAvailability(
      coachAvailabilities.filter(
        (availability) => availability.coach_id === selectedCoach
      )
    );
  }, [selectedCoach, coachAvailabilities]);

  useEffect(() => {
    if (selectedCoach !== null) {
      fetch(`http://localhost:3000/coaches/${selectedCoach}/bookings`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => setBookings(data))
        .catch((error) => console.error("Error fetching bookings:", error));
    }
  }, [selectedCoach, tick]);

  function bookingRequest(bookingData) {
    const { name, email, timeSlot } = bookingData;
    const { date, time } = timeSlot;
    const formattedDate = new Date(date);
    var hour = time.split(":")[0];
    var minute = time.split(":")[1];
    formattedDate.setMinutes(minute);
    formattedDate.setHours(hour);
    console.log(formattedDate);
    fetch("http://localhost:3000/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        coach_id: selectedCoach,
        start_at: formattedDate,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTick(!tick);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  const handleShow = (timeSlot) => {
    setTimeSlot(timeSlot);
    setShow(true);
  };

  const getDaysOfWeek = () => {
    let startOfWeek;
    if (startDate !== null) {
      startOfWeek = new Date(startDate);
    } else {
      const today = new Date();
      const dayOfWeek = today.getDay(); // 0 for Sunday, 1 for Monday, etc.
      const diff = today.getDate() - dayOfWeek;
      startOfWeek = new Date(today.setDate(diff));
      setStartDate(startOfWeek);
    }

    const daysOfWeek = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      });
      daysOfWeek.push({
        name: date.toLocaleDateString("en-US", { weekday: "long" }),
        date: formattedDate,
      });
    }

    return daysOfWeek;
  };

  // Function to handle coach button click
  const onClickHandler = (coachId) => {
    setSelectedCoach(coachId);
  };

  return (
    <Container fluid>
      <Row>
        <Col sm={3} className="divider vertical-align">
          <BookingModal
            show={show}
            handleClose={handleClose}
            bookingRequest={bookingRequest}
            timeSlot={timeSlot}
          />
          <div className="week-picker"><WeekPicker setStartDate={setStartDate} /></div>
          <h5 className="title site-padding">Select a Coach</h5>

          <ButtonList coaches={coaches} onClickHandler={onClickHandler} />
        </Col>
        <Col sm={9} className="site-padding table-overflow">
          <h2 className="title">Coach Schedule</h2>
          <Table
            filteredAvailability={filteredAvailability}
            selectedCoach={selectedCoach}
            daysOfWeek={getDaysOfWeek()}
            bookings={bookings}
            startDate={startDate}
            handleShow={handleShow}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default App;

/*

*/

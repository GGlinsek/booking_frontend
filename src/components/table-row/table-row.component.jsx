import TableCell from "../table-cell/table-cell.component";

const TableRow = ({
  filteredAvailability,
  daysOfWeek,
  timeSlot,
  index,
  filteredBookings,
  handleShow
}) => {
  return (
    <tr key={index}>
      <td className="table-universal">{timeSlot}</td>
      {daysOfWeek.map(({name, date}) => {
        const availabilitiesForDay = filteredAvailability.filter(
          (avail) => avail.day_of_week === name
        );

        const isBooked = filteredBookings.some((booking) => {
          // Get the day of the week from the booking's start_at
          const bookingDate = new Date(booking.start_at);
          const bookingDayOfWeek = bookingDate.toLocaleDateString("en-US", {
            weekday: "long",
          });

          // Check if the booking's day of the week matches the current day
          return bookingDayOfWeek === name;
        });

        const isAvailable = availabilitiesForDay.some((avail) => {
          const startTime =
            new Date(avail.start_at).getHours() * 60 +
            new Date(avail.start_at).getMinutes();
          const endTime =
            new Date(avail.end_at).getHours() * 60 +
            new Date(avail.end_at).getMinutes();
          const timeSlotStartTime =
            parseInt(timeSlot.split(":")[0]) * 60 +
            parseInt(timeSlot.split(":")[1]);
          return timeSlotStartTime >= startTime && timeSlotStartTime + 30 <= endTime;
        });

        return (
          <TableCell
            isAvailable={isAvailable}
            isBooked={isBooked}
            date={date}
            handleShow={handleShow}
            time={timeSlot}
          />
        );

        /*
        const availabilitiesForDay = filteredAvailability.filter(
            (avail) => avail.day_of_week === day
        );
        const isAvailable = availabilitiesForDay.some((avail) => {
            const startTime =
            new Date(avail.start_at).getHours() * 60 +
            new Date(avail.start_at).getMinutes();
            const endTime =
            new Date(avail.end_at).getHours() * 60 +
            new Date(avail.end_at).getMinutes();const isBooked = filteredBookings.filter()
            const timeSlotStartTime =
            parseInt(timeSlot.split(":")[0]) * 60 +
            parseInt(timeSlot.split(":")[1]);
            return (
            timeSlotStartTime >= startTime
            );
        });

        return (
            <td
            key={dayIndex}
            style={{
                border: "1px solid black",
                textAlign: "center",
                backgroundColor: isAvailable ? "lightgreen" : "white",
            }}
            >
            {isAvailable ? "Available" : ""}
            </td>
        );*/
      })}
    </tr>
  );
};
export default TableRow;

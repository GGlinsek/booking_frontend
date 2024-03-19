import TableRow from "../table-row/table-row.component";
import './table.styles.css'

const Table = ({
  filteredAvailability,
  selectedCoach,
  daysOfWeek,
  bookings,
  startDate,
  handleShow,
}) => {
  if (selectedCoach === null) {
    return <div></div>;
  } else {
    const timeSlots = Array.from(Array(48), (_, index) => {
      const hour = Math.floor(index / 2);
      const minute = index % 2 === 0 ? "00" : "30";
      return `${hour}:${minute}`;
    });

    return (
      <div>
        <table className="table-component">
          <thead>
            <tr>
              <th className="table-universal">Time</th>
              {daysOfWeek.map(({ name, date }, index) => {
                return (
                  <th
                    key={index}
                    className="table-universal"
                  >
                    {name}<br/>{date}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((timeSlot, index) => {
              const filteredBookings = bookings.filter((booking) => {
                if (!booking.start_at || !startDate) return false; // Check if start_at and startDate are defined

                const bookingStartTime = new Date(booking.start_at);
                const bookingDate = new Date(bookingStartTime.toDateString()); // Get only the date part

                // Adjust the bookingDate based on the index and startDate
                const adjustedBookingDate = new Date(startDate);
                adjustedBookingDate.setDate(
                  adjustedBookingDate.getDate() + index
                );

                const endDate = new Date(startDate);
                endDate.setDate(startDate.getDate() + 7);

                const bookingHours = bookingStartTime.getHours();
                const bookingMinutes = bookingStartTime.getMinutes();
                const [slotHours, slotMinutes] = timeSlot
                  .split(":")
                  .map(Number);

                // Compare both date and time
                return (
                  bookingDate >= startDate &&
                  bookingDate <= endDate &&
                  bookingHours === slotHours &&
                  bookingMinutes === slotMinutes
                );
              });

              return (
                <TableRow
                  key={index}
                  filteredAvailability={filteredAvailability}
                  daysOfWeek={daysOfWeek}
                  filteredBookings={filteredBookings}
                  timeSlot={timeSlot}
                  index={index}
                  handleShow={handleShow}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default Table;

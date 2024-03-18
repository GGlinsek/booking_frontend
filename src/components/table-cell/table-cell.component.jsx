const TableCell = ({ isAvailable, isBooked, handleShow, date, time }) => {
    const handleClick = () => {
        if (isAvailable || isBooked) {
            
            handleShow({date, time});
        }
    }

    return (
    <td
      style={{
        border: "1px solid black",
        textAlign: "center",
        backgroundColor: isBooked ? "red" : isAvailable ? "lightgreen" : "lightgrey",
      }}
      onClick={handleClick}
    >
      {isBooked ? "Booked" : isAvailable ? "Available" : ""}
    </td>
  );}
  
  export default TableCell;
  
import "./table-cell-styles.css"

const TableCell = ({ isAvailable, isBooked, handleShow, date, time }) => {
  const handleClick = () => {
    if (isAvailable && !isBooked) {
      handleShow({ date, time });
    }
  };

  return (
    <td
      className="cell"
      style={{
        backgroundColor: isBooked
          ? "red"
          : isAvailable
          ? "lightgreen"
          : "lightgrey",
      }}
      onClick={handleClick}
    ></td>
  );
};

export default TableCell;

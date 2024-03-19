import Tooltip from "@mui/material/Tooltip";

const TableCell = ({ isAvailable, isBooked, handleShow, date, time }) => {
  const handleClick = () => {
    if (isAvailable || isBooked) {
      handleShow({ date, time });
    }
  };

  return (
    //<Tooltip disableFocusListener disableTouchListener title={time} arrow>
    <td
      style={{
        border: "1px solid black",
        textAlign: "center",
        backgroundColor: isBooked
          ? "red"
          : isAvailable
          ? "lightgreen"
          : "lightgrey",
      }}
      onClick={handleClick}
    ></td>
    //</Tooltip>
  );
};

export default TableCell;

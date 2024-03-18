import Button from "react-bootstrap/Button";
//import CoachButton from "../coach-button/coach-button.component";

const ButtonList = ({ coaches, onClickHandler }) => {
  return coaches.map((coach) => {
    const { id, name } = coach;
    return (
        <Button key={id} onClick={() => onClickHandler(id)}>
          {name}
        </Button>
        //<CoachButton coach={coach} onClickHandler={onClickHandler} />
    );
  });
};

export default ButtonList;

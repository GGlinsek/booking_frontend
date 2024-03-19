import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import "./button-list.styles.css";

const ButtonList = ({ coaches, onClickHandler }) => {
  return (
    <div className="text-center">
      <ToggleButtonGroup vertical type="radio" name="options">
        {coaches.map((coach) => {
          const { id, name } = coach;
          return (
            <ToggleButton
              id={`tbg-radio-${id}`}
              value={id}
              onClick={() => onClickHandler(id)}
            >
              {name}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </div>
  );
};

export default ButtonList;

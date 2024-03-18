import Button from 'react-bootstrap/Button';

const CoachButton = ({ coach, onClickHandler }) => {
  const {id, name} = coach;
  return (
    <Button key={id} onClick={() => onClickHandler(id)}>
      {name}
    </Button>
  );
};

export default CoachButton;

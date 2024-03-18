import { WeeklyCalendar } from "react-week-picker";
import "react-week-picker/src/lib/calendar.css";

function DatePicker({ handleJumpToCurrentWeek, handleWeekPick }) {
    
  return (
    <div>
      <WeeklyCalendar
        onWeekPick={handleWeekPick}
        jumpToCurrentWeekRequired={true}
        onJumpToCurrentWeek={handleJumpToCurrentWeek}
      />
    </div>
  );
}

export default DatePicker;

import Calendar from "react-calendar";
import { CalendarSectionProps } from "../types";

const CalendarSection = (props: CalendarSectionProps) => {

    const { onDateSelect, date, onMonthSelect } = props;

    return (
        <div className='calendar'>
            <div className='calendar-title'>Test Service</div>
            <p className='calendar-timezone'><b>Timezone:</b> Asia/Calcutta</p>
            <div className='calendar-input'>
                <Calendar
                    calendarType="hebrew"
                    minDate={new Date()}
                    tileClassName="custom-calendar-title"
                    onChange={onDateSelect}
                    value={date}
                    onClickMonth={onMonthSelect}
                />
            </div>
        </div>
    );
};

export default CalendarSection;
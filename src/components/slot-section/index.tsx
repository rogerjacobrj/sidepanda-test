import { formatTime, formatTimestampToDateString } from "../../helpers/date";
import { Slot } from "../scheduler/types";
import { SlotSectionProps } from "./types";

const SlotSection = (props: SlotSectionProps) => {

    const { timestamp, slots, selectedSlot, chooseSlot } = props;
    return (
        <div className='slot-section'>
            <div className='slot-date'>
                {formatTimestampToDateString(timestamp!)} - Available Slots
            </div>
            
            {slots && slots.length > 0 &&
                <div className='slots'>
                    {slots.map((slot: Slot, idx: number) => {
                        return <div
                            key={`slot-${idx}`}
                            onClick={() => chooseSlot(slot, idx)}
                            className={`${selectedSlot?.index === idx ? "slot active" : "slot"}`}>
                            <span>{formatTime(slot.start_time)} - {formatTime(slot.end_time)}</span>
                            {selectedSlot?.index === idx && <span>
                                <img src='./check.svg' alt='Selected Slot' />
                            </span>}
                        </div>
                    })}
                </div>}

            {slots && slots.length === 0 && <div className='empty-slot'>
                <p className='empty-text'>No slots available</p>
            </div>}
        </div>
    );
};

export default SlotSection;
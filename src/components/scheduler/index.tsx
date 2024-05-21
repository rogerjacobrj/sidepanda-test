import Calendar from 'react-calendar';
import { useEffect, useState } from 'react';
import Variant from '../variant';
import {
    getNextDayTimestamp, convertTimestampToDate,
    convertDateStringToTimestamp, calculateDuration
} from '../../helpers/date';
import { VariantOptions } from '../variant/types';
import { DateValue, Slot, SelctedSlot } from "./types";
import SlotSection from '../slot-section';

const Scheduler = () => {

    const [date, setDate] = useState<DateValue>(null);
    const [timestamp, setTimestamp] = useState<number | null>(null);

    const [loading, setLoading] = useState<boolean>(false);
    const [slots, setSlots] = useState<Slot[]>([]);
    const [slotsData, setSlotsData] = useState<Slot[]>([]);
    const [variant, setVariant] = useState<number>(60);
    const [selectedSlot, setSelectedSlot] = useState<SelctedSlot | null>(null);

    const getStarted = (): void => {
        setDate(new Date());
        setTimestamp(new Date().getTime());
    };

    const onDateSelect = (value: DateValue): void => {
        setDate(value);
        setTimestamp(convertDateStringToTimestamp(value!.toString()));
    };

    useEffect(() => {
        if (date) {
            const today = convertTimestampToDate(timestamp!);

            const nextDayTimestamp = getNextDayTimestamp(timestamp!);

            const tomorrow = convertTimestampToDate(nextDayTimestamp);

            fetchTimeSlots(today, tomorrow);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date]);

    const fetchTimeSlots = async (startDate: string, endDate: string): Promise<void> => {
        try {
            setLoading(true);
            const response = await fetch(`https://app.appointo.me/scripttag/mock_timeslots?start_date=${startDate}&end_date=${endDate}`);
            if (!response.ok) {
                throw new Error("Failed to load appointment slots");
            }

            const data = await response.json();

            if (data && data.length) {
                const { slots } = data[0];
                setSlots(slots);
                setSlotsData(slots);
            }
        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false);
        }
    };

    const chooseSlot = (selectedSlot: Slot, index: number): void => {
        setSelectedSlot({
            slot: selectedSlot,
            index
        });
    };

    const onVariantSelect = (variant: VariantOptions): void => {
        setVariant(variant.value);
    };

    useEffect(() => {
        if (variant) {
            const slots = slotsData.filter(slot => {
                const duration = calculateDuration(slot);
                return duration === variant;
            });

            setSlots(slots);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [variant]);

    return (
        <div className='booking-wrapper'>
            <div className='booking-container'>
                <div className='calendar-slot-wrapper'>
                    <div className='calendar'>
                        <div className='calendar-title'>Test Service</div>
                        <p className='calendar-timezone'><b>Timezone:</b> Asia/Calcutta</p>
                        <div className='calendar-input'>
                            <Calendar
                                calendarType="hebrew"
                                minDate={new Date()}
                                tileClassName="custom-calendar-title"
                                onChange={onDateSelect} value={date} />
                        </div>
                    </div>
                    <div className='time-slot'>
                        {date && !loading && <div className='progress-content'>
                            <div className='variant-selection'>
                                <Variant
                                    label="Select from variants"
                                    placeholder="Choose variant"
                                    onVariantSelect={onVariantSelect}
                                    value={variant}
                                />
                            </div>
                            <div className='divider'></div>
                            <SlotSection
                                timestamp={timestamp}
                                slots={slots}
                                selectedSlot={selectedSlot}
                                chooseSlot={chooseSlot}
                            />
                        </div>}

                        {date && loading && <div className='loader-wrapper'>
                            <div className="loader"></div>
                        </div>}

                        {!date && slots.length === 0 &&
                            <div className='get-started'>
                                <p>Choose a date and time to schedule the appointment</p>
                                <button
                                    className='start-button'
                                    onClick={getStarted}>
                                    Get Started
                                </button>
                            </div>}
                    </div>
                </div>
                <div className='calendar-footer'>
                    <div className='author'>Powered by <a href=''>Appointo</a></div>
                    <div className='footer-btn'>
                        {selectedSlot && <button className='next-btn'>
                            Next <i className="arrow right"></i>
                        </button>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Scheduler;
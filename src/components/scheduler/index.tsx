import { useEffect, useState } from 'react';
import {
    getNextDayTimestamp, convertTimestampToDate,
    convertDateStringToTimestamp, calculateDuration
} from '../../helpers/date';
import { VariantOptions } from './types';
import { DateValue, Slot, SelctedSlot } from "./types";
import BookingDetails from './components/booking-details';
import CalendarSection from './components/calendar';
import Footer from './components/footer';
import SlotSection from './components/slot-section';
import "./styles.scss";

const Scheduler = () => {

    const [date, setDate] = useState<DateValue>(null);
    const [timestamp, setTimestamp] = useState<number | null>(null);

    const [loading, setLoading] = useState<boolean>(false);
    const [showDetailsPage, setShowDetailsPage] = useState<boolean>(false);
    const [slots, setSlots] = useState<Slot[]>([]);
    const [slotsData, setSlotsData] = useState<Slot[]>([]);
    const [variant, setVariant] = useState<VariantOptions>({ label: '1 Hour', value: 60 });
    const [selectedSlot, setSelectedSlot] = useState<SelctedSlot | null>(null);

    const getStarted = (): void => {
        setDate(new Date());
        setTimestamp(new Date().getTime());
    };

    const onDateSelect = (value: DateValue): void => {
        setDate(value);
        setTimestamp(convertDateStringToTimestamp(value!.toString()));
        setSelectedSlot(null);
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
        setVariant(variant);
    };

    useEffect(() => {
        if (variant) {
            const slots = slotsData.filter(slot => {
                const duration = calculateDuration(slot);
                return duration === variant.value;
            });

            setSlots(slots);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [variant]);

    const toggleDetailsPage = () => {
        setShowDetailsPage(!showDetailsPage);
    };

    const scheduleEvent = () => {
        setDate(null);
        setTimestamp(null);
        setShowDetailsPage(false);
        setSlots([]);
        setSlotsData([]);
        setSelectedSlot(null);
    };

    return (
        <div className='booking-wrapper'>
            <div className='booking-container'>
                {!showDetailsPage ? <div className='calendar-slot-wrapper'>
                    <CalendarSection
                        onDateSelect={onDateSelect}
                        date={date}
                    />

                    <SlotSection
                        date={date}
                        loading={loading}
                        variant={variant}
                        onVariantSelect={onVariantSelect}
                        timestamp={timestamp!}
                        slots={slots}
                        selectedSlot={selectedSlot!}
                        chooseSlot={chooseSlot}
                        getStarted={getStarted}
                    />
                </div>
                    :
                    <BookingDetails
                        duration={variant.label}
                        selectedSlot={selectedSlot!}
                        goBack={toggleDetailsPage}
                        scheduleEvent={scheduleEvent}
                        timestamp={timestamp!}
                    />}

                <Footer
                    slots={slots}
                    selectedSlot={selectedSlot!}
                    showDetailsPage={showDetailsPage}
                    toggleDetailsPage={toggleDetailsPage}
                />
            </div>
        </div>
    );
};

export default Scheduler;
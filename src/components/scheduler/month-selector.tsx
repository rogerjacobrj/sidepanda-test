/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import {
    convertTimestampToDate, convertDateStringToTimestamp,
    calculateDuration, daysInMonth, getFirstDayOfMonth
} from '../../helpers/date';
import { VariantOptions, MonthData } from './types';
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
    const [error, setError] = useState<Error | null>(null);
    const [monthData, setMonthData] = useState<MonthData[] | null>(null);
    const [lastDayTimestamp, setLastDayTimestamp] = useState<number | null>(null);
    const [isMonthSelection, setMonthSelection] = useState<boolean>(false);

    const getStarted = (): void => {
        setDate(new Date());
        setTimestamp(new Date().getTime());
        onDateSelect(new Date());
    };

    useEffect(() => {
        if (monthData && isMonthSelection) {
            const startDateData = monthData[0];
            setDate(new Date(startDateData.date));
            setSlots(startDateData.slots);
            setSlotsData(startDateData.slots);
            const timestamp: string = startDateData.date.toLocaleString();
            setTimestamp(Number(timestamp));
            setMonthSelection(false);
        }
    }, [monthData, isMonthSelection]);

    useEffect(() => {
        if (date && monthData && monthData.length > 0) {
            for (let i = 0; i < monthData.length; i++) {
                const timestamp = convertDateStringToTimestamp(date.toString());
                if (convertTimestampToDate(timestamp!) === monthData[i].date.toString().toLocaleString()) {
                    setSlots(monthData[i].slots);
                    setSlotsData(monthData[i].slots);
                }
            }
        }
    }, [date, monthData]);

    const onDateSelect = (value: any): void => {

        setSelectedSlot(null);

        const lastDay = new Date(value.getFullYear(),
            value.getMonth(), daysInMonth(value.getMonth() + 1,
                value.getFullYear()));

        const monthEndTimestamp = convertDateStringToTimestamp(lastDay.toString());
        setLastDayTimestamp(monthEndTimestamp);

        if (Number(lastDayTimestamp) !== Number(monthEndTimestamp)) {
            const startOfMonth = getFirstDayOfMonth(monthEndTimestamp!);
            const start = convertTimestampToDate(startOfMonth!);
            const end = convertTimestampToDate(monthEndTimestamp!);
            setMonthData(null);
            fetchTimeSlots(start, end);
        }

        setDate(new Date(value));
        setTimestamp(new Date(value).getTime());
    };

    const fetchTimeSlots = async (startDate: string, endDate: string): Promise<void> => {
        try {
            setError(null);
            setLoading(true);

            const response = await fetch(`https://app.appointo.me/scripttag/mock_timeslots?start_date=${startDate}&end_date=${endDate}`);
            if (!response.ok) {
                throw new Error("Failed to load appointment slots");
            }

            const data = await response.json();

            if (data) {
                setMonthData(data);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setError(error);
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

    const onMonthSelect = (date: Date) => {
        setMonthSelection(true);
        setMonthData(null);
        const lastDay = new Date(date.getFullYear(),
            date.getMonth(), daysInMonth(date.getMonth() + 1,
                date.getFullYear()));

        const monthStartTimestamp = convertDateStringToTimestamp(new Date(date).toString());
        const monthEndTimestamp = convertDateStringToTimestamp(lastDay.toString());
        setLastDayTimestamp(monthEndTimestamp);

        const today = convertTimestampToDate(monthStartTimestamp!);
        const tomorrow = convertTimestampToDate(monthEndTimestamp!);

        fetchTimeSlots(today, tomorrow);
    };

    return (
        <div className='booking-wrapper'>
            <div className='booking-container'>
                {!showDetailsPage ? <div className='calendar-slot-wrapper'>
                    <CalendarSection
                        onDateSelect={onDateSelect}
                        date={date}
                        onMonthSelect={onMonthSelect}
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
                        error={error}
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
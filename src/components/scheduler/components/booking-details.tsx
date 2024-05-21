import { useState } from "react";
import { formatTime, formatTimestampToDateString } from "../../../helpers/date";
import { BookingDetailsProps, FormData, ValidationErrors } from "../types";

const BookingDetails = (props: BookingDetailsProps) => {

    const { goBack, scheduleEvent, selectedSlot, duration, timestamp } = props;

    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
    });

    const [errors, setErrors] = useState<ValidationErrors>({});
    const [showConfirmationPage, setShowConfirmationPage] = useState<boolean>(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });

        setErrors(validate(formData));
    };

    const validate = (data: FormData): ValidationErrors => {
        const errors: ValidationErrors = {};
        if (!data.name) {
            errors.name = 'Name is required';
        }

        if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errors.email = 'Invalid email';
        }

        return errors;
    };

    const onScheduleEvent = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const validationErrors = validate(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setShowConfirmationPage(true);
        }
    };

    const bookEvent = (): void => {
        setShowConfirmationPage(false);
        scheduleEvent();
    };

    return (
        <div className='booking-detail-wrapper'>
            <div className='event-details'>
                <div className='event-title'>Test Service</div>
                <div className='event-duration'>{duration}</div>
                <div className='event-date'>
                    {formatTime(selectedSlot.slot.start_time)} - {formatTime(selectedSlot.slot.end_time)},
                    &nbsp; {formatTimestampToDateString(timestamp!, true)}</div>
                <div className='event-timezone'>India Standard Time - Asia/Calcutta</div>
            </div>

            {!showConfirmationPage ? <div className='detail-input-wrapper'>
                <div className='title'>Enter Details</div>
                <form onSubmit={onScheduleEvent}>
                    <div className='detail-input'>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className='form-control'
                            placeholder='Full name' />
                        {errors.name && <p className="form-error">{errors.name}</p>}
                    </div>

                    <div className='detail-input'>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className='form-control'
                            placeholder='Email address' />
                        {errors.email && <p className="form-error">{errors.email}</p>}
                    </div>

                    <div className='submit-details'>
                        <button
                            onClick={goBack}
                            className='event-btn back-btn'>Back</button>
                        <button
                            type="submit"
                            className='event-btn schedule-btn'>Schedule Event</button>
                    </div>
                </form>
            </div>
                :
                <div className="confirmation-content">
                    <p>The appointment has been scheduled</p>
                    <button
                        onClick={bookEvent}
                        className="schedule-btn">Schedule Appointment</button>
                </div>}
        </div>
    );
};

export default BookingDetails;
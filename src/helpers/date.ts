export const getNextDayTimestamp = (timestampInMs: number): number => {
    const dateObject = new Date(timestampInMs);
    dateObject.setDate(dateObject.getDate() + 1);
    return dateObject.getTime();
};

export const convertTimestampToDate = (timestampInMs: number): string => {
    const dateObject = new Date(timestampInMs);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

export const convertDateStringToTimestamp = (dateString: string): number | null => {
    try {
        const timestampInMs = Date.parse(dateString);

        if (isNaN(timestampInMs)) {
            throw new Error("Invalid date string format.");
        }

        return timestampInMs;
    } catch (error) {
        console.error("Error parsing date string:", error);
        return null;
    }
};

export const formatTimestampToDateString = (timestampInMs: number): string => {
    const dateObject = new Date(timestampInMs);
    const weekday = dateObject.toLocaleDateString('en-US', { weekday: 'long' });
    const monthDay = dateObject.toLocaleDateString('en-US', { day: 'numeric', month: 'long' });

    return `${weekday}, ${monthDay}`;
};

export const formatTime = (timeString: string): string => {
    if (!timeString) {
        return "";
    }

    const dateObject = new Date(timeString);

    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;

    return `${formattedHours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${ampm}`;
};

type Time = {
    start_time: string;
    end_time: string;
}

export const calculateDuration = (timeObject: Time): number => {
    const startTime = new Date(timeObject.start_time);
    const endTime = new Date(timeObject.end_time);

    const diffInMs = endTime.getTime() - startTime.getTime();
    const minutes = Math.floor(diffInMs / (1000 * 60));

    return minutes;
};
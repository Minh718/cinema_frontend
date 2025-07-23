export const generateDates = (n) => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < n; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        const dayNames = [
            "Chủ Nhật",
            "Thứ Hai",
            "Thứ Ba",
            "Thứ Tư",
            "Thứ Năm",
            "Thứ Sáu",
            "Thứ Bảy",
        ];

        dates.push({
            date: date.toISOString().split("T")[0],
            displayDate: `${date.getDate()}/${date.getMonth() + 1}`,
            dayName: dayNames[date.getDay()],
            isToday: i === 0,
        });
    }

    return dates;
};
export const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
}

export const formatIsoDateToFullEnglishDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

export const formatMinutesToHourMinute = (durationMinutes) => {
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;

    let result = "";
    if (hours > 0) result += `${hours}h`;
    if (minutes > 0) result += (hours > 0 ? " " : "") + `${minutes}min`;

    return result || "0min";
}

export const convert24HourToAmPm = (timeStr) => {

    const [hourStr, minuteStr] = timeStr.split(":");
    let hour = parseInt(hourStr, 10);
    const minute = minuteStr.padStart(2, "0");

    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    if (hour === 0) hour = 12;

    return `${hour}:${minute} ${ampm}`;
}
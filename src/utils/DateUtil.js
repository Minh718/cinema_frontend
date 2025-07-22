export const generateDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
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
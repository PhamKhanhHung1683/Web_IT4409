//vd 2 hours ago
export const getTimeDistance = (date) => {
    const dateObject = new Date(date); //convert from string to object
    const now = new Date();
    if (
        dateObject.getFullYear() === now.getFullYear() &&
        dateObject.getMonth() === now.getMonth() &&
        dateObject.getDate() === now.getDate()
    ) {
        if (now.getHours() - dateObject.getHours() > 0) return now.getHours() - dateObject.getHours() + ' hours ago';
        else if (now.getMinutes() - dateObject.getMinutes() > 0)
            return now.getMinutes() - dateObject.getMinutes() + ' minutes ago';
        else return 'now';
    } else {
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        const day = dateObject.getDate();
        const monthIndex = dateObject.getMonth();
        const year = dateObject.getFullYear();

        const suffixes = ['st', 'nd', 'rd', 'th'];
        let suffix;
        if (day === 1 || day === 21 || day === 31) {
            suffix = suffixes[0];
        } else if (day === 2 || day === 22) {
            suffix = suffixes[1];
        } else if (day === 3 || day === 23) {
            suffix = suffixes[2];
        } else {
            suffix = suffixes[3];
        }

        return months[monthIndex] + ' ' + day + suffix + ', ' + year;
    }
};
export const FormatDate = (date) => {
    const dateObject = new Date(date); //convert from string to object

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const day = dateObject.getDate();
    const monthIndex = dateObject.getMonth();
    const year = dateObject.getFullYear();

    const suffixes = ['st', 'nd', 'rd', 'th'];
    let suffix;
    if (day === 1 || day === 21 || day === 31) {
        suffix = suffixes[0];
    } else if (day === 2 || day === 22) {
        suffix = suffixes[1];
    } else if (day === 3 || day === 23) {
        suffix = suffixes[2];
    } else {
        suffix = suffixes[3];
    }
    return months[monthIndex] + ' ' + day + suffix + ', ' + year;
};

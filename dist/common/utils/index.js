"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = exports.calcRelToAnyDate = exports.calcRelToCurrentDate = void 0;
const countDays = (positiveDate, negativeDate, yearDetermenant) => {
    return Math.floor((positiveDate - negativeDate) / (1000 * 60 * 60 * 24 * (yearDetermenant ? 365 : 1)));
};
const calcRelToCurrentDate = (pastDate, relativeToYear) => {
    const pastDayInMillSeconds = new Date(pastDate).getTime();
    const todayInMillSeconds = new Date().getTime();
    const currentDate = countDays(todayInMillSeconds, pastDayInMillSeconds, relativeToYear);
    return currentDate;
};
exports.calcRelToCurrentDate = calcRelToCurrentDate;
const calcRelToAnyDate = (pastDate, newDate, relativeToYear) => {
    const pastDayInMillSeconds = new Date(pastDate).getTime();
    const newDayInMillSeconds = new Date(newDate).getTime();
    const currentDate = countDays(newDayInMillSeconds, pastDayInMillSeconds, relativeToYear);
    return currentDate;
};
exports.calcRelToAnyDate = calcRelToAnyDate;
const paginate = async (page = 1, query, limit = 6, total) => {
    const lastPage = Math.ceil(total / limit);
    const data = await query
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
    const sortedData = {
        data,
        total,
        page,
        lastPage
    };
    return sortedData;
};
exports.paginate = paginate;
//# sourceMappingURL=index.js.map
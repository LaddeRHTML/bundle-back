const countDays = (
    positiveDate: number,
    negativeDate: number,
    yearDetermenant: boolean
): number => {
    return Math.floor(
        (positiveDate - negativeDate) / (1000 * 60 * 60 * 24 * (yearDetermenant ? 365 : 1))
    );
};

export const calcRelToCurrentDate = (pastDate: Date, relativeToYear: boolean): number => {
    const pastDayInMillSeconds = new Date(pastDate).getTime();

    const todayInMillSeconds = new Date().getTime();

    const currentDate = countDays(todayInMillSeconds, pastDayInMillSeconds, relativeToYear);

    return currentDate;
};

export const calcRelToAnyDate = (
    pastDate: Date,
    newDate: Date,
    relativeToYear: boolean
): number => {
    const pastDayInMillSeconds = new Date(pastDate).getTime();

    const newDayInMillSeconds = new Date(newDate).getTime();

    const currentDate = countDays(newDayInMillSeconds, pastDayInMillSeconds, relativeToYear);

    return currentDate;
};

export const paginate = async (page: number = 1, query: any, limit: number = 6, total: number) => {
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

const sumAllFields = <T>(array: T[], field: string) => {
    let sum = 0;

    array.forEach((o) => {
        sum += o[field];
    });

    return sum;
};

export default sumAllFields;

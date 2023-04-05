const sumArray = (array: number[]): number => {
    if (!array) return 0;

    return array.reduce((total, item) => total + item);
};

export default sumArray;

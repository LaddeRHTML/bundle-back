const compareObjects = <O>(object: O, comparison: unknown): boolean => {
    return JSON.stringify(object) === JSON.stringify(comparison);
};
export default compareObjects;

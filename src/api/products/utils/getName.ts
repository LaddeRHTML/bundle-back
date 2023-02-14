const getName = (fullName: string): string => {
    return fullName
        .replace(/[^a-z,1-9,0\- ]/gi, '')
        .trim()
        .split(',')[0];
};

export default getName;

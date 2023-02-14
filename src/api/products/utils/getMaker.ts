const getMaker = (model: string): string => {
    return model
        .replace(/[^a-z ]/gi, '')
        .trim()
        .split(' ')[0];
};

export default getMaker;

const deleteObjectProperty = <T>(object: T, key: keyof typeof object) => {
    if (object[key]) {
        delete object[key];
    }

    return object;
};

export default deleteObjectProperty;

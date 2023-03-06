const getErrorMessage = (error: unknown): string => {
    let errorMessage = '';

    if (error instanceof Error) {
        errorMessage = error.message;
    }

    return errorMessage;
};

export default getErrorMessage;

export interface MultiplePromiseHandler<T> {
    payload: T;
    resolved: boolean;
}

export const successHandler = <T>(result: T) => ({ payload: result, resolved: true });
export const catchHandler = <T>(error: T) => ({ payload: error, resolved: false });

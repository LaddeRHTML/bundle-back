export interface SuccessfullyUpdatedEntityResponse<E> {
    success: boolean;
    message: string;
    newFields: E;
}
export interface FindSomeCache<R, A> {
    response: R;
    arguments: A;
}

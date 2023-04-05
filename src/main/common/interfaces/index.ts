export interface SuccessfullyUpdatedEntityResponse<E> {
    success: boolean;
    message: string;
    newFields: E;
}

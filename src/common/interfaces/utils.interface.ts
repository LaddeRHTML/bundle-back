export interface Pagination<T> {
    data: T;
    total: number;
    page: number;
    lastPage: number;
}

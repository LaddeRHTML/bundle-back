export declare const calcRelToCurrentDate: (pastDate: Date, relativeToYear: boolean) => number;
export declare const calcRelToAnyDate: (pastDate: Date, newDate: Date, relativeToYear: boolean) => number;
export declare const paginate: (page: number, query: any, limit: number, total: number) => Promise<{
    data: any;
    total: number;
    page: number;
    lastPage: number;
}>;

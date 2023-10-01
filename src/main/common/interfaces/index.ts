export interface SuccessfullyUpdatedEntityResponse<E> {
    success: boolean;
    message: string;
    newFields: E;
}

export type ExcelSheetProduct = (string | number | null)[];

export type ExcelClearSheetProduct = [
    number?,
    string?,
    number?,
    number?,
    number?,
    string?,
    string?
];

export type FilteredItem = {
    category: string;
    products: ExcelClearSheetProduct[];
};

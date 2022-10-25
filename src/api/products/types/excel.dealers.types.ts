export type ExcelSheetProduct = (string | null | number)[];
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

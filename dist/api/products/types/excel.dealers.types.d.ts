export declare type ExcelSheetProduct = (string | null | number)[];
export declare type ExcelClearSheetProduct = [
    number?,
    string?,
    number?,
    number?,
    number?,
    string?,
    string?
];
export declare type FilteredItem = {
    category: string;
    products: ExcelClearSheetProduct[];
};

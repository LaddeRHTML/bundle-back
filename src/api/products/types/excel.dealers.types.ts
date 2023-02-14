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
export type Group = {
    category: string;
    products: ExcelClearSheetProduct[];
};

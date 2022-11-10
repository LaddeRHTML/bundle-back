export interface MinMaxProductValues {
    minPrice: number;
    maxPrice: number;
    minSupplierPrice: number;
    maxSupplierPrice: number;
    minCount: number;
    maxCount: number;
    minWarrantyDays: number;
    maxWarrantyDays: number;
}

export interface FilterProductsResponse {
    minMaxValues: MinMaxProductValues;
    warrantyVariations: number[];
}

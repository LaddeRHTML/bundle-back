export interface MinMaxProductValues {
    minPrice: number;
    maxPrice: number;
    minSupplierPrice: number;
    maxSupplierPrice: number;
}

export interface ProductsFilter extends MinMaxProductValues {
    warrantyDays: number;
}

export interface FilterProductsResponse {
    minMaxValues: MinMaxProductValues;
    warrantyVariations: number[];
}

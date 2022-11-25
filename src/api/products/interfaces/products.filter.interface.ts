export interface MinMaxProductValues {
    minPrice: number;
    maxPrice: number;
    minSupplierPrice: number;
    maxSupplierPrice: number;
}

export interface ProductsFilter {
    price: [number, number];
    supplierPrice: [number, number];
    warrantyDays: number;
}

export interface FilterProductsResponse {
    minMaxValues: MinMaxProductValues;
    warrantyVariations: number[];
}

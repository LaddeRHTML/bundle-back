export interface MinMaxProductValues {
    price: [number, number];
    supplierPrice: [number, number];
    marketPrice: [number, number];
}
export interface ProductsFilter extends MinMaxProductValues {
    warrantyDays: number;
}
export interface FilterProductsResponse {
    minMaxValues: MinMaxProductValues;
    warrantyVariations: number[];
}

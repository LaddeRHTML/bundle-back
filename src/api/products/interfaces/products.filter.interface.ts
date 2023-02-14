export interface MinMaxProductValues {
    price: [number, number];
    supplier_price: [number, number];
    market_price: [number, number];
}

export interface ProductsFilter extends MinMaxProductValues {
    warranty_days: number;
}

export interface FilterProductsResponse {
    minMaxValues: MinMaxProductValues;
    warrantyVariations: number[];
}

export interface UpsertedProduct {
    acknowledged: boolean;
    modifiedCount: number;
    upsertedId: null | string;
    upsertedCount: number;
    matchedCount: number;
}

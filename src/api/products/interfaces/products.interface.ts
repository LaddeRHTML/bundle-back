interface Price {
    max: number;
    min: number;
}

export interface getPricesResponse {
    prices?: Price;
    market_prices?: Price;
    supplier_prices?: Price;
}

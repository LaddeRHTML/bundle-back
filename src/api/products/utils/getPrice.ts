const getPrice = (price: number): number => {
    return Math.round(price + price * 0.07);
};

export default getPrice;

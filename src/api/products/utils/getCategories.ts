const getCategories = (name: string, category: string): string[] => {
    let categories = [category];

    if (category === 'laptops') {
        if (
            name.indexOf('Nitro') !== -1 ||
            name.indexOf('RTX') !== -1 ||
            name.indexOf('GTX1650') !== -1
        ) {
            categories.push('gaming_laptops');
        }

        if (name.indexOf('Apple') !== -1) {
            categories.push('macbook');
        }
    }

    return categories;
};

export default getCategories;

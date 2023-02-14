import { gaming_laptops, laptop, macbook } from '../constants/templates';

const getTemplate = (categories: string[]) => {
    if (categories.includes('gaming_laptops')) {
        return gaming_laptops;
    }

    if (categories.includes('macbook')) {
        return macbook;
    }

    if (categories.includes('laptops')) {
        return laptop;
    }
};

export default getTemplate;

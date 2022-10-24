import { CATEGORIES_TO_DELETE } from 'api/products/constants/categories';
import {
    ExcelClearSheetProduct,
    ExcelSheetProduct,
    FilteredItem
} from 'api/products/types/excel.dealers.types';

export const SortExcelSheetData = (data: unknown[]) => {
    const categoryLenght = 1;

    const categoriesI = [];

    const filteredData = [] as FilteredItem[];

    const cleanData = data
        .map((el: ExcelSheetProduct) => el.filter((c) => c))
        .filter((c) => c.length > 0);

    for (let i = 0; i < cleanData.length; i++) {
        const el = cleanData[i] as ExcelClearSheetProduct;

        if (el.length > 0) {
            if (el.length === categoryLenght) {
                categoriesI.push(i);
            }
        }
    }

    for (let i = 0; i < categoriesI.length; i++) {
        const el: number = categoriesI[i];
        const nextEl: number = categoriesI[i + 1];

        const currentCategory = cleanData[el];

        const categorizedObj = {
            category: currentCategory,
            products: cleanData.slice(el + 1, nextEl - 1)
        };
        filteredData.push(categorizedObj as FilteredItem);
    }

    const availableProducts = filteredData.filter((i) => {
        return !CATEGORIES_TO_DELETE.includes(i.category[0]);
    });

    return availableProducts;
};

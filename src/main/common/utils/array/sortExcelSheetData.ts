import { AVAILABLE_CATEGORIES, CATEGORIES_TO_DELETE } from 'common/constants';
import { ExcelClearSheetProduct, ExcelSheetProduct, FilteredItem } from 'common/interfaces';

export const SortExcelSheetData = (data: ExcelSheetProduct[]) => {
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

        const currentCategory = cleanData[el][0] as string | number;

        const categorizedObj = {
            category: AVAILABLE_CATEGORIES[currentCategory] || currentCategory,
            products: cleanData.slice(el + 1, nextEl - 1)
        };
        filteredData.push(categorizedObj as FilteredItem);
    }

    const availableProducts = filteredData.filter((i) => {
        return !CATEGORIES_TO_DELETE.includes(i.category);
    });

    return availableProducts;
};

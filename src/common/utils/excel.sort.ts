import { HttpException, HttpStatus } from '@nestjs/common';
import { AVAILABLE_CATEGORIES, AVAILABLE_CATEGORIES_KEYS } from 'api/products/constants/categories';
import {
    ExcelClearSheetProduct,
    ExcelSheetProduct,
    Group
} from 'api/products/types/excel.dealers.types';

export const SortExcelSheets = (allExcelSheets: ExcelClearSheetProduct[]): Group[] => {
    const category_lenght = 1;

    let category_indeces: number[] = [];

    const groups = [];

    const filledExcelSheets = allExcelSheets
        .map((el: ExcelSheetProduct) => el.filter((c) => c))
        .filter((c) => c.length > 0);

    for (let i = 0; i < filledExcelSheets.length; i++) {
        const el = filledExcelSheets[i];

        if (el.length === category_lenght) {
            category_indeces.push(i);
        }
    }

    const allowedCategories = category_indeces.filter((i) =>
        AVAILABLE_CATEGORIES_KEYS.includes(filledExcelSheets[i][0] as string)
    );

    if (allowedCategories.length !== 2) {
        throw new HttpException('Wrong categories in file!', HttpStatus.BAD_REQUEST);
    }

    for (let i = 0; i < allowedCategories.length; i++) {
        const current_i = allowedCategories[i];
        const next_i = category_indeces.find((i) => i > current_i);
        const firstProductIndexAfterCategory = current_i + 1;

        const currentCategory = filledExcelSheets[current_i][0];

        let products = filledExcelSheets.slice(firstProductIndexAfterCategory, next_i);

        if (!next_i) {
            products = filledExcelSheets.slice(
                firstProductIndexAfterCategory,
                filledExcelSheets.length
            );
        }

        const sortedGroup = {
            category: AVAILABLE_CATEGORIES[currentCategory],
            products: products
        };

        groups.push(sortedGroup);
    }

    return groups;
};

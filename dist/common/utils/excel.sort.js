"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortExcelSheetData = void 0;
const categories_1 = require("../../api/products/constants/categories");
const SortExcelSheetData = (data) => {
    const categoryLenght = 1;
    const categoriesI = [];
    const filteredData = [];
    const cleanData = data
        .map((el) => el.filter((c) => c))
        .filter((c) => c.length > 0);
    for (let i = 0; i < cleanData.length; i++) {
        const el = cleanData[i];
        if (el.length > 0) {
            if (el.length === categoryLenght) {
                categoriesI.push(i);
            }
        }
    }
    for (let i = 0; i < categoriesI.length; i++) {
        const el = categoriesI[i];
        const nextEl = categoriesI[i + 1];
        const currentCategory = cleanData[el][0];
        const categorizedObj = {
            category: categories_1.AVAILABLE_CATEGORIES[currentCategory] || currentCategory,
            products: cleanData.slice(el + 1, nextEl - 1)
        };
        filteredData.push(categorizedObj);
    }
    const availableProducts = filteredData.filter((i) => {
        return !categories_1.CATEGORIES_TO_DELETE.includes(i.category);
    });
    return availableProducts;
};
exports.SortExcelSheetData = SortExcelSheetData;
//# sourceMappingURL=excel.sort.js.map
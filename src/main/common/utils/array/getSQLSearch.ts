const getSQLSearch = (array: string[], entityName: string): string => {
    return array.map((fname) => `${entityName}.${fname} LIKE :s`).join(' OR ');
};

export default getSQLSearch;

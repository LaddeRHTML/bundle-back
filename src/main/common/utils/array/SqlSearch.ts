export class SqlSearch {
    public getSearchableFieldsSql = (array: string[], entityName: string): string => {
        return array.map((fname) => `${entityName}.${fname} LIKE :s`).join(' OR ');
    };

    public getSearchableRelationFieldsSql = (relationsArray: string[], field: string): string => {
        return relationsArray.map((relation) => `${relation}.${field} LIKE :s`).join(' OR ');
    };
}

type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];

const checkProvidedFields = <Dto>(array: Array<PropType<Dto, keyof Dto> | undefined>): boolean => {
    return array.some((el) => !!el);
};

export default checkProvidedFields;

import moment from 'moment';

const getWarranty = (warranty_days: number): number => {
    return moment.duration(warranty_days, 'months').asDays();
};

export default getWarranty;

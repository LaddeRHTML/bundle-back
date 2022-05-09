import { ProductCharacteristic } from 'src/interfaces/product.interface';

export class ProductDto {
    public name: string;
    public type: string;
    public price: number;
    public discountPrice: number;
    public description: string;
    public previewPicture: string;
    public pictures: [string];
    public rating: number;
    public uploadDate: Date;
    public updateDate: Date;
    public characteristic: [ProductCharacteristic];
    //public comments: [];
}

export class Accessories extends ProductDto {
    public name = this.name;
    public type = this.type;
    public price = this.price;
    public discountPrice = this.discountPrice;
    public description = this.description;
    public pictures = this.pictures;
    public previewPicture = this.previewPicture;
    public rating = this.rating;
    public uploadDate = this.uploadDate;
    public updateDate = this.updateDate;
    public characteristic = this.characteristic;
}

export class Assembly extends ProductDto {
    public name = this.name;
    public type = this.type;
    public price = this.price;
    public discountPrice = this.discountPrice;
    public description = this.description;
    public pictures = this.pictures;
    public previewPicture = this.previewPicture;
    public rating = this.rating;
    public uploadDate = this.uploadDate;
    public updateDate = this.updateDate;
    public accessories: [string];
    public characteristic = this.characteristic;
}

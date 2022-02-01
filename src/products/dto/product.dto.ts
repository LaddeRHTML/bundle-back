export class ProductDto {
    public type: string;
    public price: number;
    public description: string;
    public pictures: [string];
    public rating: number;
    public uploadDate: Date;
}

export class Accessories extends ProductDto {
    public type = this.type;
    public price = this.price;
    public description = this.description;
    public pictures = this.pictures;
    public rating = this.rating;
    public uploadDate = this.uploadDate;
}

export class Assembly extends ProductDto {
    public type = this.type;
    public price = this.price;
    public description = this.description;
    public pictures = this.pictures;
    public rating = this.rating;
    public uploadDate = this.uploadDate;
    public accessories: [string];
}

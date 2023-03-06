import { PartialType } from '@nestjs/mapped-types';
import { Product } from 'model/product/Product';

export class UpdateProductDto extends PartialType(Product) {}

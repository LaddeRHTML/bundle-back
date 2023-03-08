import { PartialType } from '@nestjs/mapped-types';
import { Order } from 'model/order/Order';

export class UpdateOrderDto extends PartialType(Order) {}

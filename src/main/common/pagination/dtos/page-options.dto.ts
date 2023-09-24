import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';

import { Order } from '../enums';

export class PageOptionsDto {
    constructor(order: Order = Order.ASC) {
        this.order = order;
    }

    @ApiPropertyOptional({ enum: Order, default: Order.ASC })
    @IsEnum(Order)
    @IsOptional()
    readonly order?: Order;

    @ApiPropertyOptional({
        minimum: 1,
        default: 1
    })
    @IsInt()
    @Min(1)
    @IsOptional()
    readonly page: number = 1;

    @ApiPropertyOptional({
        minimum: 1,
        maximum: 50,
        default: 10
    })
    @IsInt()
    @Min(1)
    @Max(50)
    @IsOptional()
    readonly limit: number = 10;

    @IsOptional()
    readonly searchBy?: string;

    get skip(): number {
        return (this.page - 1) * this.limit;
    }
}

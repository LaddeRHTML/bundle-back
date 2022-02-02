import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Accessories, Assembly } from '../../dto/product.dto';
import { AccessoriesDocument, AssemblyDocument } from '../../product.schema';

@Injectable()
export class AccessoriesService {
	constructor(
		@InjectModel('accessories') private accessoriesModel: Model<AccessoriesDocument>,
  	) {}

	create(accessories: Accessories): Promise<Accessories> {
		const accessoriesModel = new this.accessoriesModel(accessories);
		return accessoriesModel.save();
	}

	async findAll(): Promise<Accessories[]> {
		return await this.accessoriesModel.find({});
	}

	async findOne(id: string): Promise<Accessories> {
		return await this.accessoriesModel.findOne({id});
	}

	async update(id: string, accessories: Accessories): Promise<Accessories> {
		return await this.accessoriesModel.findOneAndUpdate({id, accessories});
	}

	async remove(id: string): Promise<Accessories> {
		return await this.accessoriesModel.findOneAndRemove({id});
	}
}

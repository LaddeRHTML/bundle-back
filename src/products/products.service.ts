import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Accessories, Assembly } from './dto/product.dto';
import { AccessoriesDocument, AssemblyDocument } from './product.schema';

@Injectable()
export class ProductsService {
	constructor(
		@InjectModel('assembly') private assemblyModel: Model<AssemblyDocument>,
		@InjectModel('accessories') private accessoriesModel: Model<AccessoriesDocument>,
  	) {}

	//@UseGuards(JwtAuthGuard)
	createAssembly(assembly: Assembly): Promise<Assembly> {
		const assemblyModel = new this.assemblyModel(assembly);
		return assemblyModel.save();
	}

	createAccessories(accessories: Accessories) {
		const accessoriesModel = new this.accessoriesModel(accessories);
		return accessoriesModel.save();
	}

	findAll() {
		return `This action returns all products`;
	}

	findOne(id: number) {
		return `This action returns a #${id} product`;
	}

	/* update(id: number, updateProductDto: UpdateProductDto) {
		return `This action updates a #${id} product`;
	} */

	remove(id: number) {
		return `This action removes a #${id} product`;
	}
}

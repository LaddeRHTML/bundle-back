import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Accessories, Assembly } from '../../dto/product.dto';
import { AccessoriesDocument, AssemblyDocument } from '../../product.schema';

@Injectable()
export class AssemblyService {
	constructor(
		@InjectModel('assembly') private assemblyModel: Model<AssemblyDocument>,
  	) {}

	//@UseGuards(JwtAuthGuard)
	create(assembly: Assembly): Promise<Assembly> {
		const assemblyModel = new this.assemblyModel(assembly);
		return assemblyModel.save();
	}

	async findAll(): Promise<Assembly[]> {
		return await this.assemblyModel.find({});
	}

	async findOne(id: string): Promise<Assembly> {
		return await this.assemblyModel.findOne({id});
	}

	async update(id: string, assembly: Assembly): Promise<Assembly> {
		return await this.assemblyModel.findOneAndUpdate({id, assembly});
	}

	async remove(id: string): Promise<Assembly> {
		return await this.assemblyModel.findOneAndRemove({id});
	}
}

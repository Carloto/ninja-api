import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { Ninja } from './ninja.model';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Injectable()
export class NinjasService {
  constructor(
    @InjectModel('Ninja') private readonly ninjaModel: Model<Ninja>,
  ) {}

  async getNinjas(weapon?: 'shurikens' | 'nunchucks') {
    return (
      await this.ninjaModel.find({ ...(weapon && { weapon }) }).exec()
    ).map((ninja) => ({ id: ninja.id, weapon: ninja.weapon })) as Ninja[];
  }

  async findNinjaById(id: string) {
    return await this.ninjaModel.findById(id).exec();
  }

  async getNinja(id: string) {
    const ninja = await this.findNinjaById(id);
    return { id: ninja.id, name: ninja.name, weapon: ninja.weapon };
  }

  async createNinja(createNinjaDto: CreateNinjaDto) {
    const newNinja = new this.ninjaModel({
      ...createNinjaDto,
    });

    const createdNinja = await newNinja.save();

    return createdNinja.id as string;
  }

  async updateNinja(id: string, updateNinjaDto: UpdateNinjaDto) {
    const ninja = await this.findNinjaById(id);

    for (const key in updateNinjaDto) {
      ninja[key] = updateNinjaDto[key];
    }

    await ninja.save();

    return this.getNinja(id);
  }

  async removeNinja(id: string) {
    return await this.ninjaModel.deleteOne({ _id: id }).exec();
  }
}

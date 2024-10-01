import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { BeltGuard } from 'src/belt/belt.guard';

@Controller('ninjas')
export class NinjasController {
  constructor(private readonly ninjasService: NinjasService) {}

  @Get()
  async getNinjas(@Query('weapon') weapon: 'shurikens' | 'nunchucks') {
    return await this.ninjasService.getNinjas(weapon);
  }

  @Get(':id')
  async getOneNinja(@Param('id') id: string) {
    try {
      return await this.ninjasService.getNinja(id);
    } catch (error) {
      throw new NotFoundException('Ninja not in dojo...');
    }
  }

  @Post()
  @UseGuards(BeltGuard)
  async createNinja(
    @Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto,
  ) {
    return await this.ninjasService.createNinja(createNinjaDto);
  }

  @Put(':id')
  async updateNinja(
    @Param('id') id: string,
    @Body() updateNinjaDto: UpdateNinjaDto,
  ) {
    try {
      return await this.ninjasService.updateNinja(id, updateNinjaDto);
    } catch (error) {
      throw new NotFoundException('This ninja is not part of our dojo...');
    }
  }

  @Delete(':id')
  async removeNinja(@Param('id') id: string) {
    try {
      return await this.ninjasService.removeNinja(id);
    } catch (error) {
      throw new NotFoundException('Ninja already gone...');
    }
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TariffService } from './tariff.service';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { UpdateTariffDto } from './dto/update-tariff.dto';
import { ApiTags } from '@nestjs/swagger';
import { ParkService } from '../park/park.service';
import { Observable, lastValueFrom } from 'rxjs';

@ApiTags('tariff.service')
@Controller('tariff')
export class TariffController {
  constructor(
    private readonly tariffService: TariffService,
    private readonly parkService: ParkService,
  ) {}

  @Post()
  async create(@Body() createTariffDto: CreateTariffDto) {
    const responseData: Observable<any> = await this.parkService.findOne(
      createTariffDto.parkId,
    );

    await lastValueFrom(responseData);

    return this.tariffService.create(createTariffDto);
  }

  @Get()
  async findAll() {
    return await this.tariffService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.tariffService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTariffDto: UpdateTariffDto,
  ) {
    const responseData: Observable<any> = await this.parkService.findOne(
      updateTariffDto.parkId,
    );

    await lastValueFrom(responseData);

    return this.tariffService.update(id, updateTariffDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tariffService.remove(id);
  }
}

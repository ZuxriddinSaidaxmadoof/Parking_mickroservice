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
import { PlaceService } from './place.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { ApiTags } from '@nestjs/swagger';
import { LayerService } from '../layer/layer.service';
import { Observable, lastValueFrom } from 'rxjs';

@ApiTags('place.service')
@Controller('place')
export class PlaceController {
  constructor(
    private readonly placeService: PlaceService,
    private readonly layerService: LayerService,
  ) {}

  @Post()
  async create(@Body() createPlaceDto: CreatePlaceDto) {
    const responseData: Observable<any> = await this.layerService.findOne(
      createPlaceDto.layerId,
    );

    await lastValueFrom(responseData);

    return await this.placeService.create(createPlaceDto);
  }

  @Get()
  async findAll() {
    return await this.placeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.placeService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePlaceDto: UpdatePlaceDto,
  ) {
    await this.placeService.findOne(id);

    const responseData: Observable<any> = await this.layerService.findOne(
      updatePlaceDto.layerId,
    );

    await lastValueFrom(responseData);

    return await this.placeService.update(id, updatePlaceDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.placeService.remove(id);
  }
}

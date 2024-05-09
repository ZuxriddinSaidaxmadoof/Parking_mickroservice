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
import { ParkService } from './park.service';
import { CreateParkDto } from './dto/create-park.dto';
import { UpdateParkDto } from './dto/update-park.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { Observable, lastValueFrom } from 'rxjs';
import { UserNOtOwnerException } from './exception/park.exception';

@ApiTags('park.service')
@Controller('park')
export class ParkController {
  constructor(
    private readonly parkService: ParkService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(@Body() createParkDto: CreateParkDto) {
    if (createParkDto.owner) {
      const responseData: Observable<any> = await this.userService.findOne(
        createParkDto.owner,
      );

      const chekUser = await lastValueFrom(responseData);

      if (!(chekUser.data.role == 'owner')) {
        throw new UserNOtOwnerException();
      }
    }

    return this.parkService.create(createParkDto);
  }

  @Get()
  async findAll() {
    return await this.parkService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.parkService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateParkDto: UpdateParkDto,
  ) {
    if (updateParkDto.owner) {
      const responseData: Observable<any> = await this.userService.findOne(
        updateParkDto.owner,
      );

      const chekUser = await lastValueFrom(responseData);

      if (!(chekUser.data.role == 'owner')) {
        throw new UserNOtOwnerException();
      }
    }
    return await this.parkService.update(id, updateParkDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.parkService.remove(id);
  }
}

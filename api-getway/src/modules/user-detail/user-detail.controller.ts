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
import { UserDetailService } from './user-detail.service';
import { CreateUserDetailDto } from './dto/create-user-detail.dto';
import { UpdateUserDetailDto } from './dto/update-user-detail.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { Observable, lastValueFrom } from 'rxjs';

@ApiTags('user-detail')
@Controller('user-detail')
export class UserDetailController {
  constructor(
    private readonly userDetailService: UserDetailService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(@Body() createUserDetailDto: CreateUserDetailDto) {
    const responseData: Observable<any> = await this.userService.findOne(
      createUserDetailDto.userId,
    );

    await lastValueFrom(responseData);

    return this.userDetailService.create(createUserDetailDto);
  }

  @Get()
  async findAll() {
    return await this.userDetailService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.userDetailService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDetailDto: UpdateUserDetailDto,
  ) {
    const responseData: Observable<any> = await this.userService.findOne(
      updateUserDetailDto.userId,
    );

    await lastValueFrom(responseData);

    return this.userDetailService.update(id, updateUserDetailDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.userDetailService.remove(id);
  }
}

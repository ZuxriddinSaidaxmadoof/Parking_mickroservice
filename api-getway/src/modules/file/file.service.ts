import { Inject, Injectable } from '@nestjs/common';
import { Cache } from '@nestjs/cache-manager';
import { ResData } from 'src/lib/resData';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileEntity } from './entities/file.entity';
import { FileRepository } from './file.repository';

@Injectable()
export class FileService {
  constructor(private readonly repository: FileRepository,
    ){}

  async create(createFileDto: Array<CreateFileDto>) {
    const data = await this.repository.create(createFileDto);    
    return new ResData("files created", 201, data);
  }

  async findAll() {
    
    const allData = await this.repository.findAll()

    return new ResData("All files", 200, allData);
  }

  async findOne(id: number) {
    const foundFile = await this.repository.findOneById(id);
    if(!foundFile){
      return new ResData("File Not found", 404, foundFile)
    }

    return new ResData("One file by id", 200, foundFile)
  }

  async findOneByLocation(location: string) {
    const foundFile = await this.repository.findOneByPath(location);
    if(!foundFile){
      return new ResData("UserNot found", 404, foundFile)
    }

    return new ResData("One user by login", 200, foundFile)
  }

  async update(id: number, name: UpdateFileDto) {
    const data = await this.repository.findOneById(id);
    if(!data){
      return new ResData("File not found", 404);
    }
    data.name = name.name;
    const newEntity = data;
    await this.repository.update(id, newEntity)
    const findUpdatedUser = await this.repository.findOneById(id);
    
    return new ResData("File updated successfully", 200, findUpdatedUser);
  }

  async remove(id: number) {
    const data = await this.repository.findOneById(id);
    if(!data){
      return new ResData("File not found", 404);
    }

    await this.repository.delete(id)
    return new ResData("File deleted successfully", 200, data);
  }
}

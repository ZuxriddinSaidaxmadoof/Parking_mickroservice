import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { CreateFileDto } from "./dto/create-file.dto";
import { FileEntity } from "./entities/file.entity";

export class FileRepository {
    constructor(
        @InjectRepository(FileEntity)
        private usersRepository: Repository<FileEntity>,
      ) {}

      async findAll(){
        console.log("run");
        
        return await this.usersRepository.find()
      }

      async findOneById(id: number){
        return await this.usersRepository.findOneBy({id}); 
      }

      async findOneByPath(location: string){
        return await this.usersRepository.findOneBy({location}); 
      }

      async create(createUserDto: Array<CreateFileDto>):Promise<Array<FileEntity>>{
        const created = this.usersRepository.create(createUserDto)
        return await this.usersRepository.save(created); 
      }

      async update(id: number, createUserDto: CreateFileDto){
        return await this.usersRepository.update({id}, createUserDto); 
      }

      async delete(id: number){
        return await this.usersRepository.delete({id}); 
      }
}
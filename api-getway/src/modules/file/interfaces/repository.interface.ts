import { DeleteResult, UpdateResult } from "typeorm";
import { CreateFileDto } from "../dto/create-file.dto";
import { FileEntity } from "../entities/file.entity";


export interface RepositoryInterface {
     findAll(): Promise<FileEntity[]>

     findOneById(id: number): Promise<FileEntity>

     findOneByPath(path: string): Promise<FileEntity> 

     create(createUserDto: Array<CreateFileDto>): Promise<Array<FileEntity>>

     update(id: number, name: string): Promise<UpdateResult>

     delete(id: number):  Promise<DeleteResult>
}

export interface UserById {
     id: number
   }
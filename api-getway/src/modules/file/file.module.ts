import { BadRequestException, Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { existsSync, mkdir, mkdirSync } from 'fs';
import { Request } from 'express';
import { FileEntity } from './entities/file.entity';
import { FileRepository } from './file.repository';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({

        destination: (req: Request, file: Express.Multer.File, cb: (err: Error | null, dest: string) => void) =>{
          const uploadFilePath: string = "upload";
          if(!existsSync(uploadFilePath)){
            mkdirSync(uploadFilePath);
          }
            cb(null, uploadFilePath);
        },
        filename: (req: Request, file: Express.Multer.File, cb: any): void => {
          cb(
            null,
            `${file.mimetype.split("/")[0]}__${Date.now()}.${file.mimetype.split("/")[1]}`
            )
        }
      })
    }),
    TypeOrmModule.forFeature([FileEntity]),
  ],
  controllers: [FileController],
  providers: [FileService, FileRepository],
})
export class FileModule {}

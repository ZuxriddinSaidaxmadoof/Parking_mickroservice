import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Inject } from '@nestjs/common';
import { FileService } from './file.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileEntity } from './entities/file.entity';
import { config } from 'src/common/config';
import { UpdateFileDto } from './dto/update-file.dto';

@ApiTags("Files")
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService,
    ) {}


@Post('upload-multiple')
@ApiConsumes("multipart/form-data")
@ApiBody({
  type: 'multipart/form-data',
  schema: {
    type: 'object',
    properties: {
      ['file']: {
        type: 'array',
        items: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  }
})
@UseInterceptors(FilesInterceptor('file', 4))
async uploadMultiFile(
  @UploadedFiles() files: Array<Express.Multer.File>) {
    
  const allFiles: Array<FileEntity> = [];
  files.map((file) => {
    const fileEntity = new FileEntity();
    fileEntity.minetype = file.mimetype;
    fileEntity.name = file.filename;
    fileEntity.size = file.size;
    fileEntity.location = `http://localhost:${config.serverPort}/${file.filename}`;
    allFiles.push(fileEntity);
  } )
  return this.fileService.create(allFiles);
}
  @Get()

  findAll() {
    return this.fileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() name: UpdateFileDto) {
    return this.fileService.update(+id, name);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileService.remove(+id);
  }
}

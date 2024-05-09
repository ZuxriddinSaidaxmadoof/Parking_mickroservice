// import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import {config} from "../config/index"
import { FileEntity } from 'src/modules/file/entities/file.entity';
// import { IConfig } from './interfaces/config.interface';
dotenv.config();


export const typeOrmConfig: DataSourceOptions = {
  type: "postgres",
  url: config.dbUrl,
  entities: [FileEntity],
  migrations: [__dirname + '/../../database/migration/*{.js, .ts}'],
  synchronize: true
}

export default new DataSource(typeOrmConfig);

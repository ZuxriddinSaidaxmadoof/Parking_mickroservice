import { BaseEntity } from 'src/common/base.database/base.entity';
import { Column, Entity} from 'typeorm';

@Entity('files')
export class FileEntity extends BaseEntity{
  @Column({type: 'text', nullable: false })
  location: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  name: string;

  @Column({ type: 'text', nullable: false })
  minetype: string;

  @Column({ type: 'int', nullable: false})
  size: number;
}
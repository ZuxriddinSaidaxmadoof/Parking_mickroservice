import { createConnection, DataSource } from 'typeorm';
import { typeOrmConfig } from '../../common/config/typeorm.config';
import { UserEntity } from '../../modules/user/entities/user.entity';
import { UserDetailEntity } from '../../modules/user-detail/entities/user-detail.entity';
import { UserTariffEntity } from '../../modules/user-tariff/entities/user-tariff.entity';
import { hashed } from '../../lib/bcrypt';
import { RoleEnum } from 'src/common/types/enums';

(async () => {
  const datasource: DataSource = await createConnection(typeOrmConfig);

  const queryRunner = datasource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    const userRepository = queryRunner.manager.getRepository(UserEntity);
    const detailRepository =
      queryRunner.manager.getRepository(UserDetailEntity);
    const tarifRepository = queryRunner.manager.getRepository(UserTariffEntity);

    const users = await userRepository.find();
    await userRepository.remove(users);
    const detail = await detailRepository.find();
    await detailRepository.remove(detail);
    const tarif = await tarifRepository.find();
    await tarifRepository.remove(tarif);

    const hashedPassword = await hashed('1234');

    const dto = {
      phone: '+998999999999',
      password: hashedPassword,
      parkId: 1,
      role: RoleEnum.Client,
    };

    let user = userRepository.create(dto);
    user = await userRepository.save(user);

    const heshPassword2 = await hashed('1234');

    const dto2 = {
      phone: '+998997777777',
      password: heshPassword2,
      parkId: 1,
      role: RoleEnum.Owner,
    };

    let user2 = userRepository.create(dto2);
    user2 = await userRepository.save(user2);

    const heshPassword = await hashed('1234');

    const dto3 = {
      phone: '+998998888888',
      password: heshPassword,
      parkId: 1,
      role: RoleEnum.Admin,
    };

    let user3 = userRepository.create(dto3);
    user3 = await userRepository.save(user3);

    let detail1 = detailRepository.create({
      firstname: 'John',
      lastname: 'Smith',
      userId: 1,
    });
    detail1 = await detailRepository.save(detail1);

    let detail2 = detailRepository.create({
      firstname: 'Ali',
      lastname: 'Vali',
      userId: 2,
    });
    detail2 = await detailRepository.save(detail2);

    let detail3 = detailRepository.create({
      firstname: 'Nail',
      lastname: 'Valid',
      userId: 3,
    });
    detail3 = await detailRepository.save(detail3);

    let tariff1 = tarifRepository.create({
      userId: 1,
      tariffId: 1,
      startedAt: '2024-05-09',
      endedAt: '2024-05-10',
    });
    tariff1 = await tarifRepository.save(tariff1);

    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
})();

import { Module } from '@nestjs/common';
import { ParkModule } from './modules/park/park.module';
import { LayerModule } from './modules/layer/layer.module';
import { PlaceModule } from './modules/place/place.module';
import { TariffModule } from './modules/tariff/tariff.module';
import { ServiceModule } from './modules/service/service.module';
import { typeOrmConfig } from './common/config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ParkModule,
    LayerModule,
    PlaceModule,
    TariffModule,
    ServiceModule,
  ],
})
export class AppModule {}

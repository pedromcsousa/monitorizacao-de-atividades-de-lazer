import { Module } from '@nestjs/common';
import { ConfigModule as Conf } from '@nestjs/config';

@Module({
  imports: [
    Conf.forRoot({
      isGlobal: true,
    }),
  ],
})
export class ConfigModule {}

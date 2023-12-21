import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LorawanModule } from './lorawan/lorawan.module';
import { HealthCheckModule } from './health-check/health-check.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ConfigModule, LorawanModule, HealthCheckModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

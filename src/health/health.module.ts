import { Global, Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

// @Global()
@Module({
  providers: [HealthService],
  exports: [HealthService],
  controllers: [HealthController],
})
export class HealthModule {}

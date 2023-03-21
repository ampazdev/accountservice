import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('healthcheck')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  healthCheck(): string {
    return this.healthService.getHello();
  }
}

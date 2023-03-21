import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class HealthService {
    getHello(): string {
        return 'Hello World!';
    }
}

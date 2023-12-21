import { Response } from 'express'

import { Controller, Get, HttpStatus, Res } from '@nestjs/common';

@Controller('health')
export class HealthCheckController {
  @Get()
  healthCheck(@Res() res: Response) {
    res.status(HttpStatus.OK).send('OK');
  }
}

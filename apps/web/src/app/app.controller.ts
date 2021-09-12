import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller('nestjs')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }
}

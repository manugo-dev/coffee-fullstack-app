import { Controller, Get } from '@nestjs/common';
import * as sampleData from './data/sampleData';

@Controller()
export class AppController {
  @Get()
  getItems() {
    return sampleData.items;
  }
}

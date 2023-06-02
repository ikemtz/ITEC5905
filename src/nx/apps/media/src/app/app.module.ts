import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { PinataService } from './pinata.service';

@Module({
  imports: [],
  controllers: [MediaController],
  providers: [PinataService],
})
export class AppModule { }

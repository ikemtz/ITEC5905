import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { PinataService } from './pinata.service';
import { HttpModule } from '@nestjs/axios';
import { ImageController } from './image.controller';

@Module({
  imports: [HttpModule],
  controllers: [MediaController, ImageController],
  providers: [PinataService],
})
export class AppModule { }

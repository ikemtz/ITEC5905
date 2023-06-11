import {
  Controller,
  Get,
  Logger,
  Query,
  Res,
  HttpStatus,
  StreamableFile,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import { Observable, map, tap } from 'rxjs';

import { Response } from 'express';

@ApiTags('Pictures')
@Controller('picture')
export class PictureController {
  private readonly regex = /^data:([a-z\/]*)/y;
  constructor(private readonly httpService: HttpService) { }

  @Get()
  @ApiOkResponse({ type: String })
  @ApiQuery({ name: 'fileType', type: String })
  @ApiQuery({ name: 'ipfsHash', type: String })
  public getFile(
    @Query() query: { ipfsHash: string; fileType: string },
    @Res() res: Response
  ): Observable<StreamableFile> {
    const fileType = this.regex.exec(query.fileType)[1];
    return this.httpService
      .get<string>(`https://gateway.pinata.cloud/ipfs/${query.ipfsHash}`, {
        headers: {
          pinata_api_key: process.env.pinataApiKey,
          pinata_secret_api_key: process.env.pinataSecretApiKey,
          Accept: 'text/plain',
        },
      })
      .pipe(
        map((x) => {
          const binaryString = atob(x.data);
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          return bytes;
        }),

        map(
          (x) =>
            new StreamableFile(x, { type: fileType })
        )
      );
  }
}

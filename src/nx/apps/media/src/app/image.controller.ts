import { Controller, Get, Logger, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import { Observable, map, tap } from 'rxjs';

@ApiTags('Images')
@Controller('image')
export class ImageController {
  constructor(private readonly httpService: HttpService) { }

  @Get()
  @ApiOkResponse({ type: String })
  @ApiQuery({ name: 'fileType', type: String })
  @ApiQuery({ name: 'ipfsHash', type: String })
  public getFile(@Query() query: { ipfsHash: string, fileType: string }): Observable<{ data: string }> {
    return this.httpService.get<string>(`https://gateway.pinata.cloud/ipfs/${query.ipfsHash}`, {
      headers: {
        pinata_api_key: process.env.pinataApiKey,
        pinata_secret_api_key: process.env.pinataSecretApiKey,
        Accept: "text/plain",
      }
    })
      .pipe(
        //tap(x => Logger.log(x.data)),
        map(x => ({ data: x.data })));
  }
}

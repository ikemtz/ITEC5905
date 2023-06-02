import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PinataService } from './pinata.service';
import { ApiOkResponse, ApiOperation, ApiTags, ApiQuery } from '@nestjs/swagger';
import { MediaUploadRequest } from '../models/media-upload-request';
import { MediaDataResponse } from '../models/media-meta-data';
import { UploadFileResponse } from '../models/upload-file-response';

@ApiTags('Media')
@Controller('media')
export class MediaController {
  constructor(private readonly pinataService: PinataService) { }

  @Get()
  @ApiOkResponse({ type: MediaDataResponse, isArray: true })
  @ApiQuery({ name: 'ipfsHash', type: String })
  public async getFiles(@Query('ipfsHash') ipfsHash: string | undefined): Promise<MediaDataResponse[]> {
    const result = await this.pinataService.getFiles(ipfsHash);
    return result.map(x => (
      {
        ipfsHash: x.ipfs_pin_hash,
        fileSize: x.size,
        fileName: x.metadata.name.toString(),
        createdOnUtc: new Date(x.date_pinned),
        referenceId: x.metadata.refId.toString(),
        referenceName: x.metadata.refName.toString(),
      }
    ))
  }

  @Post()
  @ApiOperation({
    description: 'Uploads a file to IPFS and returns an IPFS hash (CID) of the uploaded file',
  })
  @ApiOkResponse({ type: UploadFileResponse })
  public async uploadFile(@Body() request: MediaUploadRequest): Promise<UploadFileResponse> {
    const result = await this.pinataService.uploadFile(request);
    return {
      ipfsHash: result.IpfsHash,
      fileSize: result.PinSize,
      createdOnUtc: new Date(result.Timestamp)
    };
  }
}

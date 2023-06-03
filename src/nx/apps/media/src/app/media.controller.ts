import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { PinataService } from './pinata.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MediaUploadRequest } from '../models/media-upload-request';
import { MediaDataResponse } from '../models/media-meta-data';
import { MediaUploadResponse } from '../models/media-upload-response';
import { MediaUpdateRequest } from '../models/media-update-request';
import { MediaUpdateResponse } from '../models/media-update-response';

@ApiTags('Media')
@Controller('media')
export class MediaController {
  constructor(private readonly pinataService: PinataService) { }

  @Get()
  @ApiOkResponse({ type: MediaDataResponse, isArray: true })
  public async getFiles(): Promise<MediaDataResponse[]> {
    const result = await this.pinataService.getFiles();
    return result.map(x => (
      {
        ipfsHash: x.ipfs_pin_hash,
        fileSize: x.size,
        fileName: x.metadata.name.toString(),
        fileType: x.metadata.fileType.toString(),
        createdOnUtc: new Date(x.date_pinned),
        referenceType: x.metadata.refType.toString(),
        referenceName: x.metadata.refName.toString(),
      }
    ))
  }

  @Post()
  @ApiOperation({
    description: 'Uploads a file to IPFS and returns an IPFS hash (CID) of the uploaded file',
  })
  @ApiOkResponse({ type: MediaUploadResponse })
  public async uploadMedia(@Body() request: MediaUploadRequest): Promise<MediaUploadResponse> {
    const result = await this.pinataService.uploadFile(request);
    return {
      ipfsHash: result.IpfsHash,
      fileSize: result.PinSize,
      createdOnUtc: new Date(result.Timestamp)
    };
  }

  @Put()
  @ApiOperation({
    description: 'Updates the metadata associated with an IPFS entry',
  })
  @ApiOkResponse({ type: MediaUpdateResponse })
  public async updateMediaMetaData(@Body() request: MediaUpdateRequest): Promise<MediaUpdateResponse> {
    const result = await this.pinataService.updateMetaData(request);
    return {
      ipfsHash: result.IpfsHash,
      referenceType: request.referenceType,
      referenceName: request.referenceName
    };
  }

  @Delete()
  @ApiOperation({
    description: 'Deletes an IPFS entry',
  })
  @ApiOkResponse({ type: MediaUploadResponse })
  public async deleteMedia(@Query() ipfsHash: string): Promise<unknown> {
    const result = await this.pinataService.deleteMedia(ipfsHash);
    return result;
  }
}

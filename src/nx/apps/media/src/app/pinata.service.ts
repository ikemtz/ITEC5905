import { Injectable, Logger } from '@nestjs/common';
import PinataClient, { PinataPin, PinataPinListFilterOptions, PinataPinResponse } from '@pinata/sdk';
import { Readable } from 'stream';
import { MediaUploadRequest } from '../models/media-upload-request';
import { MediaUpdateRequest } from '../models/media-update-request';

@Injectable()
export class PinataService {

  private readonly pinataClient: PinataClient;
  constructor() {
    const apiKey = process.env.pinataApiKey;
    const secretApiKey = process.env.pinataSecretApiKey;
    this.pinataClient = new PinataClient(apiKey, secretApiKey);
  }

  public async testAuthentication(): Promise<void> {
    const result = await this.pinataClient.testAuthentication();
    Logger.log(JSON.stringify(result))
  }

  public async getFiles(): Promise<PinataPin[]> {
    const options: PinataPinListFilterOptions = {};
    const resp = await this.pinataClient.pinList(options);
    return resp.rows;
  }

  public async uploadFile(request: MediaUploadRequest): Promise<PinataPinResponse> {
    const readableStream = Readable.from(request.content);
    return await this.pinataClient.pinFileToIPFS(readableStream, {
      pinataMetadata: {
        refType: request.referenceType,
        refName: request.referenceName,
        name: request.fileName,
        fileType: request.fileType
      }
    });
  }

  public async updateMetaData(request: MediaUpdateRequest): Promise<PinataPinResponse> {
    return await this.pinataClient.hashMetadata(request.ipfsHash, {
      refType: request.referenceType,
      refName: request.referenceName,
    });
  }

  public async deleteMedia(ipfsHash: string): Promise<unknown> {
    return await this.pinataClient.unpin(ipfsHash);
  }
}

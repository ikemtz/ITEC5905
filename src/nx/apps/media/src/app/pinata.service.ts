import { Injectable, Logger } from '@nestjs/common';
import PinataClient, { PinataPin, PinataPinListFilterOptions, PinataPinResponse } from '@pinata/sdk';
import { Readable } from 'stream';
import { MediaUploadRequest } from '../models/media-upload-request';

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

  public async getFiles(ipfsHash: string | undefined): Promise<PinataPin[]> {
    const options: PinataPinListFilterOptions = {};
    if (ipfsHash) {
      options.hashContains = ipfsHash;
    }
    const resp = await this.pinataClient.pinList(options);
    return resp.rows;
  }

  public async uploadFile(request: MediaUploadRequest): Promise<PinataPinResponse> {
    const buffer = Buffer.from(request.content, 'base64').toString('binary');
    const readableStream = Readable.from(buffer);
    return await this.pinataClient.pinFileToIPFS(readableStream, {
      pinataMetadata: {
        refId: request.referenceId,
        refName: request.referenceName,
        name: request.fileName,
      }
    });
  }
}

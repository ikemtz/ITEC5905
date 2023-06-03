import { ApiProperty } from "@nestjs/swagger";

export class MediaUploadResponse {

  @ApiProperty()
  ipfsHash: string;
  @ApiProperty()
  fileSize: number;
  @ApiProperty()
  createdOnUtc: Date;
} 
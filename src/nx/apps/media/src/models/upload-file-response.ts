import { ApiProperty } from "@nestjs/swagger";

export class UploadFileResponse {

  @ApiProperty()
  ipfsHash: string;
  @ApiProperty()
  fileSize: number;
  @ApiProperty()
  createdOnUtc: Date;
} 
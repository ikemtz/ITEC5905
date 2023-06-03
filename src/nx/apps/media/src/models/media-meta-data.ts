import { ApiProperty } from "@nestjs/swagger";
import { MediaUploadResponse } from "./media-upload-response";

export class MediaDataResponse extends MediaUploadResponse {
  @ApiProperty()
  fileName: string;

  @ApiProperty()
  fileType: string;
  @ApiProperty()
  referenceType: string;
  @ApiProperty()
  referenceName: string;
}
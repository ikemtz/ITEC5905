import { ApiProperty } from "@nestjs/swagger";
import { UploadFileResponse } from "./upload-file-response";

export class MediaDataResponse extends UploadFileResponse {
  @ApiProperty()
  fileName: string;
  @ApiProperty()
  referenceId: string;
  @ApiProperty()
  referenceName: string;
}
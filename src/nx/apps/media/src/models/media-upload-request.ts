import { ApiProperty } from "@nestjs/swagger";

export class MediaUploadRequest {
  @ApiProperty({
    description: 'This should be base64 encoded string',
    maximum: 1000000,
    type: 'string',
    format: 'byte',
    required: true
  })
  content: string;

  @ApiProperty({
    maximum: 150,
    required: true
  })
  fileName: string;

  @ApiProperty({
    maximum: 150,
    required: true
  })
  referenceName: string;

  @ApiProperty({
    maximum: 150,
    required: true
  })
  referenceId: string;
}
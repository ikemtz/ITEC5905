import { ApiProperty } from "@nestjs/swagger";

export class MediaUpdateResponse {
  @ApiProperty({
    maximum: 150,
    required: true,
  })
  ipfsHash: string;

  @ApiProperty({
    maximum: 150,
    required: true
  })
  referenceName: string;

  @ApiProperty({
    maximum: 150,
    required: true
  })
  referenceType: string;
}
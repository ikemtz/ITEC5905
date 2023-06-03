import { ApiProperty } from "@nestjs/swagger";

export class MediaUpdateRequest {
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
    required: false
  })
  referenceType: string;
}

import { Test } from '@nestjs/testing';
import { faker } from '@faker-js/faker'
import { PinataService } from './pinata.service';
import { readFileSync } from 'fs';

describe('PinataService', () => {
  let service: PinataService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [PinataService],
    }).compile();

    service = app.get<PinataService>(PinataService);
  });

  it('should get a file"', async () => {
    const result = await service.getFiles('');
    expect(result).toMatchSnapshot();
  });

  it('should upload a file"', async () => {
    const fileContents = btoa(readFileSync('./swagger.json', { encoding: 'utf-8' }));
    const resp = await service.uploadFile({
      fileName: `${faker.person.firstName()}.json`,
      referenceId: faker.commerce.productName(),
      referenceName: faker.commerce.productDescription(),
      content: fileContents,
    });
    expect(resp).toMatchSnapshot();
  });
});

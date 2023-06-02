import { Test, TestingModule } from '@nestjs/testing';

import { MediaController } from './media.controller';
import { PinataService } from './pinata.service';
import { faker } from '@faker-js/faker';

describe('MediaController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [MediaController],
      providers: [{
        provide: PinataService,
        useValue: {
          getFiles: jest.fn((x) => Promise.resolve([{
            id: x,
            ipfs_pin_hash: '😎😎',
            size: 1001,
            date_pinned: '1/1/2023',
            metadata: {
              refId: `1234-dabe`,
              refName: `Modern Bronze Car`,
              name: `asdf.json`,
            }
          }])),
          uploadFile: jest.fn((x) => Promise.resolve({ id: x, IpfsHash: '😎😎', Timestamp: 234239 })),
        }
      }],
    }).compile();
  });

  it('should Get Files', async () => {
    const appController = app.get<MediaController>(MediaController);
    const pinataService = app.get<PinataService>(PinataService);
    const result = await appController.getFiles('');
    expect(result[0]).toMatchSnapshot({
      createdOnUtc: expect.any(Date)
    });
    expect(pinataService.getFiles).toHaveBeenNthCalledWith(1, '');
  });

  it('should Upload Files', async () => {
    const appController = app.get<MediaController>(MediaController);
    const pinataService = app.get<PinataService>(PinataService);
    const result = await appController.uploadFile({
      fileName: 'goodTimes.exe',
      content: '😒',
      referenceId: faker.commerce.productName(),
      referenceName: faker.commerce.productDescription(),
    });
    expect(result).toMatchSnapshot({
      createdOnUtc: expect.any(Date)
    });
    expect(pinataService.uploadFile).toBeCalledTimes(1);
  });
});

import { faker } from '@faker-js/faker';
import { S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { S3Service } from './s3.service';

describe('Src :: Common :: AWS :: S3 :: S3Service', () => {
  let s3Service: S3Service;
  let configService: ConfigService;
  let s3ClientMock: jest.Mocked<S3Client>;

  const configGet = jest.fn((key: string) => {
    switch (key) {
      case 'AWS_S3_REGION':
        return faker.location.state();
      case 'AWS_S3_ENDPOINT':
        return 'http://localhost:4566';
      case 'AWS_ACCESS_KEY_ID':
        return faker.string.uuid();
      case 'AWS_SECRET_ACCESS_KEY':
        return faker.string.uuid();
      case 'AWS_S3_BUCKET_NAME':
        return 's3-bucket';
      default:
        console.log({ key });
        throw new Error();
    }
  });

  const mockConfigService = {
    getOrThrow: configGet,
    get: configGet,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        S3Service,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: S3Client,
          useFactory: () => ({
            send: jest.fn(),
          }),
        },
      ],
    }).compile();

    s3Service = module.get<S3Service>(S3Service);
    configService = module.get<ConfigService>(ConfigService);
    s3ClientMock = new S3Client({}) as jest.Mocked<S3Client>;
  });

  /* MailerService must be defined */
  describe('S3Service dependency initialization', () => {
    it('should be defined', () => {
      expect(s3Service).toBeDefined();
      expect(configService).toBeDefined();
      expect(s3ClientMock).toBeDefined();
    });
  });

  describe('upload()', () => {
    it('should return the S3 URL for the uploaded file', async () => {
      jest.spyOn(s3ClientMock, 'send').mockImplementationOnce(async () => {
        return {
          url: faker.internet.avatar(),
        };
      });

      // Use a type assertion to bypass the readonly check - readonly and private function
      (s3Service as any)['s3Client'] = s3ClientMock;

      const fileName = 'sample.png';
      const fileBuffer = Buffer.from(faker.internet.avatar(), 'utf-8');

      const response = await s3Service.upload(fileName, fileBuffer);

      expect(response).toEqual(
        `${configService.get('AWS_S3_ENDPOINT')}/${configService.get(
          'AWS_S3_BUCKET_NAME',
        )}/images/${fileName}`,
      );
    });
  });
});

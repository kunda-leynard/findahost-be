import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  constructor(private readonly configService: ConfigService) {}

  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
    endpoint: this.configService.getOrThrow('AWS_S3_ENDPOINT'),
    forcePathStyle: true,
    credentials: {
      accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
    },
  });

  async upload(fileName: string, file: Buffer): Promise<string> {
    const response = await this.s3Client.send(
      new PutObjectCommand({
        Bucket: `${this.configService.get('AWS_S3_BUCKET_NAME')}`,
        Key: `images/${fileName}`,
        Body: file,
      }),
    );

    if (response)
      return `${this.configService.get(
        'AWS_S3_ENDPOINT',
      )}/${this.configService.get('AWS_S3_BUCKET_NAME')}/images/${fileName}`;
  }
}

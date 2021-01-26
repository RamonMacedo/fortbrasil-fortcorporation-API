import fs from 'fs';
import path from 'path';
import mime from 'mime';
import aws, { S3 } from 'aws-sdk';
import uploadConfig from '@config/upload';

interface Props {
  file: string;
  typeBucket: 'establishments' | 'users';
  newName?: string;
}

export default class S3StorageProvider {
  private cliente: S3;

  constructor() {
    this.cliente = new aws.S3({
      region: 'us-east-1',
    });
  }

  public async saveFile({ file, typeBucket, newName }: Props): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    let newNameSet = null;

    if (newName) {
      newNameSet = `${newName}.${originalPath.split('.').pop()}`;
    }

    const fileContent = await fs.promises.readFile(originalPath);

    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      throw new Error('File not found');
    }

    await this.cliente
      .putObject({
        Bucket: `fortcorporation-${typeBucket}`,
        Key: newNameSet || file,
        ACL: 'public-read',
        ContentType,
        Body: fileContent,
      })
      .promise();

    await fs.promises.unlink(originalPath);

    return newNameSet || file;
  }

  public async deleteFile({ file, typeBucket }: Props): Promise<void> {
    await this.cliente
      .deleteObject({
        Bucket: `fortcorporation-${typeBucket}`,
        Key: file,
      })
      .promise();
  }
}

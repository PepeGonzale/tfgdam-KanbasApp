import AWS from 'aws-sdk';
import { Readable } from 'stream';
import sharp from 'sharp';
import config from '../config/config';

const storage = new AWS.S3({
    region: config.AWS_REGION,
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
});

const uploadToBucket = async (bucketName: string, file: any) => {
    const resizedImage = await sharp(file.tempFilePath)
        .resize(500, 300)
        .toBuffer();

    const stream = new Readable();
    stream.push(resizedImage);
    stream.push(null);

    const params = {
        Bucket: bucketName,
        Key: file.name,
        Body: stream,
    };
    return storage.upload(params).promise();
};

export { uploadToBucket };

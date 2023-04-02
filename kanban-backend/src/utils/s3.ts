import AWS from 'aws-sdk';
import fs from 'fs';
import { Readable } from 'stream';
import sharp from 'sharp';
const config = require('../config/config')
const region=config.region
const secretAccessKey = config.secretKey
const accessKeyId = config.accesId
const storage = new AWS.S3({
    region,
    accessKeyId,
    secretAccessKey
});


const getBuckets = () => {
    return storage.listBuckets().promise();
};

const uploadToBucket = async (bucketName,file) => {
    // Use Sharp to resize the image
    const resizedImage = await sharp(file.tempFilePath)
      .resize(500, 300) // resize to width of 500 pixels, maintain aspect ratio
      .toBuffer(); // convert to buffer
  
    // Create a read stream from the resized image buffer
    const stream = new Readable();
    stream.push(resizedImage);
    stream.push(null);
  
    const params = {
      Bucket:bucketName,
      Key:file.name,
      Body:stream
    };
    return storage.upload(params).promise();
  };
  

export {
    getBuckets,
     uploadToBucket 
};
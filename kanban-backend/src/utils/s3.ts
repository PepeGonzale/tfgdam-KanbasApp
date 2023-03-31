import AWS from 'aws-sdk';
import fs from 'fs';
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

 const uploadToBucket = (bucketName,file) => {
    const stream = fs.createReadStream(file.tempFilePath);
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
 const S3 = require('aws-sdk/clients/s3');
 const fs = require('fs');
 
 const region = "us-east-1";
 const accessKeyId = "AKIAZAQMWPE3J4H3YIUF";
 const secretAccessKey = "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";
 const nameBucket= "dsn13vc";


const storage = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

const getBuckets = () => {
    return storage.listBuckets().promise();
}

const uploadToBucket = (file) => {
    const stream = fs.createReadStream(file.tempFilePath);
    const params = {
        Bucket:nameBucket,
        Key: file.name, 
        Body: stream 
    };
    return storage.upload(params).promise();
};

module.exports = {
    getBuckets,
    uploadToBucket
};
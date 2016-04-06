"use strict";

class TestS3 {
    constructor(awsSdk) {
        this.aws = awsSdk;
        this.configure();
        this.s3Bucket = null;
    }

    app() {
        if (! this.s3Bucket) {
            
        }

        return this.s3Bucket;
    }


    configure() {
        this.aws.config.region = "us-east-1";
    }

    getFile(key) {
        var s3Bucket, thing;
        
        if (! key) {
            key = "test-file-0";
        }

        s3Bucket = new this.aws.S3();
        s3Bucket.getObject({Bucket: this.config.bucket, Key: key}).on('success', (response) => {
            this.logger.info("Got file: " + key);
        }).on("error", () => {
            this.logger.error("Could not retrieve file: " + key);
        }).send();
    }

    listFiles() {
        var s3Bucket, data;
        
        s3Bucket = new this.aws.S3();
        s3Bucket.listObjects({Bucket: this.config.bucket}).on('success', (response) => {
            if (response.data) {
                return response.data;
            }
        }).send();
    }

    /**
     * Puts a bits of data to the designated S3 bucket.
     *
     *
     */
    putFiles() {
        var i, repetitions, s3Bucket, uploaded;
        repetitions = 20;
        uploaded = "Uploaded:" + "\n";
        s3Bucket = new this.aws.S3({params: {Bucket: "opentoken-io-test-s3"}});
        
        var callback = function(err, data) {
            if (err) {
                uploaded += "Error uploading data to opentoken-io-test-s3/test-file" + i + " " + err.toString() + "\n";
            } else {
                uploaded += "Successfully uploaded data to opentoken-io-test-s3/test-file" + i + "\n";
            }
        };
        
        s3Bucket.createBucket(function() {
            for (i = 0; i < repetitions; i += 1) {
                var params = {Key: "test-file" + i, Body: "Hello!"};
                s3Bucket.upload(params, callback);
            }
        }).send();
        
        return uploaded;
    }
}

module.exports = TestS3;
"use strict"

class TestS3 {
    constructor(awsSdk) {
        this.aws = awsSdk;
        this.configure();
        this.s3Bucket = null;
    }

    app() {
        if (! this.s3Bucket) {
            this.s3Bucket = new this.aws.S3({params: {Bucket: "opentoken-io-test-s3"}});
        }

        return this.s3Bucket;
    }


    configure() {
        this.aws.config.region = "us-east-1";
    }


    /**
     * Gets the data off the designated S3 bucket.
     *
     *
     */
    getFiles() {


    }

    /**
     * Puts a bits of data to the designated S3 bucket.
     *
     *
     */
    putFiles() {
        this.app().createBucket(function() {
            var params = {Key: "test-file", Body: "Hello!"};

            this.app().upload(params, function(err, data) {
                if (err) {
                    return "Error uploading data" + err.toString();
                } else {
                    return "Successfully uploaded data to opentoken-io-test-s3/test-file";
                }
            });
        });
    }
}

module.exports = TestS3
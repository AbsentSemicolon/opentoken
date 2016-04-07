"use strict";

class TestS3 {
    constructor(awsSdk) {
        this.aws = awsSdk;
        this.configure();
        this.s3Bucket = null;
    }


    /**
     * Creates the S3 bucket we need for calls
     *
     * @return {Object} s3Bucket
     */
    app() {
        if (! this.s3Bucket) {
            this.s3Bucket = new this.aws.S3({params: {Bucket: "opentoken-io-test-s3"}});
        }

        return this.s3Bucket;
    }


    /**
     * Configures options when we need to
     */
    configure() {
        this.aws.config.region = "us-east-1";
    }

    /**
     * Get a file.
     *
     * @param {Object} req
     * @param {Object} res
     * @param {Object} next
     */
    getFile(res, next) {
        this.app().getObject({Key: "test-file"}).on("success", (response) => {
            res.send(200);
            next();
        }).on("error", () => {
            res.send(500);
            next();
        }).send();
    }


    /**
     * Puts a bits of data to the designated S3 bucket.
     *
     * @param {Object} req
     * @param {Object} res
     * @param {Object} next
     */
    putFile(req, res, next) {
        var callback, fileName, query;
        query = req.getUrl().query;

        if (! query) {
            fileName = "test-file-" + Math.floor((Math.random() * 1000000) + 1);
        } else {
            fileName = query;
        }

        callback = function(err, data) {
            if (err) {
                res.send(500);
            } else {
                res.send(200);
            }
            
            next();
        };

        var params = {Key: fileName, Body: "Hello!"};
        this.app().upload(params, callback);
    }
}

module.exports = TestS3;
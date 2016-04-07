"use strict";

class ApiServer {
    constructor(config, logger, webServer, testS3) {
        this.webServer = webServer;
        this.testS3 = testS3;
        this.webServer.configure(config.server);
        this.webServer.addRoute("get", "/", (req, res, next) => {
            res.setHeader("content-type", "text/plain");
            res.send("API running " + (new Date()));
            next();
        });
        this.webServer.addRoute("post", "/tests3putfile", (req, res, next) => {
            res.setHeader("content-type", "text/plain");
            this.testS3.putFile(req, res, next);
        });
        this.webServer.addRoute("get", "/tests3getfile", (req, res, next) => {
            res.setHeader("content-type", "text/plain");
            this.testS3.getFile(res, next)
        });
        this.webServer.startServer();
    }
};

module.exports = ApiServer;
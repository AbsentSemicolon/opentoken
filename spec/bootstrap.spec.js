"use strict";

describe("bootstrap", () => {
    var bootstrap, containerMock, schemaMock;

    beforeEach(() => {
        var loadSchemaMock, promiseMock;

        containerMock = jasmine.createSpyObj("containerMock", [
            "provide",
            "resolve"
        ]);
        containerMock.resolve.andCallFake(() => {
            return promiseMock.resolve(schemaMock);
        });
        containerMock.provide.andCallFake(() => {
            return {};
        });
        loadSchemaMock = jasmine.createSpy().andCallFake(() => {
            return promiseMock.resolve(schemaMock);
        });
        schemaMock = require("./mock/schema-mock");
        promiseMock = require("./mock/promise-mock");
        bootstrap = require("../lib/bootstrap")(containerMock, loadSchemaMock);
    });
    it("bootstraps the application", (done) => {
        bootstrap.then(() => {
            expect(containerMock.provide).toHaveBeenCalledWith("schema", schemaMock);
        }).then(done, done);
    });
});
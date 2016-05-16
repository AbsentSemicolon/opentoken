"use strict";

describe("load-schema", () => {
    var loadSchema, schemaUninitializedMock;

    beforeEach(() => {
        schemaUninitializedMock = require("./mock/schema-mock");
        loadSchema = require("../lib/load-schema")(schemaUninitializedMock);
    });
    it("loads the schemas", (done) => {
        loadSchema.then((schema) => {
            expect(schema).toEqual(schemaUninitializedMock);
        }).then(done, done);
    });
});
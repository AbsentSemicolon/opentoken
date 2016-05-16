"use strict"

var schemaMock;

schemaMock = jasmine.createSpyObj("schemaMock", [
    "loadSchemaAsync",
    "loadSchemaFolderAsync",
    "validate"
]);
schemaMock.loadSchemaAsync.andCallFake(() => {
    return new Promise((resolve, reject) => {
        resolve();
    });
});
schemaMock.loadSchemaFolderAsync.andCallFake(() => {
    return new Promise((resolve, reject) => {
        resolve();
    });
});
schemaMock.validate.andCallFake(() => {
    return true;
});

module.exports = schemaMock;
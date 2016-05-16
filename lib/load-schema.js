"use strict";

module.exports = function (schemaUninitialized) {
    return schemaUninitialized.loadSchemaFolderAsync("./lib/schema/**/*.json").then(() => {
        return schemaUninitialized;
    });
};
"use strict";

module.exports = function (container, loadSchema) {
    return container.resolve("loadSchema").then((schema) => {
        container.provide("schema", schema);
    });
};
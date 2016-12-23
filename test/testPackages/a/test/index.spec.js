"use strict";
var assert = require("assert");
describe('Northbrook Mocha runs *.spec.js files', function () {
    this.timeout(10000);
    it('is true', function (done) {
        setTimeout(() => {
            assert.ok(true);
            done();
        }, 9000)
    });
});

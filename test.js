/*jshint asi:true*/
(function () {
'use strict';

var should = require('should')
var signature = require('./signature')


describe('Argument reader', function () {
    it('lists function argument names', function () {
        var with2args = function (a, b) {}
        var with3args = function (a, b, c) {}
        signature.read(with2args).should.eql(['a', 'b'])
        signature.read(with3args).should.eql(['a', 'b', 'c'])
    })
    // TODO it('detects "remainingArguments", "mappingOfArguments", and "arguments"', function () {})
    // TODO it('can be configured', function () {})
    // TODO it('ignores comments and whitespace in the function signature', function () {})
})

describe('signature modifier', function () {
    // TODO it('modifies signatures', function () {})
    // TODO it('can be called with configuration options', function () {})
    // TODO it('...which are respected by the argument reader', function () {})
})

describe('arguments object', function () {
    // TODO it('contains each the arguments by name', function () {})
})

}())

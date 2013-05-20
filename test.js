/*jshint asi:true*/
(function () {
'use strict';

var should = require('should')
var signature = require('./signature')

describe('Signature function', function () {
    it('Can take a function and return a proxy to that same function', function () {
        var func = function (v, a, l) {return v+a+l}
        var proxy = signature(func)
        proxy('h', 'i', '!').should.equal('hi!')
    })
    // TODO it('Can take a string argument and a function', function () {})
    // TODO it('passes "remainingArguments", "mappingOfArguments" and "arguments" as special arguments to the function which asks for them', function () {})
})

describe('Argument reader', function () {
    it('lists function argument names', function () {
        var with2args = function (a, b) {}
        var with3args = function (a, b, c) {}
        var sig2, sig3
        sig2 = [].slice.call(signature.read(with2args))
        sig2.should.eql(['a', 'b'])

        sig3 = [].slice.call(signature.read(with3args))
        sig3.should.eql(['a', 'b', 'c'])
    })

    it('detects "remainingArguments", "mappingOfArguments", and "argumentArray", which are treated specially', function () {
        var subject = function (remainingArguments, mappingOfArguments, argumentArray, c) {}
        var sig
        sig = signature.read(subject)
        sig.should.have.property('remainingArguments')
        sig.should.have.property('mappingOfArguments')
        sig.should.have.property('argumentArray')
        sig.should.include('c')
    })
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

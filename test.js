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
    it('passes "remainingArguments", "mappingOfArguments" and "arguments" as special arguments to the function which asks for them', function () {
        var func = function (a, b, c, arrayOfArguments, mappingOfArguments, remainingArguments) {
            return {
                a: a,
                b: b,
                c: c,
                arrayOfArguments: arrayOfArguments,
                mappingOfArguments: mappingOfArguments,
                remainingArguments: remainingArguments
            }
        }
        var proxy = signature(func)
        
        var justChecking = signature.read(func)
        justChecking.arrayOfArguments.should.equal(3)

        var result = proxy('a', 'b', 'c', 'd', 'e', 'f')

        result.a.should.equal('a')
        result.b.should.equal('b')
        result.c.should.equal('c')

        result.remainingArguments.join(', ').should.equal('d, e, f')

        result.arrayOfArguments.join(', ').should.equal('a, b, c, d, e, f')

        result.mappingOfArguments.a.should.equal('a')
        result.mappingOfArguments.b.should.equal('b')
        result.mappingOfArguments.c.should.equal('c')

        result.mappingOfArguments.should.not.have.property('d')
        result.mappingOfArguments.should.not.have.property('e')
        result.mappingOfArguments.should.not.have.property('f')
    })
})

describe('Argument reader', function () {
    it('lists function argument names', function () {
        var with2args = function (a, b) {}
        var with3args = function (a, b, c) {}
        var sig2, sig3
        sig2 = signature.read(with2args)
        sig2.basic.should.eql(['a', 'b'])

        sig3 = signature.read(with3args)
        sig3.basic.should.eql(['a', 'b', 'c'])
    })

    it('detects "remainingArguments", "mappingOfArguments", and "arrayOfArguments", which are treated specially', function () {
        var subject = function (remainingArguments, mappingOfArguments, arrayOfArguments, c) {}
        var sig
        sig = signature.read(subject)
        sig.should.have.property('remainingArguments', 0)
        sig.should.have.property('mappingOfArguments', 1)
        sig.should.have.property('arrayOfArguments', 2)

        // signature.basic and signature.all
        sig.basic.should.include('c')
        sig.all.should.include('c')

        sig.basic.should.not.include('remainingArguments')
        sig.all.should.include('remainingArguments')
        sig.basic.should.not.include('mappingOfArguments')
        sig.all.should.include('mappingOfArguments')
        sig.basic.should.not.include('arrayOfArguments')
        sig.all.should.include('arrayOfArguments')
    })
    // TODO it('can be configured', function () {})
    it('ignores comments and whitespace in the function signature', function () {
        function mess(    remainingArguments, 
                a/*arrayOfArguments*/,     c   
                // mappingOfArguments,   
                    /*,*/ /*F*/) {
        }
        var sig = signature.read(mess)
        sig.should.have.property('remainingArguments')
        sig.should.not.have.property('arrayOfArguments')
        sig.should.not.have.property('mappingOfArguments')
        sig.all.should.include('a')
        sig.all.should.not.include('F')
    })
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

(function () {
/*jshint asi:true*/
'use strict';

var rSignature = /^function\s*\((.*?)\)\s*{.*?}$/m,
    rComments = /\/\*(.*?)\*\//gm,
    rSingleLineComments = /\/\/.*$/gm,
    specialArguments = ['remainingArguments', 'mappingOfArguments', 'argumentArray'],
    arraySlice = Array.prototype.slice

function signature(sigString, func) {
    var parsed
    if (!func) {
        func = sigString
        parsed = readFunc(func)
    } else {
        throw new Error('Not implemented!')
    }
    var that = this
    return function () {
        return func.apply(that, arguments)
    }
}

function processSpecial(args) {
    var specialRemoved = arraySlice.call(args)
    specialArguments.forEach(function (specialArgName) {
        specialRemoved[specialArgName] = args[args.indexOf(specialArgName)]
    })
    return specialRemoved
}

function readSigString(s) {
    var tokens = s.split(/\s+/)
    tokens = tokens.filter(function (val) {return val !== ''})
}

function readFunc(f) {
    var signature = rSignature.exec(f.toString())[1]
    var arg,
        rSplit = /\b(\w+)\b/gim,
        positionalArgs = []
    arg = 1
    while (arg) {
        arg = rSplit.exec(signature)
        if (arg != null) {
            positionalArgs.push(arg[1])
        }
    }
    return processSpecial(arraySlice.call(positionalArgs))
}

module.exports = signature
signature.read = readFunc
signature.configuration = {}

}())

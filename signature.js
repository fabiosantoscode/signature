(function () {
'use strict';

var rSignature = /^function\s*\((.*?)\)\s*{}$/m,
    rArgSplit = /\b(\w+?)\b/gm,
    rComments = /\/\*(.*?)\*\//gm,
    rSingleLineComments = /\/\/.*$/gm,
    specialArguments = ['remainingArguments', 'mappingOfArguments', 'argumentArray'],
    arraySlice = Array.prototype.slice

function signature(sigString, func) {
    if (!func) {
        func = sigString
    }
    return function () {
        return func.apply(this, arguments)
    }
}

function processSpecial(args) {
    var specialRemoved = args.filter(function (val) {
            return specialArguments.indexOf(val) === -1
        })
    specialArguments.forEach(function (specialArgName) {
        specialRemoved[specialArgName] = args[args.indexOf(specialArgName)]
    })
    return specialRemoved
}

function readSigString(s) {
    var tokens = s.split(/\s+/)
    tokens = tokens.filter(function (val) {return val !== ''})
}

function read(f) {
    var signature = rSignature.exec(f.toString())[1]
    var arg,
        positionalArgs = []
    while (arg = rArgSplit.exec(signature)) {
        positionalArgs.push(arg[1])
    }
    return processSpecial(arraySlice.call(positionalArgs))
}

module.exports = signature
signature.read = read
signature.configuration = {}

}())

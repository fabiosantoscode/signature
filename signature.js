(function () {
/*jshint asi:true*/
'use strict';

var rSignature = /^\s*function.*?\((.*?)\).+/m,
    rMultiLineComments = /\/\*(.*?)\*\//gm,
    rSingleLineComments = /\/\/.*$/gm,
    specialArguments = ['remainingArguments', 'mappingOfArguments', 'arrayOfArguments'],
    arraySlice = Array.prototype.slice


function getApplyArgs(argumentObject, signature) {
    var cpy = arraySlice.call(signature.basic),
        argCpy = arraySlice.call(argumentObject, 0, signature.basic.length)
    if (signature.remainingArguments !== undefined) {
        argCpy[signature.remainingArguments] = arraySlice.call(argumentObject, signature.basic.length, undefined)
    }
    if (signature.mappingOfArguments !== undefined) {
        var map = argCpy[signature.mappingOfArguments] = {}
        for (var i = 0; i < signature.basic.length; i++) {
            map[signature.basic[i]] = argCpy[signature.all.indexOf(signature.basic[i])]
        }
    }
    if (signature.arrayOfArguments !== undefined) {
        argCpy[signature.arrayOfArguments] = arraySlice.call(argumentObject)
    }
    return argCpy
}

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
        return func.apply(that, getApplyArgs(arguments, parsed))
    }
}

function processSpecial(args) {
    var argObj = {}
    argObj.all = arraySlice.call(args)
    argObj.basic = argObj.all
        .filter(function (name) {
            return specialArguments.indexOf(name) === -1
        })
    specialArguments
        .forEach(function (name) {
            var ind = argObj.all.indexOf(name)
            argObj[name] = ind > -1 ? ind : undefined
        })
    return argObj
}

function readSigString(s) {
    var tokens = s.split(/\s+/)
    tokens = tokens.filter(function (val) {return val !== ''})
}

function readFunc(f) {
    var fStr = f.toString()
        .replace(rSingleLineComments, '')
        .replace(/\s/gm, '')
        .replace(rMultiLineComments, '')
    var signature = rSignature.exec(fStr)[1]
    var arg,
        rSplit = /\b(\w+)\b/gim,
        positionalArgs = []
    arg = 1
    while (arg) {
        arg = rSplit.exec(signature)
        if (arg !== null) {
            positionalArgs.push(arg[1])
        }
    }
    return processSpecial(arraySlice.call(positionalArgs))
}

module.exports = signature
signature.read = readFunc
signature.configuration = {}

}());

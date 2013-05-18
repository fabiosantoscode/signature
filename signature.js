(function () {
'use strict';

var rSignature = /^function\s*\((.*?)\)\s*{}$/m,
    rArgSplit = /\b(\w+?)\b/gm,
    rComments = /\/\*(.*?)\*\//gm,
    rSingleLineComments = /\/\/.*$/gm

function signature() {
    // TODO
}

function read(f) {
    var signature = rSignature.exec(f.toString())[1]
    var arg,
        positionalArgs = []
    while (arg = rArgSplit.exec(signature)) {
        positionalArgs.push(arg[1])
    }
    return [].slice.call(positionalArgs)
}

module.exports = signature
signature.read = read
signature.configuration = {}

}())


function isObject(obj) {
    return obj && obj.__proto__ && obj.__proto__.constructor;
}

function getClassName(obj) {
    return obj.__proto__.constructor.name;
}

function getFunctionName() {
    let line = new Error().stack.split('\n')[3];
    let name = new RegExp(/[^ ]+$/).exec( new RegExp(/^ *at [^ ]+/).exec( line )[0] )[0];
    return name;
}

export default class UndefinedError extends Error {
    constructor() {
        super( ( getFunctionName().indexOf('.') > 0 ? "Method" : "Function" ) + " '" + getFunctionName() + "' is not defined");
        this.name = "UndefinedError";
    }
}
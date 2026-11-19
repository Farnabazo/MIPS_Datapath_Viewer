const { Register } = require('./Register.js');

class Multiplexer {

    constructor(inputs) {
        this.inputs = inputs;
    }

    decide(signal) {
        let result = this.inputs[signal];

        //If result is a Register return the value only
        if(result instanceof Register) {
            return result.read();
        }
        return result;
    }

}

module.exports = {
    Multiplexer
}
const { INSTRUCTIONS } = require('./instructions.js');

class Memory {

    constructor() {
        this.instructions = {
            0: INSTRUCTIONS.ADDU
        }; 
        console.log('Memory initialized with instruction ' + this.instructions[0].name);
    }

    read(address) {
        return { 
            name: this.instructions[address].name,
            format: this.instructions[address].format,
            fields: this.instructions[address].fields,
        };
    }

}

module.exports = {
    Memory
};
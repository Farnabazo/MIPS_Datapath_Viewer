class instruction_register{

    constructor(instruction) {
        this.instruction = instruction;
    }

    read() {
        return this.instruction;
    }

    load(instruction) {
        this.instruction = instruction;
    }

}

module.exports = {
    instruction_register
};
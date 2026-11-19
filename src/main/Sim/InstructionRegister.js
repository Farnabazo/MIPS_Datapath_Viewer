class InstructionRegister{

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
    InstructionRegister
};
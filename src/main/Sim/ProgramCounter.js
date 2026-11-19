class ProgramCounter {

    constructor(address = 0) {
        this.address = address;
    }

    increment(value = 4) {
        this.address += value;
    }

    jump(address) {
        this.address = address;
    }

    read() {
        return this.address;
    }

}

module.exports = {
    ProgramCounter
};
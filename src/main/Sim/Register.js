class Register{

    constructor(value) {
        this.value = value;
    }

    read() {
        return this.value;
    }

    load(value) {
        this.value = value;
    }

}

module.exports = {
    Register
};
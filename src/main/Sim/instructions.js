const INSTRUCTIONS = {
    ADDU: {
        name: 'ADDU',
        format: 'type',
        fields: {
            opcode: '000000',
            rs: '00000',
            rt: '00000',
            rd: '00000',
            shamt: '00000',
            funct: '100001'
        }
    },
    SUBU: 'SUBU',
    ADD: 'ADD',
    ADDI: 'ADDI',
    SUB: 'SUB',
    LW: 'LW',
    SW: 'SW',
    BEQ: 'BEQ',
    JUMP: 'JUMP'
};

module.exports = {
    INSTRUCTIONS
};

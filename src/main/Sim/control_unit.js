const SELECTION_SIGNALS = {
    ALUSrcA: '0',
    ALUSrcB: '0',
    IorD: '0',
    PCSrc: '0',
    RegDst: '0',
    MemtoReg: '0'
};

const COMMAND_SIGNALS = {
    RegWrite: '0',
    MemRead: '0',
    MemWrite: '0',
    IRWrite: '0',
    PCWrite: '0',
    PCWriteCond: '0',
    ExtOp: '0',
    ALUOp: '0'
};

const STATES = {
    FETCH: 'FETCH',
    DECODE: 'DECODE',
    BRANCH_EXEC: 'BRANCH_EXEC',
    JUMP_EXEC: 'JUMP_EXEC',
    EXECUTE: 'EXECUTE',
    RF_WRITE: 'RF_WRITE',
    MEM_ADD_COMPUTATION: 'MEM_ADD_COMPUTE',
    MEM_ACCESS: 'MEM_ACCESS',
    WRITE_BACK: 'WRITE_BACK',
};

class control_unit {

    constructor(state = STATES.FETCH) {
        this.state = state;
    }

    read_signals() {
        return SELECTION_SIGNALS.IorD = 0;
    }

}

module.exports = {
    control_unit
};
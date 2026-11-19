const { INSTRUCTIONS } = require('./instructions.js');

const SELECTION_SIGNALS = {
    ALUSrcA: 0,
    ALUSrcB: 0,
    IorD: 0,
    PCSrc: 0,
    RegDst: 0,
    MemtoReg: 0
};

const COMMAND_SIGNALS = {
    RegWrite: 0,
    MemRead: 0,
    MemWrite: 0,
    IRWrite: 0,
    PCWrite: 0,
    PCWriteCond: 0,
    ExtOp: 0,
    ALUOp: 0
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

//Incomplete
const TRANS_MAP = {
    FETCH: {
        NEXT: 'DECODE'
    },
    DECODE: {
        BEQ: 'BRANCH_EXEC',
        JUMP: 'JUMP_EXEC',
        ADDU: 'EXECUTE'
    },
    EXECUTE: {
        NEXT: 'RF_WRITE'
    },
    RF_WRITE: {
        NEXT: 'FETCH'
    }
};

const SIGNALS_MAP = {
    FETCH: {
        MemRead: 1,
        ALUSrcA: 0,
        IorD: 0,
        IRWrite: 1,
        ALUSrcB: 1,
        ALUOp: 0,
        PCWrite: 1,
        PCSrc: 0
    }
};

class ControlUnit {

    constructor(state = STATES.FETCH) {
        this.state = state;
        this.signals = SIGNALS_MAP[state];
    }

    read_signals() {
        return this.signals;
    }

    transiction(input) {
        let current_state = this.state;
        next_state = TRANS_MAP[current_state][input];
        if(next_state) {
            this.state = next_state;
            this.signals = SIGNALS_MAP[next_state];
        }
        else {
            throw new error('Next state was not found!');
        }
    }

}

module.exports = {
    ControlUnit
};
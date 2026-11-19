const { ControlUnit } = require('./ControlUnit.js');
const { ALU } = require('./ALU.js');
const { Memory } = require('./Memory.js');
const { ProgramCounter } = require('./ProgramCounter.js');
const { InstructionRegister } = require('./InstructionRegister.js');
const { INSTRUCTIONS } = require('./instructions.js');

function start() {
    var cu = new ControlUnit();
    var pc = new ProgramCounter();
    var memory = new Memory();
    var IR = new InstructionRegister();

    try {

        console.log('Reading Control Unit signals...');
        //Fetch control unit commands
        var signals = cu.read_signals();

        console.log('Signals received: ' + JSON.stringify(signals, null, 4));

        //Fetch from memory
        if(signals[MemRead] == 1) {
            console.log('Reading from memory...');
            
            //Fetch from instructions section
            if(signals[IorD] == 0) {
                console.log('Fetching memory address...');

                //Read address from PC
                var starting_address = pc.read();

                console.log('Memory address: ' + starting_address + '.');

                //Fetch instruction
                var current_instruction = memory.read_instruction(starting_address);
                var fields = current_instruction.fields;

                console.log('Current instruction: ' + current_instruction + '.');

                //TODO: Normalize binary fetching
                var binary_instruction = fields.opcode + fields.rs + fields.rt + fields.rd + fields.shamt + fields.funct;
                console.log('Binary instruction: ' + binary_instruction + '.');

                //Write instruction into Instruction Register
                if(signals[IRWrite] == 1) {
                    console.log('Writing instruction into IR...');
                    IR.load(current_instruction);
                }
            }
            else if(signals[IorD] == 1) {
                //Add data fetch from memory management
            }
        }

        if(signals[PCWrite] == 1) {
            pc.increment();
        }
    } catch(error) {
        console.error('A fatal error occurred: ' + error + ' CPU execution halting...');
        return;
    }
}

module.exports = {
    start
};

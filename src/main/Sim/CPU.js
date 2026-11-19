const { ControlUnit } = require('./ControlUnit.js');
const { execute_op } = require('./ALU.js');
const { Memory } = require('./Memory.js');
const { ProgramCounter } = require('./ProgramCounter.js');
const { Register } = require('./Register.js');
const { Multiplexer } = require('./Multiplexer.js');
const { INSTRUCTIONS } = require('./instructions.js');

function start() {
    var cu = new ControlUnit();
    var pc = new ProgramCounter();
    var memory = new Memory();
    var IR = new Register();
    var a = new Register();
    var b = new Register();
    var ALUOut = new Register();
    var ALUSrcAMult = new Multiplexer([pc, a]);
    var ALUSrcBMult = new Multiplexer([4, b, null, null]);
    var PCSrcMult = new Multiplexer(null, ALUOut.read(), null);
    var ALUMultiplexer = new Multiplexer(INSTRUCTIONS);

    var ALUSrcA;
    var ALUSrcB;
    var PCSrc;
    var ALUOp;

    while(true) {
        try {
            console.log('Reading Control Unit signals...');
            //Fetch control unit commands
            var signals = cu.read_signals();

            console.log('Signals received: ' + JSON.stringify(signals, null, 4));

            //Fetch from memory
            if(signals['MemRead'] == 1) {
                console.log('Reading from memory...');
                
                //Fetch from instructions section
                if(signals['IorD'] == 0) {
                    console.log('Fetching memory address...');

                    //Read address from PC
                    var starting_address = pc.read();

                    console.log('Memory address: ' + starting_address + '.');

                    //Fetch instruction
                    var current_instruction = memory.read_instruction(starting_address);
                    var fields = current_instruction.fields;

                    console.log('Current instruction: ' + JSON.stringify(current_instruction, null, 4) + '.');

                    //TODO: Normalize binary fetching
                    var binary_instruction = fields.opcode + fields.rs + fields.rt + fields.rd + fields.shamt + fields.funct;
                    console.log('Binary instruction: ' + binary_instruction + '.');

                    //Write instruction into Instruction Register
                    if(signals['IRWrite'] == 1) {
                        console.log('Writing instruction into IR...');
                        IR.load(current_instruction);
                    }
                }
                else if(signals['IorD'] == 1) {
                    //Add data fetch from memory management
                }
            }

            //Define ALU first operand
            if(signals['ALUSrcA'] != undefined) {
                ALUSrcA = ALUSrcAMult.decide(signals['ALUSrcA']);
                console.log('Value of first operand: ' + JSON.stringify(ALUSrcA, null, 4));
            }

            //Define ALU second operand
            if(signals['ALUSrcB'] != undefined) {
                ALUSrcB = ALUSrcBMult.decide(signals['ALUSrcB']);
                console.log('Value of second operand: ' + ALUSrcB);
            }

            //Define ALU operation
            if(signals['ALUOp'] != undefined) {
                ALUOp = ALUMultiplexer.decide(signals['ALUOp']);

                console.log('Operation to execute: ' + ALUOp.name);
                execute_op(ALUOp.name, ALUSrcA, ALUSrcB);
            }

            if(signals['PCWrite'] == 1) {
                PCSrc = PCSrcMult.decide(signals['PCSrc']);
                pc.increment(PCSrc);
                
            }

            //Start new cycle
            cu.transition();
        } catch(error) {
            console.error('A fatal error occurred: ' + error + '.\nCPU execution halting...');
            return;
        }
    }
}

function to_uns_decimal(value) {
    let result = 0;
    for(let i = value.length - 1; i >= 0; i--) {
        if(value[i] === '1') {
            result += 2^(value.length - (i + 1));
        }
    }
    return result;
}

module.exports = {
    start
};

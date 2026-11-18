const { control_unit } = require('./control_unit.js');
const { ALU } = require('./ALU.js');
const { Memory } = require('./memory.js');
const { program_counter } = require('./program_counter.js');
const { instruction_register } = require('./instruction_register.js');
const { INSTRUCTIONS } = require('./instructions.js');

function start() {
    var cu = new control_unit();
    var pc = new program_counter();
    var memory = new Memory();
    var IR = new instruction_register();

    var starting_address = pc.read();
    console.log('PC starts at address ' + starting_address + '.');
    console.log('Reading memory at address ' + starting_address + '...');

    console.log('Reading control unit signals...');
    var IorD = cu.read_signals();
    if(IorD == 0) {
        console.log('Control unit signals reading instruction memory');
        current_instruction = memory.read_instruction(starting_address);
    }
    console.log('Memory starts with instruction ' + current_instruction.name + ', format: ' + current_instruction.format + '.');
    console.log('Instruction contains: ');
    var fields = current_instruction.fields;
    console.log('- opcode: ' + fields.opcode + '.');
    console.log('- rs: ' + fields.rs + '.');
    console.log('- rt: ' + fields.rt + '.');
    console.log('- rd: ' + fields.rd + '.');
    console.log('- shift-amount: ' + fields.shamt + '.');
    console.log('- funct: ' + fields.funct + '.');
    binary_instruction = fields.opcode + fields.rs + fields.rt + fields.rd + fields.shamt + fields.funct;
    console.log('Whole binary instruction: ' + binary_instruction + '.');
    console.log('Saving instruction into IR...');
    IR.load(current_instruction.name);
    console.log('Instruction ' + IR.read() + ' correctly saved in IR');
}

module.exports = {
    start
};

var result;
var zero_bit;
var overflow_bit;

const BITS = 32;
const MIN_SVALUE = -2147483648;
const MAX_SVALUE = 2147483647;
const MAX_UNSVALUE = 4294967295;

function execute_op(instr, op1, op2) {
    zero_bit = 0;
    overflow_bit = 0;
    switch(instr) {
        case instr.ADDU: 
            result = op1 + op2;
            if(result > MAX_UNSVALUE) {
                result %= MAX_UNSVALUE + 1;
                overflow_bit = 1;
                if(result == 0) {
                    zero_bit = 1;
                }
                break;
            }
            break;
        case instr.SUBU:
            result = op1 - op2;
            if(result < 0) {
                result = (MAX_UNSVALUE + 1) + result;
                overflow_bit = 1;
                if(result == 0) {
                    zero_bit = 1;
                }
                break;
            }   
            break;
        case instr.ADD: 
        case instr.ADDI:
        case instr.LW:
        case instr.SW:
            result = op1 + op2;
            if(result > MAX_SVALUE) {
                result = MIN_SVALUE + (result - MAX_SVALUE - 1);
                overflow_bit = 1;
                if(result == 0) {
                    zero_bit = 1;
                }
                break;
            }
            if(result < MIN_SVALUE) {
                result = MAX_SVALUE + (result + MAX_SVALUE + 1);
                overflow_bit = 1;
                if(result == 0) {
                    zero_bit = 1;
                }
                break;
            }
            break;
        case instr.SUB:
            result = op1 - op2;
            if(result > MAX_SVALUE) {
                result = MIN_SVALUE + (result - MAX_SVALUE - 1);
                overflow_bit = 1;
                if(result == 0) {
                    zero_bit = 1;
                }
                break;
            }
            if(result < MIN_SVALUE) {
                result = MAX_SVALUE + (result + MAX_SVALUE + 1);
                overflow_bit = 1;
                if(result == 0) {
                    zero_bit = 1;
                }
                break;
            }
            break;
    }
    return {result, zero_bit, overflow_bit};
}

module.exports = {
    execute_op
};
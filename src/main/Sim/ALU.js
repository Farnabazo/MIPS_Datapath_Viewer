var result;
var zero_bit;
var overflow_bit;

const BITS = 32;
const MIN_SVALUE = -2147483648;
const MAX_SVALUE = 2147483647;
const MAX_UNSVALUE = 4294967295;


//Le istruzioni UNSIGNED non segnalano overflow;
//Di fatto, sono considerate operazioni di aritmetica modulare
//e l'"overflow" è un comportamento previsto secondo il manuale
//di MIPS Technologies per l'instruction set del MIPS32(R);

function execute_op(instr, op1, op2) {
    zero_bit = 0;
    overflow_bit = 0;
    switch(instr) {
        case 'ADDU':
            result = op1 + op2;
            if(result > MAX_UNSVALUE) {
                result %= MAX_UNSVALUE + 1;
                if(result == 0) {
                    zero_bit = 1;
                }
                break;
            }
            if(result == 0) {
                zero_bit = 1;
            }
            break;
        case 'SUBU':
        case 'BEQ':
            result = op1 - op2;
            if(result < 0) {
                result = (MAX_UNSVALUE + 1) + result;
                break;
            }
            if(result == 0) {
                zero_bit = 1;
            }
            break;
        case 'ADD':
        case 'ADDI':
        case 'LW':
        case 'SW':
            result = op1 + op2;
            if(result > MAX_SVALUE) {
                result = MIN_SVALUE + (result - MAX_SVALUE - 1);
                overflow_bit = 1;
                break;
            }
            if(result < MIN_SVALUE) {
                result = MAX_SVALUE + (result + MAX_SVALUE + 2);
                overflow_bit = 1;
                break;
            }
            if(result == 0) {
                zero_bit = 1;
            }
            break;
        case 'SUB':
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
                result = MAX_SVALUE + (result + MAX_SVALUE + 2);
                overflow_bit = 1;
                break;
            }
            if(result == 0) {
                zero_bit = 1;
            }
            break;
    }
    return { result, zero_bit, overflow_bit };
}

module.exports = {
    execute_op
};

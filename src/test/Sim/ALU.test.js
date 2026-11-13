const assert = require('assert');
const { execute_op } = require('../../../src/main/Sim/ALU.js');
const { INSTRUCTIONS } = require('../../../src/main/Sim/instructions.js');

//Un solo test per ogni istruzione solo per verificare che lo switch ci entri correttamente


//ADD, ADDI, LW e SW

assert.deepStrictEqual(execute_op(INSTRUCTIONS.ADD, 1, 2), {result: 3, zero_bit: 0, overflow_bit: 0}, 'La ALU non sta ritornando i valori giusti per ADD!');
assert.deepStrictEqual(execute_op(INSTRUCTIONS.ADDI, 1, 2), {result: 3, zero_bit: 0, overflow_bit: 0}, 'La ALU non sta ritornando i valori giusti per ADDI!');
assert.deepStrictEqual(execute_op(INSTRUCTIONS.LW, 1, 2), {result: 3, zero_bit: 0, overflow_bit: 0}, 'La ALU non sta ritornando i valori giusti per LW!');
assert.deepStrictEqual(execute_op(INSTRUCTIONS.SW, 1, 2), {result: 3, zero_bit: 0, overflow_bit: 0}, 'La ALU non sta ritornando i valori giusti per SW!');
assert.deepStrictEqual(execute_op(INSTRUCTIONS.ADD, 3, -2), {result: 1, zero_bit: 0, overflow_bit: 0}, 'La ALU non sta ritornando i valori giusti per ADD!');
assert.deepStrictEqual(execute_op(INSTRUCTIONS.ADD, 2147483647, 5), {result: -2147483644, zero_bit: 0, overflow_bit: 1}, 'La ALU non sta gestendo bene l\'overflow per ADD');
assert.deepStrictEqual(execute_op(INSTRUCTIONS.ADD, -2147483648, -5), {result: 2147483643, zero_bit: 0, overflow_bit: 1}, 'La ALU non sta gestendo bene l\'underflow per ADD');
assert.deepStrictEqual(execute_op(INSTRUCTIONS.ADD, -3, 3), {result: 0, zero_bit: 1, overflow_bit: 0}, 'La ALU non sta segnalando il risultato uguale a 0 in ADD');


//SUB

assert.deepStrictEqual(execute_op(INSTRUCTIONS.SUB, 6, 3), {result: 3, zero_bit: 0, overflow_bit: 0}, 'La ALU non sta ritornando i valori giusti per SUB');
assert.deepStrictEqual(execute_op(INSTRUCTIONS.SUB, 6, -3), {result: 9, zero_bit: 0, overflow_bit: 0}, 'La ALU non sta ritornando i valori giusti per SUB');
assert.deepStrictEqual(execute_op(INSTRUCTIONS.SUB, -2147483648, 5), {result: 2147483643, zero_bit: 0, overflow_bit: 1}, 'La ALU non sta gestendo bene l\'underflow per SUB');
assert.deepStrictEqual(execute_op(INSTRUCTIONS.SUB, 2147483647, -5), {result: -2147483644, zero_bit: 0, overflow_bit: 1}, 'La ALU non sta gestendo bene l\'overflow per SUB');
assert.deepStrictEqual(execute_op(INSTRUCTIONS.SUB, 3, 3), {result: 0, zero_bit: 1, overflow_bit: 0}, 'La ALU non sta segnalando il risultato uguale a 0 in SUB');


//ADDU

assert.deepStrictEqual(execute_op(INSTRUCTIONS.ADDU, 1, 2), {result: 3, zero_bit: 0, overflow_bit: 0}, 'La ALU non sta ritornando i valori giusti per ADDU!');
assert.deepStrictEqual(execute_op(INSTRUCTIONS.ADDU, 4294967295, 5), {result: 4, zero_bit: 0, overflow_bit: 0}, 'La ALU non sta gestendo bene l\'overflow per ADDU');
assert.deepStrictEqual(execute_op(INSTRUCTIONS.ADDU, 4294967298, 5), {result: 7, zero_bit: 0, overflow_bit: 0}, 'La ALU non sta gestendo bene l\'overflow per ADDU');
assert.deepStrictEqual(execute_op(INSTRUCTIONS.ADDU, 4294967295, 1), {result: 0, zero_bit: 1, overflow_bit: 0}, 'La ALU non sta segnalando il risultato uguale a 0 in ADDU!');


//SUBU e BEQ

assert.deepStrictEqual(execute_op(INSTRUCTIONS.SUBU, 3, 2), {result: 1, zero_bit: 0, overflow_bit: 0}, 'La ALU non sta ritornando i valori giusti per SUBU!');
assert.deepStrictEqual(execute_op(INSTRUCTIONS.BEQ, 3, 2), {result: 1, zero_bit: 0, overflow_bit: 0}, 'La ALU non sta ritornando i valori giusti per BEQ!');
assert.deepStrictEqual(execute_op(INSTRUCTIONS.SUBU, 1, 5), {result: 4294967292, zero_bit: 0, overflow_bit: 0}, 'La ALU non sta gestendo bene l\'overflow per SUBU!');
assert.deepStrictEqual(execute_op(INSTRUCTIONS.SUBU, 0, 0), {result: 0, zero_bit: 1, overflow_bit: 0}, 'La ALU non sta segnalando il risultato uguale a 0 in SUBU!');
assert.deepStrictEqual(execute_op(INSTRUCTIONS.SUBU, 74, 74), {result: 0, zero_bit: 1, overflow_bit: 0}, 'La ALU non sta segnalando il risultato uguale a 0 in BEQ!');

console.log('Test ALU passati!');

function Addition(value1, value2){
    return value1 + value2;
}
console.log(`Addition ${Addition(10,5)}`);


function Subtraction(value1,value2){
return value1 - value2;
}
console.log(`Subtraction ${Subtraction(10,5)}`);


function Multiplication(value1,value2){
    return value1 * value2;
}
console.log(`Multiplication ${Multiplication(10,5)}`);


function Division(value1, value2){
    return value1 / value2;
}
console.log(`Division ${Division(10,5)}`);


function Modulus(value1,value2){
    return value1 % value2;
}
console.log(`Modulus ${Modulus(12,5)}`);


function Increment(value1){
    return ++value1;
}
console.log(`Increment ${Increment(12)}`);


function Decrement(value1){
    return --value1;
}
console.log(`Decrement ${Decrement(12)}`);


function Comparison(value1,value2){
    return value1 == value2;
}
console.log(`Comparison ${Comparison(10,10)}`);


function Logical(value1){
    return value1 > 5 && value1 < 15;
}
console.log(`Logical ${Logical(10)}`);


function Ternary(value1,value2){
    return value1 == value2 ? `wow true`: `wow false`;
}
console.log(`Ternary ${Ternary(10,10)}`);
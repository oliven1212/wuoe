for(let i = 1; i <= 5; i++){
    console.log(`i is ${i}`);
}
console.log(`-----------------------------------------`);

for(let i = 1; i <= 10; i++){
    if(!Boolean(i%2)){
        console.log(`i is ${i}`);
    }
}
console.log(`-----------------------------------------`);


let alphabet = [`a`,`b`,`c`,`d`,`e`,`f`,`g`];
for(let i = 0; i <= 5-1; i++){
    console.log(`alphabet letter at ${i+1} is ${alphabet[i]}`);
}
console.log(`-----------------------------------------`);


for(let i = 10; i >= 1; i--){
    console.log(`reverse number loop ${i}`);
}
console.log(`-----------------------------------------`);


let i = 1;
while(i <= 5){
    console.log(`While loop 1-5 ${i}`);
    i++;
}
console.log(`-----------------------------------------`);


i = 2;
while(i <= 10){
    if(!Boolean(i%2)){
        console.log(`i is ${i}`);
    }
    i++;
}
console.log(`-----------------------------------------`);


i = 0;
while(i < 5){
    console.log(`alphabet letter at ${i+1} is ${alphabet[i]}`);
    i++;
}
console.log(`-----------------------------------------`);


i = 10;
while(i > 0){
    console.log(`10 to 1 ${i}`);
    i--;
}
console.log(`-----------------------------------------`);


for(let value in alphabet){
    console.log(`${alphabet[value]}`);
}
console.log(`-----------------------------------------`);


const string = `hello there im a string`;
for(let value in string){
    console.log(string[value]);
}
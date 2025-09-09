let fruits = [`Banana`,`Strawberry`,`Carrot`];
console.log(fruits);


console.log(fruits[1]);


fruits[2] = `Cucumber`;
console.log(fruits);


fruits.push(`Mango`);
console.log(fruits);


fruits.splice(0,1);
console.log(fruits);


console.log(`The index of ${fruits[fruits.indexOf(`Cucumber`)]} is ${fruits.indexOf(`Cucumber`)}`);


let meats = [`Steak`,`Cutlets`];
let fruityMeat = fruits.concat(meats);
console.log(fruityMeat);


let numbers = [1,3,0,2,9,4,0];
numbers.sort((a,b) => a-b)
console.log(numbers);


let stolenNumbers = numbers;
console.log(stolenNumbers);
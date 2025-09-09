let x = 11;
if(x > 10){
    console.log("x is greater than 10.");
}


let number = 0;
if(number > 0){
    console.log(`The number is positive`);
}else if(number < 0){
    console.log(`The number is negative`);
}else if(number == 0){
        console.log(`The number is zero`);
}


let person = {age:19};
if(person.age > 18){
    console.log(`You can vote.`);
}


let givenString = `Javascript elective`;
if(givenString == `Javascript elective`){
    console.log(`Welcome to Javascript elective.`);   
}

let number2 = 3;
if(!number2%2){
console.log(`The number is even`);
}else if(number2%2){
    console.log(`The number is odd`);
}


switch(`1`){
    case x:

    break;

    default:

}

let weekDay = 3;
switch(weekDay){
    case 1:
        console.log(`Monday`);
    break;
    case 2:
        console.log(`Tuesday`);
    break;    
    case 3:
        console.log(`Wednesday`);
    break;    
    case 4:
        console.log(`Thursday`);
    break;    
    case 5:
        console.log(`Friday`);
    break;    
    case 6:
        console.log(`Saturday`);
    break;    
    case 7:
        console.log(`Sunday`);
    break;
    default:
        console.log(`No date found for that value`)
}

let fruit = `Carrot`;
switch (fruit.toLowerCase()){
    case `strawberry`:
        console.log(`Is that a fruit?`);
    break;
    case `carrot`:
        console.log(`Thats a interesting "fruit"`);
    break;
    default:
        console.log(`Fruit not registered in system`);
}


let month = `december`;
switch (month.toLocaleLowerCase()){
    case `juli`:
        console.log(`Theres 31 days in Juli`);
    break;
    case `december`:
        console.log(`Theres 31 days in December`);
    break;
    case `october`:
        console.log(`Theres 31 days in October`);
    break;
    default:
        console.log(`Our budget dosent have that month`);
}

let vehicle = `scooter`;
switch(vehicle.toLowerCase()){
    case `scooter`:
        console.log(`Vroom vroom`);
    break;
    case `car`:
        console.log(`Good luck finding a parking spot`);
    break;
    default:
        console.log(`Thats a unique vehicle`);
}

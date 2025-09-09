if(true && true){
    console.log(`Wow true AND true is true`);
}


if(true || false){
    console.log(`Wow true or false is true`);
}


if(!false){
    console.log(`Wow !false = true`);
}


if(!false){
    console.log(`Wow !false = true`);
}

if(3 > 0 || 3 < 0 || 3 == 0){
    console.log(`The number is positive, negative or zero`);
}


let number = 0;
if(number > 0){
    console.log(`The number is positive`);
}else if(number < 0){
    console.log(`The number is negative`);
}else if(number == 0){
        console.log(`The number is zero`);
}


let number2 = 12;
if(number2 > 10 && !Boolean(number2%2)){
    console.log(`${number2} Is greater than 10 and even`);
}


let number3 = 7;
if(number3 > 0){
    if(!Boolean(number3%2)){
        console.log(`The number is positive and even`);
    }else if(Boolean(number3%2)){
            console.log(`The number is positive and uneven`);
    }
}else if(number3 < 0){
        if(!Boolean(number3%2)){
        console.log(`The number is negative and even`);
    }else if(Boolean(number3%2)){
        console.log(`The number is negative and uneven`);
    }
}else if(number3 == 0){
        console.log(`The number is zero`);
}

let x = 15
if (x > 10 && x < 20){
    console.log(`wooow x is bigger than 10 and smaller than 20`);
}


if(`5` == 5){
    console.log(`'5' counts as 5 with ==`);
}


let array = [2,3,5,93];
if(array.includes(93)){
    console.log(`wow theres a 93 in the array`);
}
const numberArray = [1,2,3,5,10,0,2];
const sentence = 'Åge bøjede syv fine rør ud.';
const arrayArray = [[1, 2], [3, 4], [5]];
function sum (values){
    let total = 0;
    for (let value in values){
        total += parseFloat(values[value]);
    }

    return total;
}

console.log(`Sum number: ${sum(numberArray)}`);


function max(values){
    let max = parseFloat(values[0]);

    for(let value in values){
        value = parseFloat(value);
        max = values[value] > max ? values[value] : max;
    }

    return(max);
}

console.log(`Max number: ${max(numberArray)}`);

function countVowels(text){
    const vowels = ['a','e','i','y','o','u','æ','ø','å'];
    let totalVowels = 0;
    for (let i = 0; i < text.length; i++){
        for(let vowel in vowels){
            totalVowels = text[i].toLowerCase() == vowels[vowel] ? totalVowels+1 : totalVowels;
        }
    }
    return totalVowels;
}
console.log(`VowelCount: ${countVowels(sentence)}`);

function filterOdd(values){
    return values.filter((value)=>{return value % 2;});
}
console.log(`Odd numbers: ${filterOdd(numberArray)}`);

function reverseString (text){
    let newText = ``;
    for (let i = text.length-1; 0 <= i; i--){
        newText += text[i];
    }
    return newText; 
}
console.log(`Original string ${sentence}`);
console.log(`Reverse string ${reverseString(sentence)}`);

function flatten (arrayStack){
    return arrayStack.flat();
}
console.log(flatten(arrayArray));

function changeTextButton(){
    document.getElementById(`text`).innerHTML = `Den bedste side er <a href="https://deeppink.ninja">deeppink.ninja</a>`;
}

function incrementClickCount(){
    document.getElementById(`clickCount`).innerText = parseFloat(document.getElementById(`clickCount`).innerText) + 1;
}

function addItemListElement(){
    //document.getElementById(`itemInput`).value;
    const element = document.createElement(`li`);
    element.innerHTML = document.getElementById(`itemInput`).value;
    document.getElementById(`itemList`).appendChild(element);
}

function changeBackgroundColor(){
    document.body.style.backgroundColor = `rgb(${Math.random(0,1)*255}, ${Math.random(0,1)*255}, ${Math.random(0,1)*255})`;
}
let In = [3,3,5];
let Out = [];
let table = {1:'',2:''}
let hand;

Inbox();
Outbox();
Inbox();
Outbox();
Inbox();
Outbox();

console.log(`Task 1 In results ${In}`);
console.log(`Task 1 Out results ${Out}`);

In = [3,3,4,5,5];
Out = [];

while(In.length > 1){
    Inbox();
    Outbox();
}


console.log(`Task 2 In results ${In}`);
console.log(`Task 2 Out results ${Out}`);

table = {1:'A',2:'D',3:'G',4:'B',5:'C',6:'U'}
Out = [];



CopyFrom(4);
Outbox();
CopyFrom(6);
Outbox();
CopyFrom(3);
Outbox();
console.log(`Task 3 In results ${In}`);
console.log(`Task 3 Out results ${Out}`);

In = [1,2,'a','b',3,4];
InLength = In.length;
Out = [];


while(In.length > 1){
Inbox();
CopyTo(1)
Inbox();
Outbox();
CopyFrom(1);
Outbox();
}

console.log(`Task 4 In results ${In}`);
console.log(`Task 4 Out results ${Out}`);


In = [6,1,5,2,3,4];
Out = [];

while(In.length > 1){
Inbox();
CopyTo(1);
Inbox();
Add(1);
Outbox();
}

console.log(`Task 5 In results ${In}`);
console.log(`Task 5 Out results ${Out}`);


function Inbox (){
    hand = In.splice(0,1);
}

function Outbox (){
    Out.push(hand);
}
function CopyFrom (position){
    hand = table[position];
}
function CopyTo (position){
    table[position] = hand;
}
function Add (position){
    hand = Number(hand) + Number(table[position]);
}

function Sub (position){
    hand = Number(hand) - Number(table[position]);
}
//JumpJumpifzero
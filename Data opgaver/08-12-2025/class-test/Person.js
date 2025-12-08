class Person {
    name;

    constructor(name){
        console.log('Person created');
        this.name = name;
        console.log(this);
    }

    sayHello(){
        console.log(`Hello ${this.name}`);
    }

    static createUser(){
        console.log('User created');
    }

    static acceptedColorOptions(){
        //fake databse
        const colors = ['Red','Purple','Blue','Green'];

        console.log('Accepted color options:', colors);
    }
}
module.exports = Person;
function calc(x, y, t, d) {
    var result = 0;
    var temp = 0;
    if (t == 1) {
        temp = x * y;
        if (d == true) {
            if (temp > 100) {
                result = temp - (temp * 0.1);
            } else {
                result = temp - (temp * 0.05);
            }
        } else {
            result = temp;
        }
    } else if (t == 2) {
        temp = x + y;
        if (d == true) {
            if (temp > 100) {
                result = temp - (temp * 0.1);
            } else {
                result = temp - (temp * 0.05);
            }
        } else {
            result = temp;
        }
    }
    return result;
}
// Usage examples
console.log(calc(10, 20, 1, true)); // Multiplication with discount
console.log(calc(50, 50, 2, true)); // Addition with discount
console.log(calc(30, 40, 1, false)); // Multiplication without discount

//Priority 1
//Multiple functions in one: multiply, add and discount functionality
    //calling the function gets quite long with values that does not matter for the usecase,
    //and its not clear how you use it without explanation from external sources

//Priority 2
//Fix variable names x,y, prob to value1 and value2 or something else that says its a numbers
    //variable name does not explain what it is so if another person reads the code they wont 
    //get what it means without reading the whole code

//Priority 3
//Comments missing for explaining what things are
    
//Priority 4
//Discount rates are not clear thats what they are and their condition

//Priority 5
//Duplicated code

//Priority 6
//Just return result instead of setting it

//Priority 7
//d,t,temp dissapears when functions are separated
    //The problem with them is that their names does not explain what it is
// https://padlet.com/jvje0079/opgave-1-30xmrmqiv0fsfput

// ------------------------------------------------
// Function 1 — Full name
// Combines first name and last name into one string
// ------------------------------------------------
export function fullName(firstName, lastName) {
    return firstName + ' ' + lastName
}


// ------------------------------------------------
// Function 2 — Is adult?
// Returns true if age is 18 or above
// ------------------------------------------------
export function isAdult(age) {
    return age >= 18
}


// ------------------------------------------------
// Function 3 — Square
// Multiplies a number by itself
// ------------------------------------------------
export function square(number) {
    return number * number
}


// ------------------------------------------------
// Function 4 — Format price
// Returns a price as a string with kr. appended
// Example: 100 → "100 kr."
// ------------------------------------------------
export function formatPrice(price) {
    return price + ' kr.'
}


// ------------------------------------------------
// Function 5 — Find the largest number
// Returns the largest of two numbers
// ------------------------------------------------
export function largest(a, b) {
    if (a > b) return a
    return b
}
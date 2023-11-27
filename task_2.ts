
let add =(number1:number,number2:number)=>number1+number2;

let checkEvenOrOdd=(numberForCheck:number)=>numberForCheck%2===0?'even':'odd';

let calculateArea=(length:number,breadth:number)=>length*breadth;

let reverseString=(stringToReverse:string)=>stringToReverse.split('').reverse().join('');

let convertCelsiusToFahrenheit=(celsius:number)=>(celsius*9/5)+32;

console.log("Add function");
console.log(add(5,6));
console.log('----------------------------');
console.log("Check Even Or Odd function");
console.log(checkEvenOrOdd(5));
console.log('----------------------------');
console.log("Calculate Area function");
console.log(calculateArea(5,6));
console.log('----------------------------');
console.log("Reverse String function");
console.log(reverseString('hello'));
console.log('----------------------------');
console.log("Convert Celsius To Fahrenheit function");
console.log(convertCelsiusToFahrenheit(5));
console.log('----------------------------');


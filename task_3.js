let languages = ['C', 'C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 'Dart'];
// - **`push`**: Add new elements to the end of the array.
// - **`pop`**: Remove the last element from the array.
// - **`shift`**: Remove the first element from the array.
// - **`unshift`**:
console.log('----------------------------');
console.log('Original Array');
console.log(languages);
console.log('----------------------------');
console.log('Push function');
languages.push('Ruby');
console.log('After push');
console.log(languages);
console.log('----------------------------');
console.log('Pop function');
languages.pop();
console.log('After pop');
console.log(languages);
console.log('----------------------------');
console.log('Shift function');
languages.shift();
console.log('After shift');
console.log(languages);
console.log('----------------------------');
console.log('Unshift function');
languages.unshift('C#');
console.log('After unshift');
console.log(languages);
console.log('----------------------------');
// - **`splice`**: Create a subarray by removing elements from the original array.
// - **`slice`**:
console.log('----------------------------');
console.log('Original Array');
console.log(languages);
console.log('----------------------------');
console.log('Splice & slice function');
let secondArray = languages.splice(2, 1);
let thirdArray = languages.slice(2, 4);
console.log('After splice subarray');
console.log(secondArray);
console.log('After slice subarray');
console.log(thirdArray);
export {};

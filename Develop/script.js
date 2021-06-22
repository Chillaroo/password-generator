// Assignment Code
var generateBtn = document.querySelector("#generate");
var specialCharacters = [" ","!","\"","#","$","%","&","'","(",")","*","+",",","-",".","/",":",";","<","=",">","?","@","[","\\","]","^","_","`","{","|","}","~"];
var digits = [0,1,2,3,4,5,6,7,8,9];
var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var uppercaseLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var length = 0;
var lowerCase = false;
var special = false;
var upperCase = false;
var numbers = false;
var characterTypes = [];
var passwordArray = [];



function prompts() {

  length = prompt("How many characters do you want in your password? \nInput an integer between 8 and 128.");
  if(!length){
    return;
  }
  length = parseFloat(length);
  while((Number.isInteger(length)===false)||(length<4)||(length>128)){
    length = prompt("ERROR: that was either not an integer or out of range. Please input an integer between 8 and 128.");
    if(!length){
      break;
    }
    else{
      length = parseFloat(length);
    }
  }
  special =  confirm("Do you want any special characters? Press 'OK' for yes 'Cancel' for No.");
  upperCase = confirm("Do you want any upper case letters? Press 'OK' for yes 'Cancel' for No.");
  lowerCase = confirm("Do you want any lower case letters? Press 'OK' for yes 'Cancel' for No.");
  numbers = confirm("Do you want any numbers? Press 'OK' for yes 'Cancel' for No.");

  return {
    length: length,
    special: special,
    upperCase: upperCase,
    lowerCase: lowerCase,
    numbers: numbers,
  }

}

function generateCharacterSets (constraints) {

  if (constraints.special === true) {
    characterTypes.push(specialCharacters);
  }
  if (constraints.upperCase === true) {
    characterTypes.push(uppercaseLetters);
  }
  if (constraints.lowerCase === true) {
    characterTypes.push(letters);
  }
  if (constraints.numbers === true) {
    characterTypes.push(digits);
  }

  if (characterTypes.length === 0){
    alert("You need to select at least one character type to generate a password. Please press OK to try again.");
    prompts();
  }

  console.log(characterTypes);
  return characterTypes;
}

function generatePassword(characterTypes){
  //Picks random elements from an array of arrays and adds them to passwordArray
  for(var i=0; i<length; i++){
    let outerIndex = Math.floor(Math.random()*characterTypes.length);
    let innerIndex = Math.floor(Math.random()*characterTypes[outerIndex].length);
    passwordArray.push(characterTypes[outerIndex][innerIndex]);
  }

  //Calculatres the intersection of two arrays
  function getArraysIntersection(a1,a2){
    return  a1.filter(function(n) { return a2.indexOf(n) !== -1;});
  }

  //Checks if user specifications have been met and runs the function again if they have not been met
  if((special===true) && (getArraysIntersection(passwordArray,specialCharacters)===[])){
    console.log(passwordArray);
    generatePassword();
  }
  else if((lowerCase===true) && (getArraysIntersection(passwordArray,letters)===[])){
    console.log(passwordArray);
    generatePassword();
  }
  else if((upperCase===true) && (getArraysIntersection(passwordArray, uppercaseLetters)===[])){
    console.log(passwordArray);
    generatePassword();
  }
  else if((numbers===true) && (getArraysIntersection(passwordArray,digits)===[])){
    console.log(passwordArray);
    generatePassword();
  }
  else{
    console.log("special: " + special + "\n numbers: " + numbers + "\n uppercase: " + upperCase + "\n lowercase: " + lowerCase);
    console.log("Intersection with special: " + getArraysIntersection(passwordArray,specialCharacters));
    console.log("Intersection with numbers: " + getArraysIntersection(passwordArray,letters));
    console.log("Intersection with upper: " + getArraysIntersection(passwordArray, uppercaseLetters));
    console.log("Intersection with lower: " + getArraysIntersection(passwordArray,digits));
  }

  //Converts password to a string
  password = passwordArray.join('');
  console.log(password);
  return password;  
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

//Write password to the #password input
function writePassword() {
  var password = generatePassword(generateCharacterSets(prompts()));
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}
  
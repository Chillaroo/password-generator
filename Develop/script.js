// Assignment Code
var generateBtn = document.querySelector("#generate");
var specialCharacters = [" ","!","\"","#","$","%","&","'","(",")","*","+",",","-",".","/",":",";","<","=",">","?","@","[","\\","]","^","_","`","{","|","}","~"];
var digits = [0,1,2,3,4,5,6,7,8,9];
var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var uppercaseLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var length = 0;
var startingLength = 0;
var lowerCase = false;
var special = false;
var upperCase = false;
var numbers = false;
var characterTypes = [];
var passwordArray = [];

//Collect user inputs and returns an object with the password constraints
function prompts() {
  length = prompt("How many characters do you want in your password? \nInput an integer between 8 and 128.");
  //Ends the function if the user presses "Cancel"
  if(!length){
    return;
  }
  length = parseFloat(length);
  //Send an error message if the user doesn't input an appropriate integer
  while((Number.isInteger(length)===false)||(length<8)||(length>128)){
    length = prompt("ERROR: that was either not an integer or out of range. Please input an integer between 8 and 128.");
    //End the function if the user presses "Cancel"
    if(!length){
      return;
    }
    else{
      length = parseFloat(length);
    }
  }
  //Collect user inputs
  special =  confirm("Do you want any special characters? \nPress 'OK' for yes 'Cancel' for No.");
  upperCase = confirm("Do you want any upper case letters? \nPress 'OK' for yes 'Cancel' for No.");
  lowerCase = confirm("Do you want any lower case letters? \nPress 'OK' for yes 'Cancel' for No.");
  numbers = confirm("Do you want any numbers? \nPress 'OK' for yes 'Cancel' for No.");
  //Return an object containing user inputs
  return {
    length: length,
    special: special,
    upperCase: upperCase,
    lowerCase: lowerCase,
    numbers: numbers,
  }

}

//Create an array of user-specified character types and add one of each user-specified character type to the password array
function generateCharacterSets (constraints) {
  if (constraints.special === true) {
    characterTypes.push(specialCharacters);
    passwordArray.push(specialCharacters[Math.floor(Math.random()*specialCharacters.length)]);
    startingLength++;
  }
  if (constraints.upperCase === true) {
    characterTypes.push(uppercaseLetters);
    passwordArray.push(uppercaseLetters[Math.floor(Math.random()*uppercaseLetters.length)]);
    startingLength++;
  }
  if (constraints.lowerCase === true) {
    characterTypes.push(letters);
    passwordArray.push(letters[Math.floor(Math.random()*letters.length)]);
    startingLength++;
  }
  if (constraints.numbers === true) {
    characterTypes.push(digits);
    passwordArray.push(digits[Math.floor(Math.random()*digits.length)]);
    startingLength++;
  }
  return characterTypes;
}

//Shuffle an array
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

//Select random elements from the array of user-specified character types and add them to the password array
function generatePassword(characterTypes){
  for(var i=0; i<(length-startingLength); i++){
    let outerIndex = Math.floor(Math.random()*characterTypes.length);
    let innerIndex = Math.floor(Math.random()*characterTypes[outerIndex].length);
    passwordArray.push(characterTypes[outerIndex][innerIndex]);
  }
  //Shuffle the password array
  shuffle(passwordArray);
  //Converts password array to a string
  password = passwordArray.join('');
  console.log(password);
  //Return the password as a string
  return password;  
}

//Write password to the #password input
function writePassword() {
  //Reset arrays and lengths
  characterTypes = [];
  passwordArray = [];
  length = 0;
  startingLength = 0;
  //Store the user inputs
  let userInputs = prompts();
  //Send an error message if the user inputs aren't valid and prompt the user to try again or cancel
  if(!userInputs){
    return;
  } 
  else if (!userInputs.special && !userInputs.upperCase && !userInputs.lowerCase && !userInputs.numbers){
    var tryAgain = confirm("You need to select at least one character type to generate a password. \nPlease press 'OK' to try again and 'Cancel' to quit.");
    if(tryAgain){
      writePassword();
    }
    return;
  }
  //Collect the inputs, create the password, and store the password as a string
  var password = generatePassword(generateCharacterSets(userInputs));
  //Display the password on the screen
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

//Call the writePassword function when the user clicks the "Generate" button
generateBtn.addEventListener("click", writePassword);

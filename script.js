// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  let password = generatePassword();
  let passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Character classes for passwords
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const number = "0123456789";

// List of special characters for passwords from 
// https://owasp.org/www-community/password-special-characters
const specialChar = " !\"#$%&'()*+,-./:;<=>?@[]^_`{|}~";

const charArray = [lowerCase, upperCase, number, specialChar];
const minNumber = 8;
const maxNumber = 128;

// Generate a password given user input
function generatePassword() {
  let password = "";

  for (let index = 0; index < maxNumber; index++) {
    // Pick a random character from a random character class
    let charClass = charArray[Math.floor(Math.random() * charArray.length)];
    let char = charClass[Math.floor(Math.random() * charClass.length)];
    password += char;
  }

  return password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

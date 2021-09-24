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

// TODO: Make this a variable based on user input
const passwordChars = lowerCase + upperCase + number + specialChar;
const minNumber = 8;
const maxNumber = 128;

// Generate a password given user input
function generatePassword() {
  let password = "";

  for (let index = 0; index < maxNumber; index++) {
    // Pick a random character from the string
    let char = passwordChars[Math.floor(Math.random() * passwordChars.length)];
    password += char;
  }

  return password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

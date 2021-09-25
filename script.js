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

// Determine if the string passed in is a valid number
// From https://stackoverflow.com/questions/175739/
function isNumeric(str) {
  if (typeof str != "string") {
    return false; // we only process strings!
  }

  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseInt(str))
  ); // ...and ensure strings of whitespace fail
}

// Prompt for the length of the password to generate
function promptPasswordLength() {
  let int = 0;
  let value = prompt("How long should the password be?", "8");

  // If the user didn't cancel
  if (value != null) {
    if (!isNumeric(value)) {
      alert(value + " is not numeric.");
    } else {
      int = parseInt(value);
      if (int < 8 || int > 128) {
        alert("Password length must be between 8 and 128.");
        int = 0; // Signal failure
      }
    }
  }

  // Alert the user that password generation was cancelled.
  if (!int) {
    alert("Password generation cancelled.");
  }

  return int;
}

// Generate a password given user input
function generatePassword() {
  let length = promptPasswordLength();

  let password = "";

  for (let index = 0; index < length; index++) {
    // Pick a random character from the list of password chars and append it to password
    let char = passwordChars[Math.floor(Math.random() * passwordChars.length)];
    password += char;
  }

  return password;
}

// Get reference to the #generate element
let generateBtn = document.querySelector("#generate");

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

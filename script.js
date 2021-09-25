// Write password to the #password field
function writePassword() {
  let password = generatePassword();
  let passwordText = document.querySelector("#password");

  passwordText.value = password;
}

function getPasswordChars() {
  // Character classes for passwords
  const lowerCase = "abcdefghijklmnopqrstuvwxyz";
  const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  // List of special characters for passwords from
  // https://owasp.org/www-community/password-special-characters
  const specialChars = " !\"#$%&'()*+,-./:;<=>?@[]^_`{|}~";

  let passwordChars = lowerCase + upperCase + numbers + specialChars;

  return passwordChars;
}

// Determine if the string passed in is a valid number
// From https://stackoverflow.com/questions/175739/
function isNumeric(str) {
  if (typeof str != "string") {
    return false; // we only process strings!
  }

  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseInt(str)) // ...and ensure strings of whitespace fail
  );
}

// (Prompt for the length) of the password to generate.
// Inform the user and return 0 if user cancels or enters an invalid number
function promptPasswordLength() {
  const minNumberChars = 8;
  const maxNumberChars = 128;

  let int = 0;
  let value = prompt("How long should the password be?", minNumberChars);

  // If the user didn't cancel
  if (value != null) {
    if (!isNumeric(value)) {
      alert(value + " is not numeric.");
    } else {
      int = parseInt(value);
      if (int < minNumberChars || int > maxNumberChars) {
        alert(
          "Password length must be between " +
            minNumberChars +
            " and " +
            maxNumberChars +
            "."
        );

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
  let passwordChars = getPasswordChars();

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

/**
 * 
 * @param { string } charClass Character class (string of chars in class)
 * @param { int } passwordLength Password length
 * @param { int } arrayLength Array length
 * @returns Object for character class
 * 
 * Create the object for a character class
 * 
 * The use of randomPos will, at worst, force each of the character classes
 * to be used as the last N or first N characters of the password, where N is the
 * number of character classes.  This class should be called once per 
 * character class, with an increasing arrayLength starting at 0.
 * 
 * This code assumes that 0 < # of character classes < password length and that array 
 * length starts at zero and grows by one at each call.
 */
function createCharClassObj(charClass, passwordLength, arrayLength) {
  let charClassObj = {
    chars: charClass,
    // Force generation of character class at a random position if not used
    randomPos: Math.floor(Math.random() * (passwordLength - arrayLength)),
    used: false, // Keep track of whether this class has been used
  };

  return charClassObj;
}

// Prompt the user for password character classes.
function promptPasswordChars(length) {
  // Character classes for passwords
  const lowerCase = "abcdefghijklmnopqrstuvwxyz";
  const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  // List of special characters for passwords from
  // https://owasp.org/www-community/password-special-characters
  const specialChars = " !\"#$%&'()*+,-./:;<=>?@[]^_`{|}~";

  let passwordCharsArray = [];

  if (confirm("Use lower case characters?")) {
    let lowerCaseObj = createCharClassObj(lowerCase, length, passwordCharsArray);
    passwordCharsArray.push(lowerCaseObj);
  }

  if (confirm("Use upper case characters?")) {
    let upperCaseObj = createCharClassObj(upperCase, length, passwordCharsArray);
    passwordCharsArray.push(upperCaseObj);
  }

  if (confirm("Use numbers?")) {
    let numbersObj = createCharClassObj(numbers, length, passwordCharsArray);
    passwordCharsArray.push(numbersObj);
  }

  if (confirm("Use special characters?")) {
    let specialCharsObj = createCharClassObj(specialChars, length, passwordCharsArray);
    passwordCharsArray.push(specialCharsObj);
  }

  if (!passwordCharsArray.length) {
    alert("No character classes selected for password.");
  }

  return passwordCharsArray;
}

/**
 * 
 * @param { string } str String to test
 * @returns true if a number, false if not
 * 
 * Determine if the string passed in is a valid number
 * From https://stackoverflow.com/questions/175739/
 */
function isNumeric(str) {
  if (typeof str != "string") {
    str = "" + str; // we only process strings!
  }

  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseInt` alone does not do this)...
    !isNaN(parseInt(str)) // ...and ensure strings of whitespace fail
  );
}

/**
 * 
 * @returns Length of password to generate, 0 if user cancels or enters an invalid number
 */
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
        alert("Password length must be between " + minNumberChars + " and " + maxNumberChars + ".");

        int = 0; // Signal failure
      }
    }
  }

  return int;
}

// Generate a password given user input
function generatePassword() {
  let passwordChars = [];
  let length = promptPasswordLength();
  if (length) {
    passwordChars = promptPasswordChars(length);
  }

  if (!length || !passwordChars.length) {
    alert("Password generation cancelled.");
    length = 0; // Clears the generated password box
  }

  let password = "";

  // Note that in the special case where length is 0, nothing happens here!
  for (let index = 0; index < length; index++) {
    password += getPasswordChar(index, passwordChars);
  }

  return password;
}

/**
 * 
 * @param { int } index current index of string to generate
 * @param { array of passwordCharObj } passwordChars Password char object array
 * @returns one character 
 * 
 * Get a password character from passwordChars
 */
function getPasswordChar(index, passwordChars) {
  let charClass = -1;

  // Force the use of a character class if we are past the random position for that class
  // and we haven't used the character class yet
  for (let i = 0; i < passwordChars.length; i++) {
    if (!passwordChars[i].used && index >= passwordChars[i].randomPos) {
      charClass = i; // Use this character class
      break;
    }
  }

  // If not being forced to use a character class, use a random one
  if (charClass === -1) {
    charClass = Math.floor(Math.random() * passwordChars.length);
  }

  passwordChars[charClass].used = true; // Flag character class as used.

  let str = passwordChars[charClass].chars; // Use the "random" character class

  // Pick a random character from that string and return it
  return str[Math.floor(Math.random() * str.length)];
}

/**
 * Generate password and display it to the #password field.
 * 
 * An empty string will clear the field.
 */
function writePassword() {
  let password = generatePassword();
  let passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Get reference to the #generate element
let generateBtn = document.querySelector("#generate");

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
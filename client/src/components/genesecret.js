const crypto = require('crypto');


// this function prints out a random string of 64 characters
// for use as a session secret token in .env file
function generateSecret() {
  return crypto.randomBytes(64).toString('hex');
}


//session secret genertor for .env file

const secret = generateSecret();
console.log("psst... here, have an secret: "+ secret); 
 


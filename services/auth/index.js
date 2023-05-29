const bcrypt = require('bcrypt')

async function verifyPassword(hashedPassword, userPassword) {
 return bcrypt.compare(hashedPassword, userPassword)
}

module.exports = {verifyPassword}
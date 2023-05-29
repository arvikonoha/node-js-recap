const User = require("../../models/User");
const bcrypt = require("bcrypt");

const createNewUser = async ({username, password}) => {

		/* If user does not exist, create onje */
		const newUser = new User();

		/* Salt needed to encrypt the password */
		const salt = await bcrypt.genSalt(12);

		/* Update the username and encrypted password */
		newUser.username = username;
		newUser.password = await bcrypt.hash(password, salt);

		/* Save the new user in the database */
		await newUser.save();

		return newUser
}

const findUserOnUsername = (username) => User.findOne({username})


const findUserOnID = (userId) => User.findById({_id: userId})

module.exports = {
 createNewUser,
 findUserOnUsername,
 findUserOnID
}
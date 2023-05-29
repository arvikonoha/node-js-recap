const { verifyPassword } = require("../../services/auth");
const { createNewUser, findUserOnUsername, findUserOnID } = require("../../services/user");

const loginUserPassport = async (username, password, done) => {
 try {
	
	 /* Check if user exists for the given username */
	 const user = await findUserOnUsername( username );
	
	 /* If user does not exist, mark as the process failed */
	 if (!user) {
		return done(null, false);
	 }
	
	 /* Check if password is valid */
	 const isPasswordValid = await verifyPassword(
		password,
		user.password
	 );
	
	 /* If password is valid proceed with the user object */
	 if (isPasswordValid) return done(null, user);
	
	 /* If password is not valid mark process as failed */
	 return done(null, false);

 } catch (error) {
		conole.log("Error in passport/loginUserPassport ", error)
		done(error)
 }
}

const registerUserPassport = async (username, password, done) => {

	try {
		
		/* Check if user already exists for the given username */
		const user = await findUserOnUsername(username);
	
		/* If user exists mark the process as failed */
		if (user) {
			return done(null, false);
		} else {
			const newUser = await createNewUser({username, password})
			/* Proceed with the user object */
			done(null, newUser);
		}

	} catch (error) {
		conole.log("Error in passport/registerUserPassport ", error)
		done(error)
	}

}

const serializeUserPassport = (user, done) => done(null, user.id)

const deserializeUserPassport = async (userId, done) => {
	try {
		const user = await findUserOnID(userId)
		done(null, user)
	} catch (error) {
		conole.log("Error in passport/deserializeUserPassport ", error)
		done(error)
	}
}

module.exports = {
	serializeUserPassport,
	deserializeUserPassport,
	loginUserPassport,
	registerUserPassport
}
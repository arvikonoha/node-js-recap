const ensureAuthenticated = async (req, res, next) => {
 if(req.isAuthenticated()) {
  next()
 } else {
  res.status(403).json({
   message: 'User is not authenticated'
  })
 }
}

const loginController = (req, res) => {
 res.json({message: `${req.user.username} IS LOGGED IN`});
}

const registerController = (req, res) => {
 res.json({message: `${req.user.username} IS REGISTERED`});
}

const getUserInfoController = (req, res) => {
 res.json({
  username: req.user.username,
  message: `${req.user.username} IS AUTHENTICATED`
 })
}

const logoutController = (req, res) => {
 const username = req.user?.username;

 req.logOut((error) => {
  if(error)
   return res.json({
    message: 'SOMETHING WENT WRONG WHILE LOGIN OUT'
   })
  res.json({
   message: `${username} IS LOGGED OUT`
  })
 })
}

const failureController = (req, res) => {
 res.json({
   message: 'Failed to authenticate, please retry'
 })
}

module.exports = {
 loginController,
 registerController,
 ensureAuthenticated,
 getUserInfoController,
 logoutController,
 failureController
}
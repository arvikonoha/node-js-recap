const router = require('express').Router()
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { ensureAuthenticated, loginController, registerController, getUserInfoController, logoutController, failureController } = require('../../controllers/auth');
const { loginUserPassport, registerUserPassport, deserializeUserPassport, serializeUserPassport } = require('../../controllers/passport');
const { validator, authSchema } = require('../../libraries/joi-validators');

passport.serializeUser(serializeUserPassport);

passport.deserializeUser(deserializeUserPassport);

passport.use(
 "local-login",
 new LocalStrategy(loginUserPassport)
);

passport.use(
 "local-signup",
 new LocalStrategy(registerUserPassport)
);

router.post('/login', 
  passport.authenticate('local-login', { failureRedirect: '/auth/failure' }),
  loginController
);

router.post('/register', 
  validator.body(authSchema),
  passport.authenticate('local-signup', { failureRedirect: '/auth/failure' }),
  registerController
);

router.get('/getUserInfo', ensureAuthenticated, getUserInfoController)

router.get('/logout', logoutController)

/* Authentication error handling */
router.get('/failure', failureController)

/* Validation errors handling */
router.use((err, req, res, next) => {
  /* Some route failed to handle the request */
  if (err && err.error && err.error.isJoi) {
    /* The the error turned out to be validation error */
    res.status(400).json({
      type: err.type, /* This could be the type of property we tried to validate */
      message: err.error.toString() /* The reason for failure */
    });
  } else {
    next(err);
  }
});

module.exports = router
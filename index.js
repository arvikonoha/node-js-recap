const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')

require('dotenv').config()

/* The cors lets request to be made from different origin from the server */
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

/* Parse the cookie from incoming request */
app.use(cookieParser());

/* Express body parser to extract data sent through the form */
app.use(express.json())

/* To keep track of sessions */
const session = require('express-session');

/* To manage authentication/authorization */
const passport = require('passport')

/* To persist sessions between connections */
const MongoStore = require('connect-mongo');

/* Connect to mongoDB */
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("CONNECTED TO MONGODB")
})
.catch(error => {
  console.error("FAILED TO CONNECT TO MONGODB ", error)
})

/* Initialize express sessions */
app.use(session({
 secret: process.env.COOKIE_SECRET, /* Used to encrypt the cookie */
 resave: false, /* If true saves session to the store even when request does not modify it */
 saveUninitialized: true,
 store: MongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  collection: 'sessions'
}),
 cookie: { maxAge  : 60 * 60 * 1000, secure: process.env.ENV === "Production" }
}));

/* Responsible for calling deserialize user using id in the session */
app.use(passport.initialize())

/* Adds the deserialized user to the passport, authenticates the req */
app.use(passport.session())

/* Routes for authentication */
const auth = require('./routes/auth')


app.use('/auth', auth)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`LISTENING TO PORT ${PORT}`))
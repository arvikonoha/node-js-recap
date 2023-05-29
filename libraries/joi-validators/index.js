const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({
 passError: true
})

const authSchema = Joi.object({
 username: Joi.string().regex(/^[a-z0-9_]*$/).min(3).max(15).required(),
 password: Joi.string().min(5).max(18).required()
})

module.exports = {
 authSchema,
 validator
}
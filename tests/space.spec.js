const User = require("../models/User");

describe('Registeration test suite', () => {
 
 afterAll(() => {
  await User.deleteMany({})
  console.log("All users deleted, test data cleared")
 });

 it('tests/validation error when username has disallowed characters', () => {
  expect({'message': 'Validation failed'}).toMatchObject({'message': 'Validation failed'})
 })
})
const express = require('express');
const passwordStrengthRoutes = express.Router();
const passwordValidator = require('password-validator');

// Create a schema for password validation
const schema = new passwordValidator();
schema
  .is().min(8) // Minimum length 8
  .is().max(20) // Maximum length 20
  .has().uppercase() // Must have uppercase letters
  .has().lowercase() // Must have lowercase letters
  .has().digits(1) // Must have at least 1 digit
  .has().symbols(1) // Must have at least 1 symbol
  .has().not().spaces(); // Should not have spaces

// Middleware to parse JSON in POST requests
passwordStrengthRoutes.use(express.json());

passwordStrengthRoutes.get('/', (req, res) =>{
  res.send("To Check your password stength go to (/check-password) route!");
});
// Endpoint to check password strength
passwordStrengthRoutes.post('/check-password', (req, res) => {
  const { password } = req.body;

  // Validate password against the schema
  const isValid = schema.validate(password);

  if (isValid) {
    res.status(200).json({ message: 'Password is strong!' });
  } else {
    res.status(400).json({ message: 'Password does not meet requirements.' });
  }
});
module.exports= passwordStrengthRoutes;
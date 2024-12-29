// routes/auth.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const { register, login, verify } = require('../controllers/authController');
const router = express.Router();

router.post('/register', [
  body('email').isEmail().withMessage('Must be a valid email'),
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, register);

router.post('/login', [
  body('publicKey').isString().withMessage('Must be a valid public key'),
  body('signature').isString().withMessage('Must be a valid signature'),
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, login);

router.get('/verify', verify);

module.exports = router;
const web3 = require('../config/web3');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateToken, verifyToken } = require('../helpers/jwtHelper');

const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const account = web3.eth.accounts.create();
    const publicKey = account.address;

    user = await User.create({
      email,
      publicKey,
    });

    res.json({
      message: 'User registered successfully',
      publicKey,
      privateKey: account.privateKey,
    });
  } catch (err) {
    console.error('Error during registration:', err.message);
    res.status(500).send('Server error');
  }
};

const login = async (req, res) => {
  const { publicKey, signature } = req.body;

  try {
    const user = await User.findOne({ where: { publicKey } });
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    const message = "Authentication challenge";
    const recoveredAddress = web3.eth.accounts.recover(message, signature);

    if (recoveredAddress.toLowerCase() === publicKey.toLowerCase()) {
      const token = generateToken({ publicKey });
      res.json({ token });
    } else {
      res.status(401).send('Invalid signature');
    }
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).send('Server error');
  }
};

const verify = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    res.json({ publicKey: decoded.publicKey });
  } catch (err) {
    res.status(401).send('Invalid token');
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { register, login, verify, getUsers };
// tests/auth.test.js
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('../routes/auth');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const web3 = require('../config/web3');
const { body } = require('express-validator');

// Initialiser l'application Express
const app = express();
app.use(bodyParser.json());
app.use('/auth', authRoutes);

// Tester l'enregistrement d'un utilisateur
describe('POST /auth/register', () => {
  it('should register a new user and return the public key', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ email: 'test@example.com' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('publicKey');
    console.log(statusCode);
    console.log(body);
  });
});

// Tester la connexion d'un utilisateur
describe('POST /auth/login', () => {
  it('should login a user and return a JWT token', async () => {
    // Générer une paire de clés et signer un message pour le test
    const account = web3.eth.accounts.create();
    const message = "Authentication challenge";
    const signature = web3.eth.accounts.sign(message, account.privateKey).signature;

    const res = await request(app)
      .post('/auth/login')
      .send({ publicKey: account.address, signature });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});

// Tester la vérification de l'identité d'un utilisateur
describe('GET /auth/verify', () => {
  it('should verify the user identity and return the public key', async () => {
    const publicKey = '0x1234567890abcdef1234567890abcdef12345678';
    const token = jwt.sign({ publicKey }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const res = await request(app)
      .get('/auth/verify')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('publicKey');
    expect(res.body.publicKey).toBe(publicKey);
  });

  it('should return 401 for invalid token', async () => {
    const res = await request(app)
      .get('/auth/verify')
      .set('Authorization', 'Bearer invalidtoken');

    expect(res.statusCode).toEqual(401);
  });
});
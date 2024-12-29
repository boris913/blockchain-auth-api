// config/web3.js
const Web3 = require('web3').default;
require('dotenv').config();

const web3 = new Web3(`https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`);

module.exports = web3;
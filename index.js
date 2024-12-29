require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectDB, sequelize } = require('./config/database');
const authRoutes = require('./routes/auth');

const app = express();
const port = process.env.PORT || 3000;

// Connecter à PostgreSQL et synchroniser les modèles
connectDB().then(() => {
  sequelize.sync()
    .then(() => {
      console.log('Database synchronized');
    })
    .catch(err => {
      console.error('Error synchronizing database:', err);
    });
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/auth', authRoutes);

// Route pour la racine
app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API d\'authentification basée sur la blockchain !');
});

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
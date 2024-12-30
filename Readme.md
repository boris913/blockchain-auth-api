# Blockchain Authentication API

Ce projet est une API d'authentification basée sur la blockchain utilisant Node.js, Express, Sequelize, et Web3.js. L'API permet l'enregistrement des utilisateurs, la connexion et la vérification d'identité à l'aide de la cryptographie Ethereum.

## Prérequis

Assurez-vous d'avoir les éléments suivants installés sur votre machine :

- Node.js
- npm (Node Package Manager)
- PostgreSQL

## Installation

1. Clonez le dépôt :

    ```bash
    git clone git@github.com:boris913/blockchain-auth-api.git
    cd blockchain-authentication-api
    ```

2. Installez les dépendances :

    ```bash
    npm install
    ```

3. Créez un fichier `.env` à la racine du projet avec le contenu suivant :

    ```dotenv
    DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<database>
    JWT_SECRET=VotreCléSecrèteGénérée
    INFURA_PROJECT_ID=VotreInfuraProjectID
    PORT=3000
    ```

    Remplacez `<username>`, `<password>`, `<host>`, `<port>`, `<database>`, et `VotreInfuraProjectID` par vos informations de configuration.

4. Initialisez la base de données :

    ```bash
    npx sequelize-cli db:migrate
    ```

## Utilisation

1. Démarrez le serveur :

    ```bash
    node index.js
    ```

2. Accédez à l'application via votre navigateur à l'adresse http://localhost:3000.

## Fonctionnalités

### Enregistrement

- URL : `/auth/register`
- Méthode : `POST`
- Corps de la requête : `{ "email": "user@example.com" }`

### Connexion

- URL : `/auth/login`
- Méthode : `POST`
- Corps de la requête : `{ "publicKey": "0x...", "signature": "0x..." }`

### Vérification d'identité

- URL : `/auth/verify`
- Méthode : `GET`
- En-tête : `Authorization: Bearer <jwt-token>`

## Structure du Projet

```plaintext
/project-root
│
├── .env
├── config
│   ├── database.js
│   └── web3.js
│
├── controllers
│   └── authController.js
│
├── models
│   └── User.js
│
├── routes
│   └── auth.js
│
├── helpers
│   └── jwtHelper.js
│
├── public
│   ├── index.html
│   └── script.js
│
└── index.js

Dépendances
express : Framework web pour Node.js
sequelize : ORM pour Node.js
pg : Module PostgreSQL pour Node.js
jsonwebtoken : Bibliothèque pour la gestion des JSON Web Tokens
web3 : Bibliothèque pour interagir avec Ethereum
Contribuer
Les contributions sont les bienvenues ! Veuillez suivre les étapes ci-dessous pour contribuer :

Fork le projet
Créez une branche pour votre fonctionnalité (git checkout -b feature/awesome-feature)
Commitez vos modifications (git commit -m 'Add some awesome feature')
Poussez à la branche (git push origin feature/awesome-feature)
Ouvrez une Pull Request
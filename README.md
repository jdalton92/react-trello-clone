# **React Trello Clone**

Minimal Trello clone built with React

## Acknowledgement

- [marconunnari](https://github.com/marconunnari/trello-clone) for the starter frontend class based React components, which I have implemented with React functional components, as well as integrated with my bespoke NodeJS/MongoDB backend

## Prototype

> [https://reacttrelloclone.herokuapp.com/](https://reacttrelloclone.herokuapp.com/)

## Authors

- **James Dalton**

## Instructions

1. Clone app, and run frontend

```sh
git clone https://github.com/jdalton92/react-trello-clone.git
cd client
npm install
npm start
```

2. **Optional:** Integrate Backend to allow user creation, login, and save forms.

Create `.env` file in backend root directory with environment variables for the following uses;

- **MongoDB:** MONGODB_URI, PORT
- **jwt:** SECRET

```sh
cd server
npm install
npm run watch
```

## Built with

- [create-react-app](https://github.com/facebook/create-react-app) - Create React App is a comfortable environment for learning React, and is the best way to start building a new single-page application in React.
- [ReactJS](https://reactjs.org/) - A JavaScript library for building user interfaces
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Database built for agile teams who’d rather spend time building apps than managing databases.
- [NodeJS](https://nodejs.org/en/) - Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine
- [Visual Studio Code](https://code.visualstudio.com/) - IDE

## Licence

This project is licensed under the terms of the MIT license

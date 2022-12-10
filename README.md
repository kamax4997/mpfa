# MP Assessment

## Author

### Name: Andrei Strukau

### Email: karlikboroda@gmail.com

## Live Demo

[Merpay FA](https://merpay-fa.herokuapp.com/)

## Description

Created by using [Create React App](https://github.com/facebook/create-react-app) (CRA) _template_ with following libraries including:

- React v18.0.2
- Type Checker - TypeScript
- API client - Axios
- MUI v5
- State management - Redux Thunk & Toolkit
- Unit Test - Jest
- Format & Lint - ESLint & Prettier

Custom Templates, format, and ESlint configurations.

## Setup Environments

- Node 16.14.0

```
npm install
```

## Run Scripts

Inside the project directory run:

- `npm start` - runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- `npm run test:dev` - run tests.
- `npm run test:coverage` - run tests and show coverage of it.
- `npm run lint:fix` - fix lint errors.
- `npm run prettier:fix` - fix prettier errors.

## State Management

The code is set for [Redux Toolkit](https://medium.com/react-courses/instant-learn-react-redux-toolkit-with-a-simple-minimalistic-example-3c63c296ed65) you pick.

## Eslint configurations

Lint is set according to Airbnb style guide — as part of their style guide.

## Format configurations

[Prettier](https://prettier.io/) is set using my opinionated settings, feel free to [tweak prettier rules](https://prettier.io/docs/en/configuration.html) inside config file `.prettierrc` to match your code style.

## App Structure
I built this app using React v18 and Typescript and also used MUI v5.
I implemented the unit tests using jest and created two services(Axios and REST).
I automated lint, prettier, and type checks using husky and also added a pipeline using github actions.

## API

I deployed the server to the heroku and the url is here.
`https://merpay-api.herokuapp.com/`

## TODO

- Improve the coverage of the tests including e2e tests
- Update server to support pagination or infinite scroll in the frontend

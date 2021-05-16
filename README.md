# React NextJs Rest Api

This repository contains a simple front end java script application using React + NextJs connecting to a backend Http Rest Api.

## Tools Required
* NodeJs 14: `node --version`
* Npm 6: `npm --version`
* Npx 6: `npx --version`

## Commands

### Install node modules

    npm install

### Start application in development mode

    npm run dev

### Build application to generate production artifact and export as static website

    npm run build && npm run export

### Start application using production artifact

    npm run build && npm run start

or

    npm run build && npm run export && npm run serve

### Start Open Api Mocker

    npm run open-api-mocker

### Run Jest test (interactive mode)

    npm run test

### Run Jest test (non-interactive mode)

    npm run test:run-ci

### Run Cypress test (interactive mode)

    npm run cypress

### Run Cypress test (non-interactive mode)

    npm run cypress:run-ci

### Filter Cypress test by name

    npm run cypress -- --env grep="tests jump to bottom and top"

### Run CI tests

    ./ci-build.sh

### Changing default parameters using environment variables

    export PORT=4000
    export NEXT_BASE_PATH=/my-app
    export OUT_DIR=prod_artifact/my-app
    export SERVE_DIR=prod_artifact
    export CYPRESS_BASE_URL=http://localhost:4000/my-app

    ./ci-build.sh

### Generate full cypress html report

    npm run mochawesome-merge && npm run marge
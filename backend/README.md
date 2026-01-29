# Coffee and Tee List - MVST challenge Backend

## Scripts

The following scripts are here to help you get up and running in a development environment as quickly as possible.

### Installation

```bash
$ yarn install
```

### Running the database with docker

If you have docker installed on your machine, we have provided a script to easily spin up
a Postgres database.

```bash
$ yarn start:dev:db
```

### Running your own Postgres database

If you don't want to use docker, you can configure this by yourself. You will need to have Postgres installed. We will however use the Dockerfile when reviewing/running your backend code. Therefore, for us to easily run your project, please use the following configuration:

```
host: 'localhost'
port: 5432
username: 'postgres'
password: '1234'
database: 'mvst-coffee-challenge-db'
```

### Running the project in development mode

```bash
# Will run on port 5000
$ yarn start:dev
```

### Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

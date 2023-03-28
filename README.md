# ![Ampaz](logo.png)

> ### Nestjs codebase containing api essentials (CRUD, auth, advanced patterns, etc) that adheres to clean code & DDD.


This codebase was created to demonstrate a fully fledged fullstack application built with Nestjs including CRUD operations, authentication, routing, pagination, and more.

We've gone to great lengths to adhere to the Nestjscommunity styleguides & best practices.

For more information on how to this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.

# How it works
This implementation works with nestjs connected to a mongodb database running as a replica set. The database transactions are carried out with prisma as a orm.

# Getting started
To run locally use mongodb in docker using docker compose script in the base directory. It will running as a replication set.
To start a mongod process as a replication set look [here](https://docs.mongodb.com/manual/tutorial/convert-standalone-to-replica-set/)

## Installation

```bash
$ npm install
```
start mongo in docker
```bash
docker-compose up -d
```
generate prisma types and push schema to mongod database
```bash
npx prisma generate

npx prisma db push
```

## Running the app
# development
```bash
$ npm run start
```
# watch mode
```bash
$ npm run start:dev
```
# production mode
```bash
$ npm run start:prod
```

## Test
```bash
# unit tests
To be done
```

# e2e tests
```bash
$ npm run test:e2e
```


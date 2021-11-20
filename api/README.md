# ListList Back-End API

 GraphQL + node.js + express + JWT, and MySQL as datasource.

## How to use?

**All of these operations are executing under `api` folder.**

1. Create a database, and import the SQL from `/database/db.sql` file.
2. In config folder, copy `db.config.js.example` to `db.config.js`, then modify your database settings in `db.config.js` file.
3. Copy `.env.example` to `.env`
4. Run `node createToken.js` to generate a token secret. (JUST ONCE), then copy and parse token secret from command line to .env file. (JUST DO ONCE)
5. In this project, i am using AWS S3 as cloud storage service, modify `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `AWS_S3_BUCKET` in `.env` file. (JUST DO ONCE)
6. Run `npm i` to install dependencies.
7. Run `node index.js` to start graphQL.
8. Visit `http://localhost:4000` in your browser.

## Folder description

config: your database configuration

database:
  - index.js : used to init the database connection and db query method.

resolvers:
  - Query: used to store all of your queries.
  - Mutation: used to store all of your mutations.

types: used to store all data type definitions.

schema: entry of graphQL 
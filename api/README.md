# ListList Back-End API

 GraphQL + node.js + express + JWT, and MySQL as datasource.

## How to use?

1. Download this repo.
2. Create a database, and import the SQL from /database/db.sql file.
3. Modify your database settings in config/db.config.js file, change the db password and db name.
4. Copy .env.example to .env
5. Run `node createToken.js` to generate a token secret. (JUST ONCE), then copy and parse token secret from command line to .env file. (JUST DO ONCE)
6. In this project, i am using AWS S3 as cloud storage service, modify AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, AWS_S3_BUCKET in .env file. (JUST DO ONCE)
7. Run `npm i` to install dependencies.
8. Run `node index.js` to start graphQL.
9. Visit `http://localhost:4000` in your browser.

## Folder description

config: your database configuration

database:
  - index.js : used to init the database connection and db query method.

resolvers:
  - Query: used to store all of your queries.
  - Mutation: used to store all of your mutations.

types: used to store all data type definitions.

schema: entry of graphQL 
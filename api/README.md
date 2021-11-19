# ListList Back-End API

 GraphQL + node.js + express + JWT, and MySQL as datasource.

## How to use?

1. Download this repo.
2. Create a database, and import the SQL from /database/db.sql file.
3. Modify config/db.config.js file, change the db password and db name.
4. Create a file in api folder, name is `.env`, content is:

```
TOKEN_SECRET=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_S3_BUCKET=
```

5. Run `node createToken.js` to generate a token secret. (JUST ONCE)
6. Copy and parse token secret from command line to .env file. (JUST ONCE)
7. In this project, i am using AWS S3 as cloud storage service, modify AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, AWS_S3_BUCKET in .env file. (OPTIONAL, JUST ONCE)
8. Run `npm i` to install dependencies.
9. Run `node index.js` to start graphQL.
10. Visit `http://localhost:4000` in your browser.

## Folder description

config: your database configuration

database:
  - index.js : used to init the database connection and db query method.

resolvers:
  - Query: used to store all of your queries.
  - Mutation: used to store all of your mutations.

types: used to store all data type definitions.

schema: entry of graphQL 
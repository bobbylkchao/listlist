# ListList Back-End API

 GraphQL + node.js + express + JWT, and MySQL as datasource.

## How to use?

1. Download this repo.
2. Create a database, and import the SQL from /database/db.sql file.
3. Modify config/db.config.js file, change the db password and db name.
3. Open repo, and execute `npm i`.
4. Ok, done, run it `node index.js`.
5. Visit `http://localhost:4000` in your browser.

## Next Step: Create Token
1. Run `node createToken.js` to generate a token secret.
2. Copy and parse token secret from command line to .env file.

## Next Step: Modify AWS Configuration
1. In this project, i am using AWS S3 as cloud storage service
2. Modify AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, AWS_S3_BUCKET in .env file.

## Folder description

config: your database configuration

database:
  - index.js : used to init the database connection and db query method.

resolvers:
  - Query: used to store all of your queries.
  - Mutation: used to store all of your mutations.

types: used to store all data type definitions.

schema: entry of graphQL 
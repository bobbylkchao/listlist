**[UNDER DEVELOPMENT]**

![ScreenShot](https://raw.githubusercontent.com/bobbylkchao/listlist/main/doc/screenshoot/web-header.png)

*More screenshots at bottom of this page.*

# Status, Progress and Update

Please see [Project Progress](https://github.com/users/bobbylkchao/projects/1/views/1?groupedBy%5BcolumnId%5D=303996)

# Author

Bobby Chao

Senior full-stack engineer and system architect, facebook related technologies believer, more than 10 years experiences, focusing on building high-performance, scalable and distributed applications. Currently looking for new job opportunities in Winnipeg, Canada.

[Linkedin](https://www.linkedin.com/in/bobbylkchao/)

[Email](mailto:bobbylkchao@gmail.com)

# Introduction

Listlist is a Kijiji clone opensource project, it is a full-stack project, using React.js, React Native, GraphQL and Apollo.
Project will include all parts, eg. Web, IOS, Android, API, and Management Website.

# Technoloy Stacks

Front-End: TypeScript, HTML5, SCSS, styled-components

JS Library: React.js

React Framework: Next.js

Cross-Platform: React Native, Expo

State Managment: Redux, Relay

Back-End: Node.js, ES6, GraphQL, Apollo

Database: MySQL

Socket: Socket.io

# How to start dev env?

1. Clone repo
2. Create a mysql database, and import the SQL from /api/database/db.sql file.
3. Modify /api/config/db.config.js file, change the db password and db name.
4. Go to api folder, then run `node index.js`, then visit graphQL http://localhost:4000 in your browser.
5. Go to web folder, then run `yarn dev` to start the development environment, then visit http://localhost:3000 in your browser.

# How to build?

1. Go to web folder, then run `yarn build` to build the production files, after finished, run `yarn start` to start the production.

**REMEMBER to read every README.MD in different folders, eg. /web/README.MD, /api/README.MD, /app/README.MD**

# Purpose

Skills practice and proof of skills

# Remarks

For the Web, we will only use React.js to implement it, not using react-native-web.

# Folder Description

api: GraphQL API project

app: React Native project

web: React.js project

# Screenshots

**Post Ad Page**

![ScreenShot](https://raw.githubusercontent.com/bobbylkchao/listlist/main/doc/screenshoot/web-post-ad-0.0.4.png)

**graphQL Query APIs**

![ScreenShot](https://raw.githubusercontent.com/bobbylkchao/listlist/main/doc/screenshoot/graphQL-query.png)

**graphQL Mutation APIs**

![ScreenShot](https://raw.githubusercontent.com/bobbylkchao/listlist/main/doc/screenshoot/graphQL-mutation.png)

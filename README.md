**[UNDER DEVELOPMENT]**

![ScreenShot](https://raw.githubusercontent.com/bobbylkchao/listlist/main/doc/screenshoot/web-header.png)

# Status

**Current status:** Web development -> Post Ad Feature

![ScreenShot](https://raw.githubusercontent.com/bobbylkchao/listlist/main/doc/screenshoot/web-post-ad.png)
*(Post Ad Feature)*

**Current development sequence:** Web & API -> Mobile App

**Contributors:** Bobby Chao (bobbylkchao@gmail.com)

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

# How to run?

1. Clone repo
2. Create a mysql database, and import the SQL from /api/database/db.sql file.
3. Modify /api/config/db.config.js file, change the db password and db name.
4. Run `npm run api`, then visit graphQL http://localhost:4000 in your browser.
5. Run `npm run web`, then visit http://localhost:3000 in your browser

# Purpose

Skills practice and proof of skills

# Remarks

For the Web, we will only use React.js to implement it, not using react-native-web.

# Folder Description

api: GraphQL API project

app: React Native project

web: React.js project

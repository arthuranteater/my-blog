---
title: Postgresql + Knex
---
```
$createdb db-name  
$take name-server  
$git init  
$npm init -y  
$knex init  
$npm i pg express knex morgan cors body-paser dotenv  
$touch app.js queries.js .gitignore .env  
$code .
```

1) Edit json to include script to run node app.js
2) Create server with Express:
```javascript
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;
const queries = require("./queries.js");
app.use(bodyParser.json());
app.use(cors());
app.listen(port, (req, res) => {
    console.log(`listening on ${port}`);
});
```  
$npm start

3) Edit knexfile.js:

```javascript
development: {
    client: "pg",
    connection: "postgresql://localhost/db-name"
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL
  }
  ```
  $knex migrate:make migration-name  
  $knex seed:make seed-name

  5) Fill migration(s):
  ```javascript
  return knex.schema.createTable("peppers", pepper => {
        pepper.increments("Id");
        pepper.text("Name");
        pepper.boolean("Capsaicin").notNullable().defaultTo(true)
        pepper.integer("Rating")
    });
    return knex.schema.dropTableIfExists("peppers")
  ```

  6) Fill seed(s)

  $knex migrate:latest  
  $knex seed:run

  7) Edit queries.js:
  ```javascript
  let connection = require('./knexfile')[process.env.NODE_ENV || 'development']
  let run = require('knex')(connection)
```
8) Write queries:
```javascript
module.exports = {
  getById(id) {
    return knex
      .select()
      .from("classmates")
      .where("id", id);
  },
  ```
9) Write routes:
```javascript
app.get("/", (request, response) => {
    //res.send('working')
  queries.list().then(result => response.json({ result }));
});
app.get("/:id", (req, res) => {
  queries.getById(req.params.id).then(data => res.json({ data }));
});
app.post("/", (req, res) => {
  queries.createStudent(req.body).then(data => res.json({ data }));
});
app.delete("/:id", (req, res) => {
  queries.deleteStudent(req.params.id).then(data => res.json({ data }));
});
app.put("/:id", (req, res) => {
  queries
    .updateStudent(req.params.id, req.body)
    .then(data => res.json({ data }));
});
```
10) Test routes with Postman
11) Add error handling/auth
12) Test routes with client
13) Deploy, run migration, seeds
```
$npm i -g heroku
$heroku create database_name
$git remote -v // verify
$heroku addons:create heroku-postgresql:hobby-dev // add db setup
$heroku pg:info // get database name
$heroku pg:credentials:url <database_name_from_last_step> // get database url
$heroku info // get app name
$heroku config:set DATABASE_URL='<the_database_url_from_the_last_step>//postgres...' -a <app_name_from_last_step> // set heroku env variable
$git push heroku master
$heroku run knex migrate:latest
$heroku run knex seed:run
```
14) Test routes with client





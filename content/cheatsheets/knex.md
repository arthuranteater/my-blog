---
title: Knex
---

Iterable objects and arrays are returned, but at some point how much you are grabbing will matter if you scale....so

All queries return an array of objects and can be Jshauned using res.json({data}).


Select: 

Return all from table 'users'.
```javascript
knex.select().from('users')
```
OR
```javascript
knex('users')
```
Match:

Return users that match an 'id'.
```javascript
knex.('users').where("id", id )
```

Contains: 

From table 'users' return all where column 'ListofItemsInString' contains the string 'foo'.
```javascript
knex('users').where('listItemsInString', 'like', '%foo%')
```
Add:

Create user.
```javascript
knex('users').insert(user,["Name", "Email", "Categories"])
```

Delete:

Delete user with matching id.
```javascript
knex('users').where("id", id).del()
```

Update:

Update user.(takes two: id, body)

```javascript
knex('users').where("id", id).update(body)
```
Return:

Return the result.

```javascript
knex('users').where("id", id).update(body).returning(*)
```


If you can't find the Knex query within 2 minutes, my advice is to look up the how to SQL the query, then control + F <a href="https://knexjs.org/" target="_blank">the Knex docs</a>.
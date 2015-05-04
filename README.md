# wookie-lists
Simple service for Building Microservices workshop/book club

Deployed to heroku at http://wookie-lists.herokuapp.com

(The wookie thing is because it's part of what github suggested as a repo name. Just FYI.)

## Basic API

```
GET /api/lists
GET /api/lists/:listId
POST /api/lists/ (w/ {name: listName} json body, or URL encoded version of the same)
DELETE /api/lists/:listId

PUT /api/lists/:listId/users/:userId
DELETE /api/lists/:listId/users/:userId
```

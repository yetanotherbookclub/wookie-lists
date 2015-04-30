# wookie-lists
Simple service for Building Microservices workshop/book club

(The wookie thing is because it's part of what github suggested as a repo name. Just FYI.)

## Basic API

GET /api/lists
GET /api/lists/:listId
POST /api/lists/:listName
DELETE /api/lists/:listId

PUT /api/lists/:listId/users/:userId
DELETE /api/lists/:listId/users/:userId

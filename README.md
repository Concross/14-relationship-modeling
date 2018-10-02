Mongo/Express 2 Resource API
===

## Features
  * An `express` and `mongoDB` REST API
  * includes multiple resources, `customers` and `orders` that contain a "relationship"
  * `GET`, `POST`, `PUT`, and `DELETE` routes for each resource using dynamic model finding
  * uses `populate` in the `get()` route logic to populate the associated properties between `customers` and `orders`

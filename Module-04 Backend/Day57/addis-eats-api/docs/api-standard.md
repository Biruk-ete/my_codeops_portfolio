# Addis Eats API Standards

## 1. API Overview

The Addis Eats API follows REST architectural principles and uses HTTP methods and status codes to communicate with clients.

### Base URL

All API endpoints use the following base path:

`/api/v1`

### Data Format

- Request and response bodies use JSON.
- The `Content-Type` header should be `application/json` for JSON requests.
- Resource names use plural nouns.
- Resource identifiers are included in the URL.

## 2. API Versioning

The API uses URI versioning.

The current version is `v1`.

Example:

`GET /api/v1/restaurants`

When introducing breaking changes, a new version should be created rather than unexpectedly changing the existing version.

## 3. HTTP Methods

| Method | Purpose                     |
| ------ | --------------------------- |
| GET    | Retrieve resources          |
| POST   | Create a new resource       |
| PATCH  | Partially update a resource |
| DELETE | Delete a resource           |

### Resource Examples

- `GET /api/v1/restaurants` retrieves restaurants.
- `GET /api/v1/restaurants/1` retrieves a restaurant by ID.
- `POST /api/v1/restaurants` creates a restaurant.
- `GET /api/v1/orders` retrieves orders.
- `PATCH /api/v1/orders/1/status` updates an order's status.
- `DELETE /api/v1/orders/1` deletes an order.

## 4. HTTP Status Codes

The API uses standard HTTP status codes.

| Status | Meaning               | Usage                             |
| ------ | --------------------- | --------------------------------- |
| 200    | OK                    | Successful GET or PATCH request   |
| 201    | Created               | Successful POST request           |
| 204    | No Content            | Successful DELETE request         |
| 400    | Bad Request           | Invalid input or query parameters |
| 404    | Not Found             | Requested resource does not exist |
| 500    | Internal Server Error | Unexpected server error           |

### POST Responses

Successful resource creation returns `201 Created`.

The response includes a `Location` header pointing to the newly created resource.

Example:

`Location: /api/v1/restaurants/5`

### DELETE Responses

Successful deletion returns `204 No Content`.

Repeated DELETE requests return the same status code, even when the resource has already been deleted.

## 5. Pagination

Collection endpoints support pagination using query parameters.

| Parameter | Description               | Default |
| --------- | ------------------------- | ------- |
| limit     | Maximum number of results | 20      |
| offset    | Number of results to skip | 0       |

The maximum allowed limit is 50.

Example:

`GET /api/v1/orders?limit=5&offset=10`

### Pagination Response

Collection responses use the following structure:

```json
{
  "items": [],
  "total": 25,
  "limit": 5,
  "offset": 10
}
```

- `items`: Resources returned in the current page.
- `total`: Total matching resources before pagination.
- `limit`: Maximum number of resources requested.
- `offset`: Number of matching resources skipped.

Filtering and sorting are applied before pagination.

## 6. Filtering

Filtering uses query parameters rather than separate endpoints for individual filter values.

### Restaurants

| Parameter | Example        |
| --------- | -------------- |
| area      | `?area=Bole`   |
| isOpen    | `?isOpen=true` |

Examples:

- `GET /api/v1/restaurants?area=Bole`
- `GET /api/v1/restaurants?isOpen=true`
- `GET /api/v1/restaurants?isOpen=false`

### Orders

| Parameter | Example           |
| --------- | ----------------- |
| status    | `?status=pending` |
| area      | `?area=Bole`      |

Multiple values can be separated by commas.

Examples:

- `GET /api/v1/orders?status=pending,confirmed`
- `GET /api/v1/orders?area=Bole,Kazanchis`

### Dishes

| Parameter    | Example           |
| ------------ | ----------------- |
| restaurantId | `?restaurantId=1` |

Example:

`GET /api/v1/dishes?restaurantId=1`

## 7. Sorting

Sorting uses the `sort` query parameter.

- A field without a prefix means ascending order.
- A field prefixed with `-` means descending order.

### Supported Sorting Fields

| Resource    | Fields                     |
| ----------- | -------------------------- |
| Restaurants | name, area                 |
| Orders      | customerName, area, status |
| Dishes      | name, priceSantim          |

Examples:

- `GET /api/v1/restaurants?sort=name`
- `GET /api/v1/restaurants?sort=-name`
- `GET /api/v1/orders?sort=-customerName`
- `GET /api/v1/dishes?sort=priceSantim`

## 8. Field Selection

The orders endpoint supports selecting specific response fields using the `fields` query parameter.

Example:

`GET /api/v1/orders?fields=id,customerName,status`

The response contains only the requested fields for each order.

Unsupported fields are rejected with `400 Bad Request`.

## 9. Validation and Error Handling

The API validates incoming data and query parameters.

- Invalid values return `400 Bad Request`.
- Requests for resources that do not exist return `404 Not Found`.
- Errors use a consistent JSON response structure.

Example:

```json
{
  "message": ["sort must be one of the following values"],
  "error": "Bad Request",
  "statusCode": 400
}
```

## 10. REST Design Principles

The API follows these principles:

1. Use nouns for resource names.
2. Use plural resource names, such as `restaurants`, `orders`, and `dishes`.
3. Use HTTP methods according to their intended purpose.
4. Use query parameters for filtering, sorting, and pagination.
5. Use HTTP status codes to communicate request results.
6. Keep resource URLs consistent and predictable.
7. Version the API through the URI.
8. Validate incoming requests before processing them.

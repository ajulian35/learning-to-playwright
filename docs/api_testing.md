# API Testing — Reference Guide

## 1. HTTP Verbs

| Verb | Purpose | Has Body | Idempotent | Common Status Codes |
|---|---|:---:|:---:|---|
| **GET** | Retrieve a resource or list of resources. Never modifies data. | No | Yes | 200, 404 |
| **POST** | Create a new resource. Each call may produce a new record. | Yes | No | 201, 400, 422 |
| **PUT** | Fully replace an existing resource. All fields must be sent. | Yes | Yes | 200, 404 |
| **PATCH** | Partially update an existing resource. Only send the fields to change. | Yes | No | 200, 404 |
| **DELETE** | Remove a resource. | No | Yes | 204, 404 |
| **HEAD** | Same as GET but returns only headers, no body. Used to check existence or metadata. | No | Yes | 200, 404 |
| **OPTIONS** | Describes the communication options for the target resource. Used by browsers in CORS preflight. | No | Yes | 200, 204 |

> **Idempotent** means calling the same request multiple times produces the same result.
> **Safe** means the operation does not modify data (GET, HEAD, OPTIONS are both safe and idempotent).

---

## 2. Common Status Code Groups

| Range | Meaning | Examples |
|---|---|---|
| `2xx` | Success | 200 OK, 201 Created, 204 No Content |
| `4xx` | Client error | 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 422 Unprocessable Entity |
| `5xx` | Server error | 500 Internal Server Error, 503 Service Unavailable |

---

## 3. POC — QA Automation Labs API

- **Base URL:** `https://testing.qaautomationlabs.com/api/v1`
- **API Explorer:** `https://api.qaautomationlabs.com/index.php`
- **Demo credentials:** `qa@demo.io / Password123`

---

## 4. Endpoint: List Shopping Cart — `GET /carts`

### Description
Returns a paginated list of shopping carts. Supports filtering, sorting, and full-text search via query parameters.

### Query Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `page` | integer | 1 | Page number to retrieve |
| `limit` | integer | 10 | Items per page (max: 100) |
| `sort` | string | — | Field name to sort by |
| `order` | string | — | Sort direction: `asc` or `desc` |
| `q` | string | — | Full-text search across cart fields |

### Response Structure — 200 OK

```json
{
  "data": [
    {
      "id": 1,
      "customerId": 22,
      "itemCount": 1,
      "subtotal": 125.02,
      "currency": "USD",
      "status": "active",
      "updatedAt": "2024-01-15T10:30:00Z",
      "items": [
        { "productId": 24, "quantity": 1, "unitPrice": 125.02 }
      ]
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 3,
    "totalItems": 30,
    "totalPages": 10,
    "hasNext": true,
    "hasPrev": false
  },
  "meta": {
    "requestId": "req_2a9bc101c74a6750",
    "responseTimeMs": 0.62,
    "timestamp": "2026-09-01T15:32:10+00:00",
    "apiVersion": "1.0.0"
  }
}
```

### Cart Status Values
| Status | Meaning |
|---|---|
| `active` | Cart in use, customer is still shopping |
| `converted` | Cart was checked out and became an order |
| `abandoned` | Cart was left inactive |

---

## 5. Test Strategy for `GET /carts`

| Scenario | What to validate |
|---|---|
| Happy path | Status 200, `data` is an array, `pagination` and `meta` exist |
| Pagination | `limit=5` returns exactly 5 items; `pagination.pageSize` matches |
| Page 2 | `hasPrev: true`, `page: 2` in pagination |
| Sort ascending | First item's `id` is less than second item's `id` |
| Sort descending | First item's `id` is greater than second item's `id` |
| Each cart item | `id`, `customerId`, `subtotal`, `status` are present and correct types |

---

## 6. Related Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/carts` | List all carts (paginated) |
| POST | `/carts` | Create a new cart |
| GET | `/carts/{id}` | Get a single cart by ID |
| PUT | `/carts/{id}` | Fully replace a cart |
| PATCH | `/carts/{id}` | Partially update a cart |
| DELETE | `/carts/{id}` | Delete a cart |
| POST | `/carts/bulk` | Bulk create carts |
| DELETE | `/carts/bulk` | Bulk delete carts |

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

## 3. API Authentication

Before an API processes a request, the client must prove who it is. These are the most common mechanisms:

### 3.1 API Key

A static token included in a header or query string. Simple to implement but offers no user-level identity.

```http
GET /carts
X-API-Key: abc123secret
```

| Pros | Cons |
|---|---|
| Easy to set up | No expiration by default |
| Supported everywhere | Revocation affects all callers sharing the key |

---

### 3.2 Basic Authentication

Credentials (`username:password`) encoded in Base64 and sent in the `Authorization` header. **Always requires HTTPS.**

```http
GET /carts
Authorization: Basic dXNlcjpwYXNzd29yZA==
```

| Pros | Cons |
|---|---|
| Universally supported | Password travels with every request |
| No extra protocol needed | Base64 is encoding, not encryption |

---

### 3.3 Bearer Token (JWT / OAuth 2.0)

A signed token (commonly a JWT) issued by an authorization server after login. The client sends it in the `Authorization` header.

```http
POST /auth/login          → returns { "token": "eyJ..." }

GET /carts
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

| Pros | Cons |
|---|---|
| Short-lived; expires automatically | Requires a login step to obtain the token |
| Carries claims (userId, roles) | Token revocation before expiry is non-trivial |
| Standard across REST and GraphQL APIs | |

A JWT has three Base64-encoded parts separated by dots: **Header . Payload . Signature**.

---

### 3.4 OAuth 2.0 (Authorization Code Flow)

A delegation protocol where the user grants a third-party app limited access to their account without sharing their password. Common in social login and integrations.

```
User → App → Auth Server (login + consent) → Auth Server issues code
App exchanges code for Access Token → App calls API with token
```

| Pros | Cons |
|---|---|
| User never shares password with the app | More complex to implement |
| Scoped permissions (read-only, etc.) | Requires an auth server |
| Tokens can be refreshed | |

---

### 3.5 API Key in Query String

Some public or legacy APIs accept the key as a URL parameter instead of a header.

```http
GET /carts?api_key=abc123secret
```

> Avoid this pattern in production — URLs are logged by proxies and browser history.

---

### 3.6 Quick Comparison

| Method | Where credential travels | Expiration | Best for |
|---|---|---|---|
| API Key (header) | `X-API-Key` header | Usually none | Server-to-server, simple integrations |
| Basic Auth | `Authorization` header | None | Internal tools, quick prototypes |
| Bearer / JWT | `Authorization` header | Yes (configurable) | Modern REST APIs, mobile, SPAs |
| OAuth 2.0 | `Authorization` header | Yes + refresh token | Third-party access, social login |
| API Key (query) | URL parameter | Usually none | Legacy public APIs (avoid in new work) |
| JSON body login | Request body (`email` + `password`) | No — issues a token | Obtaining a Bearer/JWT from a REST login endpoint (`POST /auth/login`) |
| Token refresh (body) | Request body (`refreshToken`) | Yes — issues a new `accessToken` | Renewing an expired token without re-login (`POST /auth/refresh`) |

---

## 4. POC — QA Automation Labs API

- **Base URL:** `https://testing.qaautomationlabs.com/api/v1`
- **API Explorer:** `https://api.qaautomationlabs.com/index.php`
- **Demo credentials:** `qa@demo.io / Password123`

---

## 5. Endpoint: List Shopping Cart — `GET /carts`

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

## 6. Test Strategy for `GET /carts`

| Scenario | What to validate |
|---|---|
| Happy path | Status 200, `data` is an array, `pagination` and `meta` exist |
| Pagination | `limit=5` returns exactly 5 items; `pagination.pageSize` matches |
| Page 2 | `hasPrev: true`, `page: 2` in pagination |
| Sort ascending | First item's `id` is less than second item's `id` |
| Sort descending | First item's `id` is greater than second item's `id` |
| Each cart item | `id`, `customerId`, `subtotal`, `status` are present and correct types |

---

## 7. Related Endpoints

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

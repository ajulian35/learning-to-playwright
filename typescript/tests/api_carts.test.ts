// =============================================================================
// MODULE 3 — API Tests: Shopping Cart
// Base: https://testing.qaautomationlabs.com/api/v1/carts
// Verbs covered: GET (list), GET /{id}, POST, PATCH, DELETE
// =============================================================================

import { test, expect } from '@playwright/test';

const BASE_URL = 'https://testing.qaautomationlabs.com/api/v1';


// --- Type definitions for the response shape ---

interface CartItem {
    productId: number;
    quantity:  number;
    unitPrice: number;
}

interface Cart {
    id:         number;
    customerId: number;
    itemCount:  number;
    subtotal:   number;
    currency:   string;
    status:     string;
    updatedAt:  string;
    items:      CartItem[];
}

interface Pagination {
    page:       number;
    pageSize:   number;
    totalItems: number;
    totalPages: number;
    hasNext:    boolean;
    hasPrev:    boolean;
}

interface Meta {
    requestId:      string;
    responseTimeMs: number;
    timestamp:      string;
    apiVersion:     string;
}

interface CartsResponse {
    data:       Cart[];
    pagination: Pagination;
    meta:       Meta;
}

interface CartResponse {
    data: Cart;
    meta: Meta;
}


// =============================================================================
// Tests
// =============================================================================

test.describe('GET /carts — List Shopping Cart', () => {

    // -------------------------------------------------------------------------
    // Happy path: status, top-level structure, and field types
    // -------------------------------------------------------------------------
    test('returns 200 with data, pagination, and meta', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/carts`);

        expect(response.status()).toBe(200);

        const body: CartsResponse = await response.json();
        console.log(body);
        expect(body).toHaveProperty('data');
        expect(body).toHaveProperty('pagination');
        expect(body).toHaveProperty('meta');

        expect(Array.isArray(body.data)).toBe(true);
        expect(body.data.length).toBeGreaterThan(0);
    });

    // -------------------------------------------------------------------------
    // Cart item shape: each cart has the expected fields with correct types
    // -------------------------------------------------------------------------
    test('each cart has the expected fields and types', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/carts?limit=5`);
        const body: CartsResponse = await response.json();

        for (const cart of body.data) {
            expect(typeof cart.id).toBe('number');
            expect(typeof cart.customerId).toBe('number');
            expect(typeof cart.itemCount).toBe('number');
            expect(typeof cart.subtotal).toBe('number');
            expect(typeof cart.currency).toBe('string');
            expect(typeof cart.status).toBe('string');
            expect(typeof cart.updatedAt).toBe('string');
            expect(Array.isArray(cart.items)).toBe(true);
        }
    });

    // -------------------------------------------------------------------------
    // Pagination: limit param controls how many records are returned
    // -------------------------------------------------------------------------
    test('limit param controls the number of results', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/carts?limit=5`);
        const body: CartsResponse = await response.json();

        expect(body.data.length).toBe(5);
        expect(body.pagination.pageSize).toBe(5);
    });

    // -------------------------------------------------------------------------
    // Pagination: page 2 marks hasPrev as true
    // -------------------------------------------------------------------------
    test('page 2 has hasPrev true and hasPrev false on page 1', async ({ request }) => {
        const page1 = await (await request.get(`${BASE_URL}/carts?page=1&limit=5`)).json() as CartsResponse;
        const page2 = await (await request.get(`${BASE_URL}/carts?page=2&limit=5`)).json() as CartsResponse;

        expect(page1.pagination.hasPrev).toBe(false);
        expect(page1.pagination.hasNext).toBe(true);

        expect(page2.pagination.hasPrev).toBe(true);
        expect(page2.pagination.page).toBe(2);
    });

    // -------------------------------------------------------------------------
    // Sorting: order=asc returns ids in ascending order
    // -------------------------------------------------------------------------
    test('order=asc returns carts sorted by id ascending', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/carts?sort=id&order=asc&limit=5`);
        const body: CartsResponse = await response.json();

        const ids = body.data.map(c => c.id);
        const sorted = [...ids].sort((a, b) => a - b);
        expect(ids).toEqual(sorted);
    });

    // -------------------------------------------------------------------------
    // Sorting: order=desc returns ids in descending order
    // -------------------------------------------------------------------------
    test('order=desc returns carts sorted by id descending', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/carts?sort=id&order=desc&limit=5`);
        const body: CartsResponse = await response.json();

        const ids = body.data.map(c => c.id);
        const sorted = [...ids].sort((a, b) => b - a);
        expect(ids).toEqual(sorted);
    });

    // -------------------------------------------------------------------------
    // Meta: response includes request metadata
    // -------------------------------------------------------------------------
    test('meta contains requestId, timestamp, and apiVersion', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/carts`);
        const body: CartsResponse = await response.json();

        expect(typeof body.meta.requestId).toBe('string');
        expect(body.meta.requestId.length).toBeGreaterThan(0);
        expect(typeof body.meta.timestamp).toBe('string');
        expect(body.meta.apiVersion).toBe('1.0.0');
    });

    // -------------------------------------------------------------------------
    // Items inside each cart: productId, quantity, and unitPrice are numbers
    // -------------------------------------------------------------------------
    test('cart items have productId, quantity, and unitPrice as numbers', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/carts?limit=10`);
        const body: CartsResponse = await response.json();

        const cartsWithItems = body.data.filter(c => c.items.length > 0);
        expect(cartsWithItems.length).toBeGreaterThan(0);

        for (const cart of cartsWithItems) {
            for (const item of cart.items) {
                expect(typeof item.productId).toBe('number');
                expect(typeof item.quantity).toBe('number');
                expect(typeof item.unitPrice).toBe('number');
                expect(item.quantity).toBeGreaterThan(0);
                expect(item.unitPrice).toBeGreaterThan(0);
            }
        }
    });
});


// =============================================================================
// GET /carts/{id} — Get a single cart by ID
// =============================================================================

test.describe('GET /carts/{id} — Get Cart by ID', () => {

    test('200 - returns cart for an existing id', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/carts/1`);

        expect(response.status()).toBe(200);

        const body: CartResponse = await response.json();
        expect(typeof body.data.id).toBe('number');
        expect(body.data.id).toBe(1);
        expect(typeof body.data.customerId).toBe('number');
        expect(typeof body.data.status).toBe('string');
        expect(Array.isArray(body.data.items)).toBe(true);
    });

    test('404 - returns not found for a non-existent id', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/carts/999999`);

        expect(response.status()).toBe(404);
    });
});


// =============================================================================
// POST /carts — Create a new cart
// =============================================================================

test.describe('POST /carts — Create Cart', () => {

    test('201 - creates a new cart and returns it', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/carts`, {
            data: {
                customerId: 7,
                items: [
                    { productId: 3, quantity: 2, unitPrice: 49.99 }
                ]
            }
        });

        expect(response.status()).toBe(201);

        const body: CartResponse = await response.json();
        expect(typeof body.data.id).toBe('number');
        expect(body.data.customerId).toBe(7);
    });

    test('422 - returns validation error when body is missing', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/carts`, {
            headers: { 'Content-Type': 'application/json' }
        });

        expect(response.status()).toBe(422);
    });
});


// =============================================================================
// PATCH /carts/{id} — Partially update a cart
// =============================================================================

test.describe('PATCH /carts/{id} — Update Cart', () => {

    test('200 - partially updates the status of an existing cart', async ({ request }) => {
        const response = await request.patch(`${BASE_URL}/carts/1`, {
            data: { status: 'abandoned' }
        });

        expect(response.status()).toBe(200);

        const body: CartResponse = await response.json();
        expect(typeof body.data.id).toBe('number');
        expect(body.data.status).toBe('abandoned');
    });

    test('404 - returns not found for a non-existent id', async ({ request }) => {
        const response = await request.patch(`${BASE_URL}/carts/999999`, {
            data: { status: 'abandoned' }
        });

        expect(response.status()).toBe(404);
    });
});


// =============================================================================
// PUT /carts/{id} — Fully replace a cart
// Difference vs PATCH: PUT sends ALL fields (full replacement).
//                      PATCH sends only the fields to change (partial update).
// =============================================================================

test.describe('PUT /carts/{id} — Replace Cart', () => {

    test('200 - fully replaces an existing cart with all fields', async ({ request }) => {
        const response = await request.put(`${BASE_URL}/carts/1`, {
            data: {
                customerId: 10,
                status:     'active',
                currency:   'USD',
                items:      [{ productId: 5, quantity: 1, unitPrice: 99.99 }]
            }
        });

        expect(response.status()).toBe(200);

        const body: CartResponse = await response.json();
        expect(typeof body.data.id).toBe('number');
        expect(body.data.customerId).toBe(10);
        expect(body.data.status).toBe('active');
    });

    test('404 - returns not found for a non-existent id', async ({ request }) => {
        const response = await request.put(`${BASE_URL}/carts/999999`, {
            data: {
                customerId: 10,
                status:     'active',
                currency:   'USD',
                items:      []
            }
        });

        expect(response.status()).toBe(404);
    });
});


// =============================================================================
// DELETE /carts/{id} — Delete a cart
// =============================================================================

test.describe('DELETE /carts/{id} — Delete Cart', () => {

    test('204 - deletes an existing cart and returns no content', async ({ request }) => {
        // The demo API simulates mutations without persisting them, so we use an
        // existing dataset ID. The data is never actually removed.
        const response = await request.delete(`${BASE_URL}/carts/1`);
        expect(response.status()).toBe(204);
    });

    test('404 - returns not found for a non-existent id', async ({ request }) => {
        const response = await request.delete(`${BASE_URL}/carts/999999`);

        expect(response.status()).toBe(404);
    });
});


// =============================================================================
// AUTH — Authentication endpoints
// Maps to section 3.6 Quick Comparison (docs/api_testing.md):
//   POST /auth/login   → JSON body login      — email+password in JSON body, no Authorization header
//   GET  /auth/me      → Bearer / JWT         — Authorization header, token has expiration
//   POST /auth/refresh → Token refresh (body) — refreshToken in JSON body, issues new accessToken
//   POST /auth/logout  → Bearer / JWT         — Authorization header required to revoke session
// =============================================================================

// --- Auth type definitions ---

interface AuthUser {
    id:    number;
    email: string;
    name:  string;
    role:  string;
}

interface LoginData {
    tokenType:    string;
    accessToken:  string;
    refreshToken: string;
    expiresIn:    number;
    user:         AuthUser;
}

interface LoginResponse {
    data: LoginData;
    meta: Meta;
}

interface MeData {
    id:             number;
    email:          string;
    role:           string;
    tokenExpiresAt: string;
}

interface MeResponse {
    data: MeData;
    meta: Meta;
}

interface RefreshData {
    tokenType:   string;
    accessToken: string;
    expiresIn:   number;
}

interface RefreshResponse {
    data: RefreshData;
    meta: Meta;
}

interface LogoutResponse {
    data: { message: string };
    meta: Meta;
}


// =============================================================================
// POST /auth/login
// Auth method (§3.6): JSON body login
// Credential travels: request body { email, password } — no Authorization header on this call
// Result: server validates credentials and issues tokenType:"Bearer" + refreshToken
// Expiration: accessToken 3600 s | refreshToken longer-lived
// =============================================================================

test.describe('POST /auth/login', () => {

    test('200 - valid credentials return tokenType, accessToken, refreshToken, expiresIn and user', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/auth/login`, {
            data: { email: 'qa@demo.io', password: 'Password123' }
        });

        expect(response.status()).toBe(200);

        const body: LoginResponse = await response.json();

        expect(body.data.tokenType).toBe('Bearer');
        expect(typeof body.data.accessToken).toBe('string');
        expect(body.data.accessToken.length).toBeGreaterThan(0);
        expect(typeof body.data.refreshToken).toBe('string');
        expect(body.data.refreshToken.length).toBeGreaterThan(0);
        expect(body.data.expiresIn).toBe(3600);

        expect(typeof body.data.user.id).toBe('number');
        expect(body.data.user.email).toBe('qa@demo.io');
        expect(typeof body.data.user.name).toBe('string');
        expect(typeof body.data.user.role).toBe('string');

        expect(typeof body.meta.requestId).toBe('string');
        expect(body.meta.apiVersion).toBe('1.0.0');
    });

    test('401 - invalid credentials return INVALID_CREDENTIALS error', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/auth/login`, {
            data: { email: 'wrong@demo.io', password: 'WrongPass' }
        });

        expect(response.status()).toBe(401);

        const body = await response.json();
        expect(body.error.code).toBe('INVALID_CREDENTIALS');
        expect(body.error.status).toBe(401);
        expect(typeof body.error.message).toBe('string');
    });
});


// =============================================================================
// GET /auth/me  (Bearer token required)
// Auth method (§3.6): Bearer / JWT
// Credential travels: Authorization header  →  "Authorization: Bearer <token>"
// Expiration: yes — tokenExpiresAt returned in response body
// =============================================================================

test.describe('GET /auth/me — Current user profile', () => {

    test('200 - valid Bearer token returns authenticated user profile', async ({ request }) => {
        const loginRes = await request.post(`${BASE_URL}/auth/login`, {
            data: { email: 'qa@demo.io', password: 'Password123' }
        });
        const { data: { accessToken } }: LoginResponse = await loginRes.json();

        const response = await request.get(`${BASE_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        expect(response.status()).toBe(200);

        const body: MeResponse = await response.json();
        expect(typeof body.data.id).toBe('number');
        expect(body.data.email).toBe('qa@demo.io');
        expect(typeof body.data.role).toBe('string');
        expect(typeof body.data.tokenExpiresAt).toBe('string');
    });

    test('401 - request without Authorization header is rejected', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/auth/me`);

        expect(response.status()).toBe(401);
    });
});


// =============================================================================
// POST /auth/refresh  — Exchange refresh token for a new access token
// Auth method (§3.6): Token refresh (body)
// Credential travels: request body { refreshToken } — no Authorization header on this call
// Result: server issues a new accessToken without requiring re-login
// Expiration: new accessToken 3600 s
// =============================================================================

test.describe('POST /auth/refresh', () => {

    test('200 - valid refresh token returns a new access token', async ({ request }) => {
        const loginRes = await request.post(`${BASE_URL}/auth/login`, {
            data: { email: 'qa@demo.io', password: 'Password123' }
        });
        const { data: { refreshToken } }: LoginResponse = await loginRes.json();

        const response = await request.post(`${BASE_URL}/auth/refresh`, {
            data: { refreshToken }
        });

        expect(response.status()).toBe(200);

        const body: RefreshResponse = await response.json();
        expect(body.data.tokenType).toBe('Bearer');
        expect(typeof body.data.accessToken).toBe('string');
        expect(body.data.accessToken.length).toBeGreaterThan(0);
        expect(body.data.expiresIn).toBe(3600);
    });
});


// =============================================================================
// POST /auth/logout  (Bearer token required)
// Auth method (§3.6): Bearer / JWT
// Credential travels: Authorization header  →  "Authorization: Bearer <token>"
// Note: JWT is stateless; server signals "discard tokens client-side"
// =============================================================================

test.describe('POST /auth/logout', () => {

    test('200 - valid token returns logout confirmation message', async ({ request }) => {
        const loginRes = await request.post(`${BASE_URL}/auth/login`, {
            data: { email: 'qa@demo.io', password: 'Password123' }
        });
        const { data: { accessToken } }: LoginResponse = await loginRes.json();

        const response = await request.post(`${BASE_URL}/auth/logout`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        expect(response.status()).toBe(200);

        const body: LogoutResponse = await response.json();
        expect(typeof body.data.message).toBe('string');
        expect(body.data.message.length).toBeGreaterThan(0);
    });
});

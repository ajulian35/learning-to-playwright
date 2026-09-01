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

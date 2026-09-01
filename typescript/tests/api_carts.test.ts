// =============================================================================
// MODULE 3 — API Test: List Shopping Cart
// Endpoint: GET https://testing.qaautomationlabs.com/api/v1/carts
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

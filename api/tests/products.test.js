const assert = require('assert');
const axios = require('axios');

const BASE_URL = 'http://localhost:5800/api';

let createdProductId = null; // Store product ID for update and delete tests

/* Test: Get All Products */
async function testGetAllProducts() {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    assert.strictEqual(response.status, 200, 'Expected status code 200');
    assert.ok(
      Array.isArray(response.data.data),
      'Expected response to be an array'
    );
    console.log('GET /products passed');
  } catch (error) {
    console.error('GET /products failed:', error.message);
  }
}

/* Test: Create Product */
async function testCreateProduct() {
  try {
    const productData = {
      name: 'Test Product',
      price: 100,
      quantity: 10,
      description: 'This is a test product',
    };

    const response = await axios.post(`${BASE_URL}/products`, productData);

    assert.strictEqual(response.status, 200, 'Expected status code 200');
    assert.strictEqual(
      response.data.success,
      true,
      'Expected success to be true'
    );
    assert.ok(response.data.data._id, 'Expected product to have an ID');

    createdProductId = response.data.data._id; // Save ID for further testing
    console.log('POST /products passed');
  } catch (error) {
    console.error('POST /products failed:', error.message);
  }
}

/* Test: Get Single Product */
async function testGetProduct() {
  try {
    if (!createdProductId) throw new Error('No product ID found for testing');

    const response = await axios.get(
      `${BASE_URL}/products/${createdProductId}`
    );

    assert.strictEqual(response.status, 200, 'Expected status code 200');
    assert.strictEqual(
      response.data.success,
      true,
      'Expected success to be true'
    );
    assert.strictEqual(
      response.data.data._id,
      createdProductId,
      'Expected correct product ID'
    );

    console.log('GET /products/:id passed');
  } catch (error) {
    console.error('GET /products/:id failed:', error.message);
  }
}

/* Test: Update Product */
async function testUpdateProduct() {
  try {
    if (!createdProductId) throw new Error('No product ID found for testing');

    const updatedData = {
      name: 'Updated Product',
      price: 120,
      quantity: 15,
      description: 'Updated description',
    };

    const response = await axios.put(
      `${BASE_URL}/products/${createdProductId}`,
      updatedData
    );

    assert.strictEqual(response.status, 200, 'Expected status code 200');
    assert.strictEqual(
      response.data.success,
      true,
      'Expected success to be true'
    );
    assert.strictEqual(
      response.data.data.name,
      updatedData.name,
      'Expected updated name'
    );

    console.log('PUT /products/:id passed');
  } catch (error) {
    console.error('PUT /products/:id failed:', error.message);
  }
}

/* Test: Delete Product */
async function testDeleteProduct() {
  try {
    if (!createdProductId) throw new Error('No product ID found for testing');

    const response = await axios.delete(
      `${BASE_URL}/products/${createdProductId}`
    );

    assert.strictEqual(response.status, 200, 'Expected status code 200');
    assert.strictEqual(
      response.data.success,
      true,
      'Expected success to be true'
    );
    console.log('DELETE /products/:id passed');
  } catch (error) {
    console.error('DELETE /products/:id failed:', error.message);
  }
}

/* Run all tests sequentially */
(async () => {
  await testGetAllProducts();
  await testCreateProduct();
  await testGetProduct();
  await testUpdateProduct();
  await testDeleteProduct();
})();

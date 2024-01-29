const request = require('supertest');
const app = require('../../server');
const newProduct = require('../data/new-product.json');

let firstProduct;

test('POST /api/products', async () => {
  const response = await request(app).post('/api/products').send(newProduct);

  expect(response.statusCode).toBe(201);
  expect(response.body.name).toBe(newProduct.name);
  expect(response.body.description).toBe(newProduct.description);
});

test('it should return, 500 response status code on POST /api/products', async () => {
  const response = await request(app)
    .post('/api/products')
    .send({ name: 'Apple Airpods' });

  expect(response.statusCode).toBe(500);
  expect(response.body).toStrictEqual({
    message:
      'Product validation failed: description: Path `description` is required.',
  });
});

test('GET /api/products', async () => {
  const response = await request(app).get('/api/products');

  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body)).toBeTruthy();
  expect(response.body[0].name).toBeDefined();
  expect(response.body[0].description).toBeDefined();
  firstProduct = response.body[0];
});

test('GET /api/products/:productId', async () => {
  const response = await request(app).get('/api/products/' + firstProduct._id);

  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe(firstProduct.name);
  expect(response.body.description).toBe(firstProduct.description);
});

test('it should return, 404 response status code on GET /api/products/:productId', async () => {
  const response = await request(app).get(
    '/api/products/65a3830fb689c538b82233ce'
  );

  expect(response.statusCode).toBe(404);
});

test('PUT /api/products/:productId', async () => {
  const response = await request(app)
    .put('/api/products/' + firstProduct._id)
    .send({ name: 'updated name', description: 'updated description' });

  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe('updated name');
  expect(response.body.description).toBe('updated description');
});

test('DELETE /api/products/:productId', async () => {
  const response = await request(app)
    .get('/api/products/' + firstProduct._id)
    .send();

  expect(response.statusCode).toBe(200);
});

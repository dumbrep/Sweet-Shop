const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/User');
const Sweet = require('../src/models/Sweet');

let authToken;
let adminToken;
let testSweet;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sweet-shop-test');
  
  await User.deleteMany({});
  await Sweet.deleteMany({});

  const userRes = await request(app)
    .post('/api/auth/register')
    .send({
      username: 'testuser',
      email: 'user@test.com',
      password: 'password123'
    });
  authToken = userRes.body.token;

  const adminRes = await request(app)
    .post('/api/auth/register')
    .send({
      username: 'admin',
      email: 'admin@test.com',
      password: 'password123',
      role: 'admin'
    });
  adminToken = adminRes.body.token;
});

afterAll(async () => {
  await User.deleteMany({});
  await Sweet.deleteMany({});
  await mongoose.connection.close();
});

describe('Sweets API Tests', () => {
  describe('POST /api/sweets', () => {
    it('should create a new sweet', async () => {
      const res = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Chocolate Bar',
          category: 'chocolate',
          price: 2.5,
          quantity: 100,
          description: 'Delicious chocolate'
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.sweet).toHaveProperty('name', 'Chocolate Bar');
      testSweet = res.body.sweet;
    });

    it('should require authentication', async () => {
      const res = await request(app)
        .post('/api/sweets')
        .send({
          name: 'Candy',
          category: 'candy',
          price: 1.5,
          quantity: 50
        });

      expect(res.statusCode).toBe(401);
    });
  });

  describe('GET /api/sweets', () => {
    it('should get all sweets', async () => {
      const res = await request(app)
        .get('/api/sweets')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('sweets');
    });
  });

  describe('GET /api/sweets/search', () => {
    it('should search sweets by name', async () => {
      const res = await request(app)
        .get('/api/sweets/search?name=Chocolate')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.sweets.length).toBeGreaterThan(0);
    });
  });

  describe('POST /api/sweets/:id/purchase', () => {
    it('should purchase a sweet', async () => {
      const res = await request(app)
        .post(`/api/sweets/${testSweet._id}/purchase`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ quantity: 5 });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('purchased', 5);
    });
  });

  describe('POST /api/sweets/:id/restock', () => {
    it('should restock a sweet (admin only)', async () => {
      const res = await request(app)
        .post(`/api/sweets/${testSweet._id}/restock`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ quantity: 50 });

      expect(res.statusCode).toBe(200);
    });

    it('should not allow non-admin to restock', async () => {
      const res = await request(app)
        .post(`/api/sweets/${testSweet._id}/restock`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ quantity: 50 });

      expect(res.statusCode).toBe(403);
    });
  });

  describe('DELETE /api/sweets/:id', () => {
    it('should delete a sweet (admin only)', async () => {
      const res = await request(app)
        .delete(`/api/sweets/${testSweet._id}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toBe(200);
    });
  });
});
const request = require('supertest');
const { expect } = require('chai');
const app = require('../server');

describe('User Routes', () => {
  describe('GET /', () => {
    it('should get all users', (done) => {
      request(app)
        .get('/')
        .set('Authorization', 'Bearer your_token_here') // Reemplaza con un token válido
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('GET /:id', () => {
    it('should get a user by ID', (done) => {
      request(app)
        .get('/1') // Reemplaza con un ID válido
        .set('Authorization', 'Bearer your_token_here') // Reemplaza con un token válido
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('id', 1); // Reemplaza con el ID esperado
          done();
        });
    });

    it('should return an error for an invalid user ID', (done) => {
      request(app)
        .get('/9999') // Asumiendo que 9999 es un ID inválido
        .set('Authorization', 'Bearer your_token_here') // Reemplaza con un token válido
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('message', 'User not found');
          done();
        });
    });
  });

  describe('POST /create_token_hedera', () => {
    it('should create a new token on Hedera', (done) => {
      request(app)
        .post('/create_token_hedera')
        .set('Authorization', 'Bearer your_token_here') // Reemplaza con un token válido
        .send({ name: 'Test Token', symbol: 'TT', initialSupply: 1000, userId: 1 }) // Reemplaza con datos válidos
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('message', 'Token created successfully');
          expect(res.body).to.have.property('tokenId');
          done();
        });
    });

    it('should return an error for missing fields', (done) => {
      request(app)
        .post('/create_token_hedera')
        .set('Authorization', 'Bearer your_token_here') // Reemplaza con un token válido
        .send({ name: 'Test Token' }) // Faltan campos obligatorios
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('message');
          done();
        });
    });
  });

  describe('GET /users_tokens', () => {
    it('should get all user tokens', (done) => {
      request(app)
        .get('/users_tokens')
        .set('Authorization', 'Bearer your_token_here') // Reemplaza con un token válido
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });
});
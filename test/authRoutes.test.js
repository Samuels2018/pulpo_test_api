import request from 'supertest';
import { expect } from 'chai';
import app from '../server'; // Asegúrate de que la ruta sea correcta

describe('Auth Routes', () => {
  describe('POST /login', () => {
    it('should login a user with valid credentials', (done) => {
      request(app)
        .post('/login')
        .send({ email: 'test@example.com', password: 'password123' })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('token');
          done();
        });
    });

    it('should return an error for invalid credentials', (done) => {
      request(app)
        .post('/login')
        .send({ email: 'test@example.com', password: 'wrongpassword' })
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('message', 'Invalid email or password');
          done();
        });
    });
  });

  describe('POST /register', () => {
    it('should register a new user', (done) => {
      request(app)
        .post('/register')
        .send({ email: 'newuser@example.com', password: 'password123', userName: 'newuser' })
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('message', 'User created successfully');
          done();
        });
    });

    it('should return an error for missing fields', (done) => {
      request(app)
        .post('/register')
        .send({ email: 'newuser@example.com' }) // Missing password and userName
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('message');
          done();
        });
    });
  });

  describe('PUT /change-password/:id', () => {
    it('should change the password for a user', (done) => {
      request(app)
        .put('/change-password/1')
        .send({ password: 'newpassword123' })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('message', 'Password updated successfully');
          done();
        });
    });

    it('should return an error for invalid user ID', (done) => {
      request(app)
        .put('/change-password/9999') // Assuming 9999 is an invalid user ID
        .send({ password: 'newpassword123' })
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('message', 'User not found');
          done();
        });
    });
  });
});
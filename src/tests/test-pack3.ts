import request from 'supertest';
import assert from 'assert';
import http from 'http';
import { validate } from 'uuid';

export const test3_method = function (app: http.Server) {
  describe('Test main requests', () => {
    const user = {
      username: 'Boris',
      age: 25,
      hobbies: ['painting', 'travel', 'reading']
    };

    let updateId: string;

    it('Get empty list of users', (done) => {
      request(app).get('/api/users').expect('Content-Type', /json/).expect(200).expect([]).end(done);
    });
    it('Add new user', (done) => {
      request(app)
        .post('/api/users')
        .send(user)
        .expect('Content-Type', /json/)
        .expect(201)
        .expect((response) => {
          assert.deepEqual(response.body, {
            id: response.body.id,
            username: 'Boris',
            age: 25,
            hobbies: ['painting', 'travel', 'reading']
          });
          assert.ok(validate(response.body.id));
          updateId = response.body.id;
        })
        .end(done);
    });
    it('Update username of user by id', (done) => {
      request(app)
        .put(`/api/users/${updateId}`)
        .send({ username: 'Anna' })
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((response) => {
          assert.deepEqual(response.body, {
            id: response.body.id,
            username: 'Anna',
            age: 25,
            hobbies: ['painting', 'travel', 'reading']
          });
        })
        .end(done);
    });
    it('Update age of user by id', (done) => {
      request(app)
        .put(`/api/users/${updateId}`)
        .send({ age: 34 })
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((response) => {
          assert.deepEqual(response.body, {
            id: response.body.id,
            username: 'Anna',
            age: 34,
            hobbies: ['painting', 'travel', 'reading']
          });
        })
        .end(done);
    });
    it('Get list of users', (done) => {
      request(app)
        .get('/api/users')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((response) => {
          assert.ok(response.body.length === 1);
        })
        .end(done);
    });
  });
};

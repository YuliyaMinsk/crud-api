import request from 'supertest';
import assert from 'assert';
import { validate } from 'uuid';
import http from 'http';

export const test1_method = function (app: http.Server) {
  describe('Test main requests', () => {
    const user = {
      username: 'Boris',
      age: 25,
      hobbies: ['painting', 'travel', 'reading']
    };

    const userToChange = {
      username: 'Anna',
      age: 21,
      hobbies: ['painting']
    };

    let checkId: string;

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
          checkId = response.body.id;
        })
        .end(done);
    });
    it('Get new user by id', (done) => {
      request(app)
        .get(`/api/users/${checkId}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((response) => {
          assert.deepEqual(response.body, {
            id: response.body.id,
            username: 'Boris',
            age: 25,
            hobbies: ['painting', 'travel', 'reading']
          });
        })
        .end(done);
    });
    it('Update new user by id', (done) => {
      request(app)
        .put(`/api/users/${checkId}`)
        .send(userToChange)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((response) => {
          assert.deepEqual(response.body, {
            id: response.body.id,
            username: 'Anna',
            age: 21,
            hobbies: ['painting']
          });
          assert.ok(validate(response.body.id));
        })
        .end(done);
    });
    it('Get updated user by id', (done) => {
      request(app)
        .get(`/api/users/${checkId}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((response) => {
          assert.deepEqual(response.body, {
            id: response.body.id,
            username: 'Anna',
            age: 21,
            hobbies: ['painting']
          });
        })
        .end(done);
    });
    it('Delete new user', (done) => {
      request(app).delete(`/api/users/${checkId}`).expect('Content-Type', /json/).expect(204).end(done);
    });
    it('Get empty list of users', (done) => {
      request(app).get('/api/users').expect('Content-Type', /json/).expect(200).expect([]).end(done);
    });
  });
};

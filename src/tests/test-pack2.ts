import request from 'supertest';
import assert from 'assert';
import { validate } from 'uuid';
import http from 'http';

export const test2_method = function (app: http.Server) {
  describe('Create several users', () => {
    const user1 = {
      username: 'Boris',
      age: 25,
      hobbies: ['programing', 'reading']
    };

    const user2 = {
      username: 'Anna',
      age: 22,
      hobbies: ['painting', 'travel']
    };

    const user3 = {
      username: 'Yuliya',
      age: 27,
      hobbies: ['reading']
    };

    let deleteID1: string;
    let deleteID2: string;
    let deleteID3: string;

    it('Get empty list of users', (done) => {
      request(app).get('/api/users').expect('Content-Type', /json/).expect(200).expect([]).end(done);
    });
    it('Add user1', (done) => {
      request(app)
        .post('/api/users')
        .send(user1)
        .expect('Content-Type', /json/)
        .expect(201)
        .expect((response) => {
          assert.deepEqual(response.body, {
            id: response.body.id,
            username: 'Boris',
            age: 25,
            hobbies: ['programing', 'reading']
          });
          assert.ok(validate(response.body.id));
          deleteID1 = response.body.id;
        })
        .end(done);
    });
    it('Add user2', (done) => {
      request(app)
        .post('/api/users')
        .send(user2)
        .expect('Content-Type', /json/)
        .expect(201)
        .expect((response) => {
          assert.deepEqual(response.body, {
            id: response.body.id,
            username: 'Anna',
            age: 22,
            hobbies: ['painting', 'travel']
          });
          assert.ok(validate(response.body.id));
          deleteID2 = response.body.id;
        })
        .end(done);
    });
    it('Add user3', (done) => {
      request(app)
        .post('/api/users')
        .send(user3)
        .expect('Content-Type', /json/)
        .expect(201)
        .expect((response) => {
          assert.deepEqual(response.body, {
            id: response.body.id,
            username: 'Yuliya',
            age: 27,
            hobbies: ['reading']
          });
          assert.ok(validate(response.body.id));
          deleteID3 = response.body.id;
        })
        .end(done);
    });
    it('Delete user3', (done) => {
      request(app).delete(`/api/users/${deleteID3}`).expect('Content-Type', /json/).expect(204).end(done);
    });
    it('Get updated list of users', (done) => {
      request(app)
        .get('/api/users')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((response) => {
          assert.ok(response.body.length === 2);
        })
        .end(done);
    });
    it('Delete user2', (done) => {
      request(app).delete(`/api/users/${deleteID2}`).expect('Content-Type', /json/).expect(204).end(done);
    });
    it('Delete user1', (done) => {
      request(app).delete(`/api/users/${deleteID1}`).expect('Content-Type', /json/).expect(204).end(done);
    });
  });
};

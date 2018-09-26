import superagent from 'superagent';
import mongoose, { mongo } from 'mongoose';

describe('API CRUD operations', () => {

  const basePath = 'http://localhost:3000/api/v1';

  beforeAll(() => {
    mongoose.connect(`${process.env.MONGODB_URI}`);
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  test('should respond with 200 for a POST request', () => {
    return superagent.post(`${basePath}/customers`)
      .accept('application/json')
      .then(res => {
        expect(res.status).toBe(200);
      });
  });

  test('should respond with 404 for a bad POST request', () => {
    return superagent.post(`${basePath}/badPath`)
      .then(res => { })
      .catch(err => expect(err.status).toBe(404));
  });

  test('should respond with a valid _id for POST request', () => {
    return superagent.post(`${basePath}/customers`)
      .then(res => {
        expect(res.body._id).toBeDefined();
      });
  });

  test('should respond with 200 for a GET request', () => {
    return superagent.get(`${basePath}/customers/1`)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.id).toBe('1');
      })
      .catch(err => console.error(err));
  });

  test('should respond with 200 for a DELETE request', () => {
    return superagent.delete(`${basePath}/customers/1`)
      .then(res => {
        expect(res.status).toBe(200);
      });
  });

  test('should respond with 200 for a PUT request', () => {
    return superagent.put(`${basePath}/customers/1`)
      .then(res => {
        expect(res.status).toBe(200);
      });
  });

});
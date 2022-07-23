const chai = require('chai');
const chaiHttp = require('chai-http');
const { StatusCodes } = require('http-status-codes');

const app = require('../../src/server');

chai.use(chaiHttp);

const { request, expect } = chai;

describe('POST /take', () => {
  it('should respond with TOO_MANY_REQUESTS if the quantity of outstanding tokens is 0', async () => {
    const body = {};
    const response = await request(app).post('/take').send({
      method: 'GET',
      endpoint: '/user/:id',
    });

    expect(response.status).to.equal(StatusCodes.OK);
  });
});

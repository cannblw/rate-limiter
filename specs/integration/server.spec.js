const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { StatusCodes } = require('http-status-codes');

const { rateLimitService } = require('../../src/services');
const app = require('../../src/server');

chai.use(chaiHttp);
chai.use(sinonChai);

const { request, expect } = chai;

describe('POST /take', () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sinon.restore();
    sandbox.restore();
  });

  it('should return OK if the quota has not been exceeded', async () => {
    const tokens = 5;
    const stub = sinon.stub(rateLimitService, 'take').returns(tokens);

    const requestBody = {
      method: 'GET',
      endpoint: '/user/:id',
    };

    const response = await request(app).post('/take').send(requestBody);

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.body.tokens).to.equal(tokens);
  });

  it('should return 429 HTTP error if the quota has been exceeded', async () => {
    const tokens = 0;
    const stub = sinon.stub(rateLimitService, 'take').returns(tokens);

    const requestBody = {
      method: 'GET',
      endpoint: '/user/:id',
    };

    const response = await request(app).post('/take').send(requestBody);

    expect(response.status).to.equal(StatusCodes.TOO_MANY_REQUESTS);
    expect(response.body.tokens).to.equal(tokens);
  });

  it('should return 404 HTTP error if the endpoint does not exist', async () => {
    const tokens = null;
    const stub = sinon.stub(rateLimitService, 'take').returns(tokens);

    const requestBody = {
      method: 'GET',
      endpoint: '/my-fake_end/point',
    };

    const response = await request(app).post('/take').send(requestBody);

    expect(response.status).to.equal(StatusCodes.NOT_FOUND);
    expect(response.body.tokens).to.equal(tokens);
  });
});

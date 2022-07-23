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

  it('should get ', async () => {
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
});

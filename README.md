# Simple rate limiter

**Simple rate limiter** is a microservice that can be used to check if a particular endpoint is receiving too many requests using the [Token bucket algorithm
](https://en.wikipedia.org/wiki/Token_bucket). This service does **not** block any request: it only provides information about the limits of a given list of endpoints.

## How to add endpoints

You can edit the `config.json` under  `src/` file to add new endpoints.

- **endpoint:** The full endpoint template, including the HTTP method. Example: `GET /user/:id`.
- **burst**: The maximum capacity of the token bucket.
- **sustained**: The number of tokens refilled every minute/

## How to run the project

1. Install the dependencies: `npm install`.
2. Create a `.env` file with the contents of `.env.example` and configure the environment variables if necessary.
3. Run the project: `npm start`.

## Limitations

This project does not differentiate who is the caller of the service, so it only works on an endpoint basis, without considering the IP of the caller.

## Other things I would do in case I had more time
- Add more tests: I would test, for example, the RateLimitService. It already takes the config as a parameter, so we could check if the buckets have been created correctly for each endpoint, etc.

- Validate the request body of the /take endpoint: I already installed Joi and used it to test the shape of the config.json file. It shouldn't be too complicated to install the express-joi-validation middleware and use it to validate the body.

- Unify the validation of the request body with the Swagger documentation. There are projects [like this one](https://www.npmjs.com/package/express-joi-swagger) on npm (although this particular one is not very mature).
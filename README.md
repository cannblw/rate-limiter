# Simple rate limiter

**Simple rate limiter** is a microservice that can be used to check if a particular endpoint is receiving too many requests using the [Token bucket algorithm
](https://en.wikipedia.org/wiki/Token_bucket). This service does **not** block any request: it only provides information about the limits of a given list of endpoints.

## How to add endpoints

You can edit the `config.json` under `src/` file to add new endpoints.

- **endpoint:** The full endpoint template, including the HTTP method. Example: `GET /user/:id`.
- **burst**: The maximum capacity of the token bucket.
- **sustained**: The number of tokens refilled every minute/

## How to run the project

1. Install the dependencies: `npm install`.
2. Create a `.env` file with the contents of `.env.example` and configure the environment variables if necessary.
3. Run the project: `npm start`.

## How to access the the API documentation

The project has a Swagger documentation that can be accessed on: `http://{BASE_URL}/api-docs`

## Limitations

This project does not differentiate who is the caller of the service, so it only works on an endpoint basis, without considering the IP of the caller.

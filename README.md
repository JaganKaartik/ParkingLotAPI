## Parking Lot API 🏎️  - A TDD build using Node/Express.js JEST/Supertest 🚀 

A parking lot API, built on Node/Express.js to understand Test Driven Development (TDD) in Node/Express.js based Apps. 

Experimented with,
- Chai and Mocha
- JEST and Supertest 

(*Repo only contains JEST tests)

## Before running refer 🔽
[Issue: Parking Data Persistancy](https://github.com/JaganKaartik/ParkingLot-Node.js-API/issues/2)

## Instructions

#### *Edit Env Secrets*
- If using app without Docker, change `mongo` to `localhost` in enviornment variables (Refer .sample.env)
- rename `.sample.env` to `.env`

### Running app using Docker

1. Run `docker-compose up`
2. Check exec status via `docker ps` if container running proceed.
3. Access API at port 7000.

### Running app without Docker

1. Run `npm install`
2. Run `npm test` - to test app
3. Run `npm run start` to start app and `npm run start:dev` to start in development mode (live-reloading)
4. Access API at port 7000. 

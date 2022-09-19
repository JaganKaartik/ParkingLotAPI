## Parking Lot Test API 

A parking lot API, built on Node/Express.js to understand Test Driven Development (TDD) in Node/Express.js based Apps. 

Experimented with,
- Chai and Mocha
- JEST and Supertest 

(*Repo only contains JEST tests)

*Note
[Issue: Parking Data Persistancy](https://github.com/JaganKaartik/ParkingLot-Node.js-API/issues/2)

## Instructions

#### *Edit Env Secrets*
- If using app without Docker, change `mongo` to `localhost` in enviornment variables (Refer .sample.env)
- rename `.sample.env` to `.env`

### Running app using Docker

1. cd into `ParkingLot`
2. Run `docker-compose up`
3. Check exec status via `docker ps` if container running proceed.
4. Access API at port 7000.

### Running app without Docker

1. cd into `ParkingLot`
2. Run `npm install`
3. Run `npm test` - to test app
4. Run `npm run start` to start app and `npm run start:dev` to start in development mode (live-reloading)
5. Access API at port 7000. 

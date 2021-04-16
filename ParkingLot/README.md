
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

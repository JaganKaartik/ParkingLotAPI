let server = require('../server');
let chai = require('chai');
let chaiHttp = require('chai-http');

// Assertion
chai.should();
chai.use(chaiHttp);

describe('Test GET route /create_parking_lot', () => {
  it('It should create a parking lot with No of Slots given as a parameter', (done) => {
    chai
      .request(server)
      .get('/create_parking_lot?number=6')
      .end((err, response) => {
        response.should.have.status(200);
        // response.body.should.be.a('message');
        response.body.length.should.be.a('string');
        done();
      });
  });

  //   it('It should NOT return all the tasks', (done) => {
  //     chai
  //       .request(server)
  //       .get('/api/task')
  //       .end((err, response) => {
  //         response.should.have.status(404);
  //         done();
  //       });
  //   });
});

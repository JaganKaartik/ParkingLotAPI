const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');

// Assertions
let should = chai.should();
let expect = chai.expect;
chai.use(chaiHttp);

describe('Test GET route /create_parking_lot', () => {
  it('It should create a parking lot with No of Slots (parameter) > 0', (done) => {
    chai
      .request(server)
      .get('/create_parking_lot?number=6')
      .end((err, response) => {
        const regex = new RegExp('Created a parking lot with [0-9]* slots');
        const result = response.text.match(regex);
        should.exist(result);
        response.should.have.status(200);
        done();
      });
  });

  it('It should not create a parking lot with No of Slots (parameter) = 0', (done) => {
    chai
      .request(server)
      .get('/create_parking_lot?number=0')
      .end((err, response) => {
        const regex = new RegExp('Created a parking lot with [0-9]* slots');
        const result = response.text.match(regex);
        expect(result).to.be.null;
        response.should.have.status(400);
        done();
      });
  });
});

describe('Test GET route /park', () => {
  it('Creating Parking Lot with 6 slots', (done) => {
    chai.request(server).get('/create_parking_lot?number=6');
    done();
  });

  it('It should park car in the nearest avbl slot', (done) => {
    const carNumberArray = [
      'KA01HH1234',
      'KA01HH9999',
      'KA01BB0001',
      'KA01HH7777',
      'KA01HH2701',
      'KA01HH3141',
    ];
    for (i = 0; i < 6; ++i) {
      chai
        .request(server)
        .get(`/park?carnumber=${carNumberArray[i]}&color=White`)
        .end((err, response) => {
          const regex = new RegExp('Allocated slot number: [0-9]* ');
          const result = response.text.match(regex);
          should.exist(result);
          response.should.have.status(200);
        });
    }
    done();
  });
});

// it('It should not create a parking lot with No of Slots (parameter) = 0', (done) => {
//   chai
//     .request(server)
//     .get('/create_parking_lot?number=0')
//     .end((err, response) => {
//       const regex = new RegExp('Created a parking lot with [0-9]* slots');
//       const result = response.text.match(regex);
//       expect(result).to.be.null;
//       response.should.have.status(400);
//       done();
//     });
// });

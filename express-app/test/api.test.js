const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const Car = require('../models/car');
const Parking = require('../models/parking');
const { connectDB } = require('../config/database.config');

// Assertions
let should = chai.should();
let expect = chai.expect;
chai.use(chaiHttp);

const carNumberArray = [
  'KA01HH1234',
  'KA01HH9999',
  'KA01BB0001',
  'KA01HH7777',
  'KA01HH2701',
  'KA01HH3141',
];

const carNoArray = ['MH01HH8888', 'MH01HH2771'];

before(function () {
  connectDB();
});

// after(() => {
//   Car.deleteMany({}, function (err) {
//     console.log('collection removed');
//   });
//   Parking.deleteMany({}, function (err) {
//     console.log('collection removed');
//   });
// });

/*
 API Test
 /create_parking_lot
*/

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

/*
 API Test
 /park
*/

describe('Test GET route /park ', () => {
  // Create Parking Lot with 6 Slots
  it('Creating Parking Lot with 6 slots', (done) => {
    chai.request(server).get('/create_parking_lot?number=6');
    done();
  });
  // Park Car in Avbl slots
  it('It should park car in the nearest avbl slot', (done) => {
    for (i = 0; i < 6; ++i) {
      let value = i;
      chai
        .request(server)
        .get(`/park?carnumber=${carNumberArray[value]}&color=White`)
        .end((err, response) => {
          const regex = new RegExp('Allocated Slot number: [0-9]*');
          const result = response.text.match(regex);
          should.exist(result);
          response.should.have.status(200);
        });
    }
    done();
  });
});

/*
 API Test
 /leave
*/

describe('Test GET route /leave', () => {
  //Leave Slots
  // it('It should leave Slot Number Empty', (done) => {
  //   chai
  //     .request(server)
  //     .get('/leave?slot=4')
  //     .end((err, response) => {
  //       console.log(response.text);
  //       const regex = new RegExp('Slot number [0-9]* is free.');
  //       const result = response.text.match(regex);
  //       response.should.have.status(200);
  //       done();
  //     });
  // });

  it('It should not leave slot when incorrect slot no', (done) => {
    chai
      .request(server)
      .get('/leave?slot=10')
      .end((err, response) => {
        const expectedResponse = 'Slot Incorrect';
        const result = response.text === expectedResponse ? true : false;
        expect(result).to.be.true;
        response.should.have.status(404);
        done();
      });
  });
});

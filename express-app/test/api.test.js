const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const Car = require('../models/car');
const Parking = require('../models/parking');
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

after(async (done) => {
  await Car.remove({});
  await Parking.remove({});
  done();
});

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

describe('Test GET route /park ', () => {
  // Create Parking Lot with 6 Slots
  it('Creating Parking Lot with 6 slots', (done) => {
    chai.request(server).get('/create_parking_lot?number=3');
    done();
  });
  // Park Car in Avbl slots
  it('It should park car in the nearest avbl slot', (done) => {
    for (i = 0; i < 6; ++i) {
      let value = i;
      console.log(`/park?carnumber=${carNumberArray[i]}&color=White`);
      chai
        .request(server)
        .get(`/park?carnumber=${carNumberArray[i]}&color=White`)
        .end((err, response) => {
          const regex = new RegExp('Allocated Slot number: [0-9]*');
          console.log(`${carNumberArray[value]} and ${response.text}`);
          const result = response.text.match(regex);
          should.exist(result);
          response.should.have.status(200);
        });
    }
    done();
  });

  // carNumberArray.forEach((value) => {
  //   it('It should park car in the nearest avbl slot', (done) => {
  //     console.log(`/park?carnumber=${value}&color=White`);
  //     chai
  //       .request(server)
  //       .get(`/park?carnumber=${value}&color=White`)
  //       .end((err, response) => {
  //         const regex = new RegExp('Allocated Slot number: [0-9]*');
  //         console.log(`${value} and ${response.text}`);
  //         const result = response.text.match(regex);
  //         should.exist(result);
  //         response.should.have.status(200);
  //       });
  //     done();
  //   });
  // });
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

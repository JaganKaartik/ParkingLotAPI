const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const Car = require('../models/car');
const Parking = require('../models/parking');
const mongoose = require('mongoose');
const { MONGO_DB_URL } = require('../config/default.config');

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

before(function (done) {
  mongoose.connect(MONGO_DB_URL, function () {
    mongoose.connection.db.dropDatabase(function () {
      done();
    });
  });
});

/*
  API Test /create_parking_lot
*/

describe('Test GET route /create_parking_lot', () => {
  it('It should create a parking lot with No of Slots (parameter) > 0', () => {
    chai
      .request(server)
      .get('/create_parking_lot?number=6')
      .end((err, response) => {
        const regex = new RegExp('Created a parking lot with [0-9]* slots');
        const result = response.text.match(regex);
        console.log(response.text);
        should.exist(result);
        response.should.have.status(200);
      });
  });

  it('It should not create a parking lot with No of Slots (parameter) = 0', () => {
    chai
      .request(server)
      .get('/create_parking_lot?number=0')
      .end((err, response) => {
        const regex = new RegExp('Created a parking lot with [0-9]* slots');
        const result = response.text.match(regex);
        expect(result).to.be.null;
        response.should.have.status(400);
      });
  });
});

/*
  API Test /park
*/

describe('Test GET route /park ', () => {
  // Park Car in Avbl slots
  it('It should park car in the nearest avbl slot', () => {
    for (i = 0; i < 6; ++i) {
      let value = i;
      chai
        .request(server)
        .get(`/park?carnumber=${carNumberArray[value]}&color=White`)
        .end((err, response) => {
          const regex = new RegExp('Allocated Slot number: [0-9]*');
          const result = response.text.match(regex);
          console.log(response.text);
          should.exist(result);
          response.should.have.status(200);
        });
    }
    // done();
  });
});

/*
  API Test /status
*/

describe('Test GET route /status', () => {
  it('Status', (done) => {
    chai
      .request(server)
      .get('/status')
      .end((err, response) => {
        response.should.have.status(200);
      });
    done();
  });
});

/*
  API Test /leave
*/

// describe('Test GET route /leave', () => {
//   //Leave Slots
//   // it('It should leave Slot Number Empty', (done) => {
//   //   chai
//   //     .request(server)
//   //     .get('/leave?slot=6')
//   //     .end((err, response) => {
//   //       console.log(response.text);
//   //       const regex = new RegExp('Slot number [0-9]* is free.');
//   //       const result = response.text.match(regex);
//   //       should.exist(result);
//   //       response.should.have.status(200);
//   //     });
//   //   done();
//   // });

//   it('It should not leave slot when incorrect slot no', (done) => {
//     chai
//       .request(server)
//       .get('/leave?slot=10')
//       .end((err, response) => {
//         const expectedResponse = 'Slot Incorrect';
//         const result = response.text === expectedResponse ? true : false;
//         expect(result).to.be.true;
//         response.should.have.status(404);
//       });
//     done();
//   });
// });

/*
  API Test /slot_number_for_registration_number
*/

describe('Test GET route /slot_number_for_registration_number', () => {
  it('It should return the slot number of given car registration no: KA01HH2701', (done) => {
    chai
      .request(server)
      .get('/slot_number_for_registration_number?regno=KA01HH2701')
      .end((err, response) => {
        should.exist(response.text);
        response.should.have.status(404);
      });
    done();
  });

  it('It should not return the slot number of given car registration [error case]', (done) => {
    chai
      .request(server)
      .get('/slot_number_for_registration_number?regno=1111')
      .end((err, response) => {
        // const expectedResponse = 'Not found';
        // const result = response.text === expectedResponse ? true : false;
        // expect(result).to.be.true;
        response.should.have.status(404);
      });
    done();
  });
});

/*
  API Test /registration_numbers_for_cars_with_colour
*/

describe('Test GET route /registration_numbers_for_cars_with_colour', () => {
  it('It should return registration numbers for cars with colour', (done) => {
    chai
      .request(server)
      .get('/registration_numbers_for_cars_with_colour?color=White')
      .end((err, response) => {
        // const text = JSON.parse(response.text);
        // expect(text).to.be.an('array');
        // response.should.have.status(200);
      });
    done();
  });
});

/*
  API Test /slot_numbers_for_cars_with_colour
*/

describe('Test GET route /slot_numbers_for_cars_with_colour', () => {
  it('It should return slot numbers for cars with colour', (done) => {
    chai
      .request(server)
      .get('/slot_numbers_for_cars_with_colour?color=White')
      .end((err, response) => {
        // const text = JSON.parse(response.text);
        // expect(text).to.be.an('array').that.is.not.empty;
        // response.should.have.status(200);
      });
    done();
  });
});

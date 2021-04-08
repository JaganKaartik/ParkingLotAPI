const request = require('supertest');
const server = require('../server');

const carNumberArray = [
  'KA01HH1234',
  'KA01HH9999',
  'KA01BB0001',
  'KA01HH7777',
  'KA01HH2701',
  'KA01HH3141',
];

const carNoArray = ['MH01HH8888', 'MH01HH2771'];

describe('Test GET route /create_parking_lot', () => {
  test('It should create a parking lot with No of Slots (parameter) > 0', async () => {
    const response = await request(server).get('/create_parking_lot?number=6');
    const regex = new RegExp('Created a parking lot with [0-9]* slots');
    const result = response.text.match(regex);
    expect(result).toBeTruthy();
    expect(response.statusCode).toBe(200);
  });
});

describe('Test GET route /create_parking_lot', () => {
  test('It should not create a parking lot with No of Slots (parameter) = 0', async () => {
    const response = await request(server).get('/create_parking_lot?number=0');
    const rsp = 'Error! Minimum 1 Parking Slot to be created';
    expect(response.text).toBe(rsp);
    expect(response.statusCode).toBe(400);
  });
});

describe('Test GET route /park ', () => {
  for (i = 0; i < 6; ++i) {
    let value = i;
    test('It should park car in the nearest avbl slot', async () => {
      const response = await request(server).get(
        `/park?carnumber=${carNumberArray[value]}&color=White`
      );
      const regex = new RegExp('Allocated Slot number: [0-9]*');
      const result = response.text.match(regex);
      expect(result).toBeTruthy();
      expect(response.statusCode).toBe(200);
    });
  }
});

const request = require('supertest');
const server = require('../server');
const mongoose = require('mongoose');
const { MONGO_DB_URL } = require('../config/default.config');

const carNumberArray = [
  'KA01HH1234',
  'KA01HH9999',
  'KA01BB0001',
  'KA01HH7777',
  'KA01HH2701',
  'KA01HH3141',
];

const carNoArray = ['MH01HH8888', 'MH01HH2771'];

beforeAll(async () => {
  mongoose.connect(MONGO_DB_URL, () => {
    mongoose.connection.db.dropDatabase();
  });
});

afterAll(async () => {
  mongoose.disconnect();
});

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

describe('Test GET route /status', () => {
  test('It should return the present status of the parking lot', async () => {
    const response = await request(server).get(`/status`);
    expect(response.text).toBeTruthy();
    expect(response.statusCode).toBe(200);
  });
});

describe('Test GET route /leave', () => {
  test('It should leave Slot Number Empty', async () => {
    const response = await request(server).get('/leave?slot=6');
    const regex = new RegExp('Slot number [0-9]* is free.');
    const result = response.text.match(regex);
    expect(result).toBeTruthy();
    expect(response.statusCode).toBe(200);
  });

  test('It should not leave Slot Number when Incorrect Slot', async () => {
    const response = await request(server).get('/leave?slot=10');
    const expectedResponse = 'Slot Incorrect';
    const result = response.text === expectedResponse ? true : false;
    expect(result).toBeTruthy();
    expect(response.statusCode).toBe(404);
  });
});

describe('Test GET route /registration_numbers_for_cars_with_colour', () => {
  const expected = [
    'KA01HH1234',
    'KA01HH9999',
    'KA01BB0001',
    'KA01HH7777',
    'KA01HH2701',
  ];
  test('It should return registration numbers for cars with colour', async () => {
    const response = await request(server).get(
      '/registration_numbers_for_cars_with_colour?color=White'
    );
    const text = JSON.parse(response.text);
    expect(text).toEqual(expect.arrayContaining(expected));
    expect(response.statusCode).toBe(200);
  });

  test('It should not return slot numbers for cars with colour', async () => {
    const response = await request(server).get(
      '/registration_numbers_for_cars_with_colour?color=Red'
    );
    const expectedResponse = 'Not found';
    const result = response.text === expectedResponse ? true : false;
    expect(result).toBeTruthy();
    expect(response.statusCode).toBe(404);
  });
});

describe('Test GET route /slot_number_for_registration_number', () => {
  test('It should return the slot number of given car registration no: KA01HH2701', async () => {
    const response = await request(server).get(
      '/slot_number_for_registration_number?regno=KA01HH2701'
    );
    expect(response.text).toEqual('5');
    expect(response.statusCode).toBe(200);
  });

  test('It should not return the slot number of given car registration [error case]', async () => {
    const response = await request(server).get(
      '/slot_number_for_registration_number?regno=1111'
    );
    const expectedResponse = 'Not found';
    const result = response.text === expectedResponse ? true : false;
    expect(result).toBeTruthy();
    expect(response.statusCode).toBe(404);
  });
});

describe('Test GET route /slot_numbers_for_cars_with_colour', () => {
  const expected = ['1', '2', '3', '4', '5'];
  test('It should return slot numbers for cars with colour', async () => {
    const response = await request(server).get(
      '/slot_numbers_for_cars_with_colour?color=White'
    );
    const text = JSON.parse(response.text);
    expect(text).toEqual(expect.arrayContaining(expected));
    expect(response.statusCode).toBe(200);
  });

  test('It should not return slot numbers for cars with colour [error case]', async () => {
    const response = await request(server).get(
      '/slot_numbers_for_cars_with_colour?color=Red'
    );
    const expectedResponse = 'Not found';
    const result = response.text === expectedResponse ? true : false;
    expect(result).toBeTruthy();
    expect(response.statusCode).toBe(404);
  });
});

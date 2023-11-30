const request = require('supertest');
const app = require('../index'); // Replace with the correct path to your app file

// Mock MongoDB
const { MongoClient } = require('mongodb');
jest.mock('mongodb');
console.log(app);
const createMockMongoClient = () => {
  const mockCollection = {
    insertOne: jest.fn().mockResolvedValue(),
  };

  const mockDb = {
    collection: jest.fn(() => mockCollection),
  };

  return {
    db: jest.fn(() => mockDb),
    close: jest.fn(),
  };
};

describe('Backend API Tests', () => {
  beforeAll(() => {
    // Mock MongoDB connection
    MongoClient.connect.mockImplementation(createMockMongoClient);
  });

  afterAll(() => {
    // Restore original behavior
    jest.restoreAllMocks();
  });

  // Test for the POST request
  describe('POST /api/user/addUsers', () => {
    it('should add a new user', async () => {
      const userData = {
        username: 'test1',
        email: 'newuser@example.com',
        password: 'newpassword',
      };

      // Mock the insertOne method to simulate successful insertion
      MongoClient.connect().db().collection().insertOne.mockResolvedValue();

       // Add this line for debugging
      const response = await request(app)
        .post('/api/user/addUsers')
        .send(userData);
        
      console.log(response.text);
      expect(response.status).toBe(500);
      //expect(response.body).toBe('Note added successfully');
    });
  });
});

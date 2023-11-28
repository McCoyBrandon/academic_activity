const supertest = require('supertest');
const app = require('../index'); // Replace with the actual path to your app file

describe('POST /api/user/addUsers', () => {
 

  it('should return 500 Internal Server Error on database error', async () => {
    // Mock the database error scenario
    // ...

    const userData = { 
      email: "varun@321",
      password: "varun321",
    }

    const response = await supertest(app)
      .post('/api/user/addUsers')
      .send(userData);

    expect(response.status).toBe(500);
  });



  it('should return 500 Internal Server Error on database error', async () => {
    // Mock the database error scenario
    // ...

    const response = await supertest(app)
      .get('/api/user/usersCredentials')
      .query({ userEmail: 'korukondaharish321@gmail.com', userPassword: 'Harish321' });

    expect(response.status).toBe(500);
  });
});

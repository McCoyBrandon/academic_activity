const supertest = require("supertest");
const app = require("../index");
const mongoose = require("mongoose");

const request = supertest(app);

let database;

beforeAll(async () => {
  const connectionString = "mongodb+srv://harish:1234567890@cluster0.xbtdjvm.mongodb.net/?retryWrites=true&w=majority";
  await mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  database = mongoose.connection;
});

// Start describing the API tests
describe("API Tests", () => {
    // Describe the specific endpoint being tested
    describe("GET /api/user/usersCredentials", () => {
      // Write a test case for a specific scenario
      it("should return user data for valid login", async () => {
        const validCredentials = {
          userEmail: "korukondaharish321@gmail.com",
          userPassword: "Harish321"
        };
      
        try {
          const response = await request
            .get("/api/user/usersCredentials")
            .query(validCredentials);
            console.log(validCredentials);
      
          expect(response.status).toBe(200);
          console.log(response.status);
          expect(response.body).toBeInstanceOf(Array);
          console.log(response.body);
          expect(response.body.length).toBeGreaterThan(0);
        } catch (error) {
          // If an error occurs, log it and fail the test
          console.error("Error:", error);
          throw error;
        }
      });
      
    });
  

  describe("POST /api/user/addUsers", () => {
    it("should add a new note", async () => {
      const newNote = {
        email: "varun@321",
        password: "varun321",
      };
      const response = await request
        .post("/api/user/addUsers")
        .send(newNote);

      expect(response.status).toBe(200);
      expect(response.body).toBe("Note added successfully");
    });
  });

  // Add more test cases for other endpoints...

  describe("POST /api/user/createProjects", () => {
    it("should add a new note", async () => {
      const newNote1 = {
        "projectName": "project10",
        "description": "des10",
        "members": [
                     {
                        "name": "vardhan",
                        "id": { "$numberInt": "1" },
                        "row_id": "6538503bccb8c00b8500add1"
                         },
                     {
                        "name": "test",
                        "id": { "$numberInt": "4" },
                        "row_id": "6540a63570a3ed770bec09ef"
                        }
                    ],
                    "id": null
                };
           
      const response = await request
        .post("/api/user/createProjects")
        .send(newNote1);
      expect(response.status).toBe(200);
      expect(response.body).toBe("project created successfully");
    });
  });


  describe("GET /api/user/viewAllProjects", () => {
    // Write a test case for a specific scenario
    it("should return user data for valid login", async () => {
      const validCredentials = {
       
      };
    
      try {
        const response = await request
          .get("/api/user/viewAllProjects")
          .query(validCredentials);
          console.log(validCredentials);
    
        expect(response.status).toBe(200);
        console.log(response.status);
        expect(response.body).toBeInstanceOf(Array);
        console.log(response.body);
       // expect(response.body.length).toBeGreaterThan(0);
      } catch (error) {
        // If an error occurs, log it and fail the test
        console.error("Error:", error);
        throw error;
      }
    });
    
  });

  describe("GET /api/allUsers", () => {
    // Write a test case for a specific scenario
    it("should return user data for valid login", async () => {
      const validCredentials = {
       
      };
    
      try {
        const response = await request
          .get("/api/allUsers")
          .query(validCredentials);
          console.log(validCredentials);
    
        expect(response.status).toBe(200);
        console.log(response.status);
        expect(response.body).toBeInstanceOf(Array);
        console.log(response.body);
       // expect(response.body.length).toBeGreaterThan(0);
      } catch (error) {
        // If an error occurs, log it and fail the test
        console.error("Error:", error);
        throw error;
      }
    });
    
  });


  describe("POST /api/user/projectMembers", () => {
    it("should add a new note", async () => {
      const newNote1 = {
        "projectName": "project10",
        "members": [
                     {
                        "name": "vardhan",
                        "id": { "$numberInt": "1" },
                        "row_id": "6538503bccb8c00b8500add1"
                         },
                     {
                        "name": "test",
                        "id": { "$numberInt": "4" },
                        "row_id": "6540a63570a3ed770bec09ef"
                        }
                    ],
                    "id": null
                };
           
      const response = await request
        .post("/api/user/projectMembers")
        .send(newNote1);
      expect(response.status).toBe(200);
      expect(response.body).toBe("add member to project in separate collection successfully");
    });
  });


  afterAll(async () => {
    // Close the MongoDB connection after all tests
    await mongoose.disconnect();
  });
});

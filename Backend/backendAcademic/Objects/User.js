// Connections for the Front-End
const express= require("express");
var MongoClient=require("mongodb").MongoClient;
var cors=require("cors");

const multer= require('multer');
const { default: mongoose } = require("mongoose");

const app=express();
app.use(cors());
app.use(express.json());

// MongoDB Connections Section

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://projectAdmin:KLUdywBgxnfbjZrP@atlascluster.ysh6jth.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Creating a constant for direct reference to the Users collection in MongoDB
const usersClient = client.db("Academic_Activity").collection("Users");

//
// User frontend call functions
//
/* 
Function: Find a User based on their email and password.
Return: User's MondoDB _id
*/
app.get('/api/user/getUserByEmail', (request, response) => {
    const userEmail = request.query.userEmail;
    const userPassword = request.query.userPassword;
    console.log(request.query.userEmail);
    database.collection('Users').find({ "email":userEmail
    , "password":userPassword   
    }).toArray((error, result) => {
      if (error) {
        console.error('Error retrieving data from MongoDB:', error);
        response.status(500).send('Internal Server Error');
      } else {
        // Send the result as a response
        response.send(result);
      }
    });
  });

  /* 
Function: Get a User based on a provided ID.
Return: Project's MondoDB _id
*/
app.get('/api/user/viewUser', (request, response) => {
    const userId = request.query.userId;
    console.log(request.query.userId);
    database.collection('Users').find({"_ID": userId}).toArray((error, result) => {
      if (error) {
        console.error('Error retrieving data from MongoDB:', error);
        response.status(500).send('Internal Server Error');
      } else {
        // Send the result as a response
        response.send(result);
      }
    });
  });
  
  /* 
  Function: Create a User based on their email and password, and return the user.
  Return: User's MondoDB _id
  */
  app.post('/api/user/addUser', multer().none(), (request, response) => {
      const userEmail = request.query.userEmail;
      const userPassword = request.query.userPassword;
      database.collection("Users").countDocuments({}, (error, numofDocs) => {
          if (error) {
              console.error("Error counting documents:", error);
              response.status(500).send("Internal Server Error");
          } else {
              const body = request.body;
  
              database.collection("Users").insertOne(body, (insertError) => {
                  if (insertError) {
                      console.error("Error adding note:", insertError);
                      response.status(500).send("Internal Server Error");
                  } else {
                      console.log(body);
                      response.json("Note added successfully");
                  }
              });
          }
      });
  });
  
  /* 
  Function: Delete a User based on their email and password.
  */
  app.delete('/api/user/deleteUser', (request, response) =>{
      const userEmail = request.query.userEmail;
      const userPassword = request.query.userPassword;
  
      database.collection("Users").deleteOne({"email": userEmail, "password": userPassword}, (error,result) =>
      {
          if (error) {
              console.error('Error deleting data from MongoDB:',error);
              response.status(500).send('Internal Server Error');
          } else {
              if (result.deletedCount === 0) {
                  response.status(400).send('User not found');
              } else {
                  response.status(200).send('User credentials deleted');
              }
          }
      });
  });

class User {
    #password;

    constructor(userID, email, password, projectList = []){
        if(userNameAvaliable(userID)){ // need to create call function to check userList
            this.userID = userID;
            this.email = email;
            this.projectList = projectList;
            this.#password = password;
        }
    }

    passwordReset(newPassword){
        this.#updatePassword(newPassword);
    }

    #updatePassword(newPassword){
        this.#password(newPassword);
    }

    emailReset(newEmail){
        this.email = newEmail;
    }

    addProject(newProject){
        this.projectList.push(newProject);
    }

    removeProject(projectIndex){
        this.projectList.splice(projectIndex, 1);
    }

    getProject(projectIndex){
        return this.projectList.at(projectIndex);
    }
}

//
// Section for Unit Testing build out.
//




















//
// Saving these functions for possible use later, but may depreciate.
//
/*
Function: Create a user in the MongoDB database
Returns: True/False if successful
*/
async function createTask(userName, email, password){
    entry = {UserID: userName,
            email: email,
            password: password}
    
    if userIDAvaliable(userName){
        try {
            // Connect the client to the server
            await client.connect();
            // Send an insert rerquest.
            await usersClient.insertone(entry);

        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
        return true;
    } else {
        return false;
    }
} 

/*
Function: Finds and returns the User from the MongoDB.
Returns: User class or '-1' if it can't find the user.
*/
function findUser(userID){

}

/*
Function: Check's if an ID is avaliable
Returns: True/False if avaliable
*/
async function userIdAvaliable(userID){
    const result = await usersClient.findOne({UserID: userID});
    return result;
}

/*
Function: Create a new project without a task list in the MongoDB database for a user
Returns: True/False if successful
*/
async function createProject(name, ID){

} 

/*
Function: Create a new project with task list in the MongoDB database for a user
Returns: True/False if successful
*/
async function createProjectWithTasks(name, ID, tasks = []){

}

/*
Function: Update a project with task list in the MongoDB database for a user
Returns: True/False if successful
*/
async function updateProjectName(projectID, name){

}

/*
Function: Update a project task list in the MongoDB database for a user
Returns: True/False if successful
*/
function updateProjectTasks(projectID, tasks = []){

}

/*
Function: Delete a user in the MongoDB database for a user
Returns: True/False if successful
*/
async function deleteUser(projectID){

}

/*
Function: Validates the User's password
Returns: UserObject or False
*/
async function validatePasswordUserID(userID, password){

}

/*
Function: Validates the User's password
Returns: User object or False
*/
async function validatePasswordEmail(email, password){

}

/*
Function: Change Password
Return: True/False on success
*/
async function resetPassword(oldPassword, newPassword){

}

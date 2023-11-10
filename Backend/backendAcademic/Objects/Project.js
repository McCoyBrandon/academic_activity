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

//
// Projects call functions
//
/* 
Function: Create a project based on a provided name, and return the id.
Return: Project's MondoDB _id
*/
app.post('/api/user/createProject', multer().none(), (request, response) => {
    database.collection("Projects").countDocuments({}, (error, numofDocs) => {
        if (error) {
            console.error("Error counting documents:", error);
            response.status(500).send("Internal Server Error");
        } else {
            const body = request.body;

            database.collection("Projects").insertOne(body, (insertError) => {
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
Function: Get a project list based on a provided value, and return the id.
Return: Project's MondoDB _id
*/
app.get('/api/user/viewProject', (request, response) => {
    const projectId = request.query.projectId;
    console.log(request.query.projectId);
    database.collection('Projects').find({"_ID": projectId}).toArray((error, result) => {
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
Function: Get a project list based on a userID, and return the array of ids.
Return: Projects's in a MondoDB _id list
*/
app.get('/api/user/viewProjectsByUser', (request, response) => {
    const userID = request.query.userID;
    console.log(request.query.userID);
    database.collection('Projects').find({"ownerID": userID}).toArray((error, result) => {
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
Function: Get a project list based on a provided value, and return the id.
Return: Projects's in a MondoDB _id list
*/
app.get('/api/user/viewProjectsByMember', (request, response) => {
    const userID = request.query.userID;
    console.log(request.query.userID);
    database.collection('Projects').find({"members": {"memberID": userID}}).toArray((error, result) => {
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
Function: Delete a project based on a given projectId
*/
app.delete('/api/user/deleteProject', (request, response) =>{
    const projectID = request.query.projectID;
    console.log(request.query.projectID);
    database.collection("Projects").deleteOne(projectID, (error,result) =>
    {
        if (error) {
            console.error('Error deleting data from MongoDB:',error);
            response.status(500).send('Internal Server Error');
        } else {
            if (result.deletedCount === 0) {
                response.status(400).send('Project not found');
            } else {
                response.status(200).send('Project deleted');
            }
        }
    });
});

// Creating a constant for direct reference to the Users collection in MongoDB
const projectsClient = client.db("Academic_Activity").collection("Projects");

class Project {
    #projectID;

    constructor(name, projectID, taskList = []){
        if(userNameAvaliable(userID)){ // need to create call function to check userList
            this.name = name;
            this.taskList = taskList;
            this.#projectID = projectID;
        }
    }

    idReset(newID){
        this.#updateID(newID);
    }

    #updateID(newID){
        this.#projectID(newID);
    }

    nameName(newName){
        this.name = newName;
    }

    addTask(newTask){
        this.taskList.push(newTask);
    }

    removeTask(taskIndex){
        this.taskList.splice(taskIndex, 1);
    }

    getTask(taskIndex){
        return this.taskList.at(taskIndex);
    }

}

//
// Section for Unit Testing build out.
//



















//
// Saving these functions for possible use later, but may depreciate.
//

/*
Function: Create a new project without a task list in the MongoDB database
Returns: True/False if successful
*/
async function createProject(name){
    entry = {Name: name}
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await projectsClient.insertone(entry);

      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }

} 

/*
Function: Create a new project with task list in the MongoDB database
Returns: True/False if successful
*/
async function createProjectWithTasks(name, tasks = []){
    entry = {Name: name,
            Tasks: tasks}
    try {
        // Connect the client to the server
        await client.connect();
        // Send a ping to confirm a successful connection
        await projectsClient.insertone(entry);

      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

/*
Function: Update a project with task list in the MongoDB database
Returns: True/False if successful
*/
async function updateProjectName(projectID, name){

}

/*
Function: Update a project task list in the MongoDB database
Returns: True/False if successful
*/
async function updateProjectTasks(projectID, tasks = []){

}

/*
Function: Update a project task list in the MongoDB database
Returns: True/False if successful
*/
async function deleteProject(projectID){
    try {
        // Connect the client to the server
        await client.connect();
        // Send request to delete a project on MongoDB
        await projectsClient.deleteOne({_id: projectID});

      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
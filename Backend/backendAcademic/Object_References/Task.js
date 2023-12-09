//
//  THIS FILE IS NOT USED WITHIN PROGRAM. IT WAS USED AS REFERENCE AND TESTING BETWEEN PROJECT MEMBERS. THEN DEVELOPED FURTHER ELSEWHERE THAT MET PROJECT NEEDS.
//  THIS WAS RETAINED AS A REFERENCE LOCATION FOR 'TASK' PROGRAMMING


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
// Task frontend call functions
//

/* 
Function: Get a task based on a provided name, and return the id.
Return: Task's MondoDB _id
*/
app.post('/api/user/createTask', multer().none(), (request, response) => {
    database.collection("Tasks").countDocuments({}, (error, numofDocs) => {
        if (error) {
            console.error("Error counting documents:", error);
            response.status(500).send("Internal Server Error");
        } else {
            const body = request.body;

            database.collection("Tasks").insertOne(body, (insertError) => {
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
Function: Get a task list based on a provided value, and return the array of Ids.
Return: Array of tasks
*/

app.get('/api/user/viewTask', (request, response) => {
    const taskId = request.query.taskId;
    console.log(request.query.taskId);
    database.collection('Tasks').find({"_ID": taskId}).toArray((error, result) => {
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
Return: Task's in a MondoDB _id list
*/
app.get('/api/user/viewTasksByUser', (request, response) => {
    const userID = request.query.userID;
    console.log(request.query.userID);
    database.collection('Tasks').find({"ownerID": userID}).toArray((error, result) => {
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
Function: Get a tasks list based on a userID, and return the array of ids.
Return: Task's in a MondoDB _id list
*/
app.get('/api/user/viewTasksByMember', (request, response) => {
    const userID = request.query.userID;
    console.log(request.query.userID);
    database.collection('Tasks').find({"members": {"memberID": userID}}).toArray((error, result) => {
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
Function: Delete a task based on a given taskId
*/
  app.delete('/api/user/deleteTask', (request, response) =>{
    const taskID = request.query.taskID;
    console.log(request.query.taskID);
    database.collection("Tasks").deleteOne(taskID, (error,result) =>
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


// Creating a constant for direct reference to the Tasks collection in MongoDB
const tasksClient = client.db("Academic_Activity").collection("Tasks");


class Task {
    #taskID;

    constructor(name, taskID){
        if(taskIdAvaliable(userID)){ // need to create call function to check TaskId list
            this.name = name;
            this.#taskID = taskID;
        }
    }

    idReset(newID){
        this.#updateID(newID);
    }

    #updateID(newID){
        this.#taskID(newID);
    }

    nameName(newName){
        this.name = newName;
    }
}

//
// Section for Unit Testing build out.
//























//
// Saving these functions for possible use later, but may depreciate.
//
/*
Function: Finds and returns the task from the MongoDB
Return: Task object or false
*/
async function findTask(userID){
    
}


/*
Function: Check's if an ID is avaliable
Returns: True/False if avaliable
*/
async function taskIdAvaliable(taskID){

}

/*
Function: Create a new task in the MongoDB database
Returns: True/False if successful
*/
async function createTask(name){
    entry = {Name: name}
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await tasksClient.insertone(entry);

      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
} 


/*
Function: Update a task name in the MongoDB database
Returns: True/False if successful
*/
async function updateTaskName(taskID, name){

}

/*
Function: Update a task ID in the MongoDB database
Returns: True/False if successful
*/
async function updateTaskID(taskID, newID){

}

/*
Function: Delete a task in the MongoDB database
Returns: True/False if successful
*/
async function deleteProject(taskID){
    try {
        // Connect the client to the server
        await client.connect();
        // Send request to delete a task on MongoDB
        await tasksClient.deleteOne({_id: taskID});
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
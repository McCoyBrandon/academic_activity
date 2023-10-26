
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
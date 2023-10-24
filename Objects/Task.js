
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
function findTask(client, userID){
    
}


/*
Function: Check's if an ID is avaliable
Returns: True/False if avaliable
*/
function taskIdAvaliable(client, taskID){

}

/*
Function: Create a new task in the MongoDB database
Returns: True/False if successful
*/
function createTask(client){

} 


/*
Function: Update a task name in the MongoDB database
Returns: True/False if successful
*/
function updateTaskName(client, taskID, name){

}

/*
Function: Update a task ID in the MongoDB database
Returns: True/False if successful
*/
function updateTaskID(client, taskID, newID){

}

/*
Function: Delete a task in the MongoDB database
Returns: True/False if successful
*/
function deleteProject(client, taskID){

}
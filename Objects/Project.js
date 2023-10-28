
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
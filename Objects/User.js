
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

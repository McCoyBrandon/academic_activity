
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
// Creating a constant for direct reference to the Academic_Activity database in MongoDB
const AA_db = client.db("Academic_Activity").collection("Projects");

// Creating a constant for direct reference to the Users collection in MongoDB
const projectsCol = client.db("Academic_Activity").collection("Projects");

// Creating a constant for direct reference to the Tasks collection in MongoDB
const tasksCol = client.db("Academic_Activity").collection("Tasks");

// Creating a constant for direct reference to the Users collection in MongoDB
const usersCol = client.db("Academic_Activity").collection("Users");

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("Academic_Activity").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    // List databases that are avaliable.
    console.log("Database test:");
    await listDatabases(client);
    // View the list of collections in the Academic_Activity database.
    console.log("Collection test:");
    await listCollections(AA_db);

    /* Test cases needing completed:
    // Add a new project to the database
    console.log("Add project test:");
    await testAddProject(projectsCol);

    // Delete a project from the database
    console.log("Delete project test:");
    await testDeleteProject(projectsCol);

    // Add a new task to the database
    console.log("Add task test:");
    await testAddTask(projectsCol);

    // Delete a task from the database
    console.log("Delete task test:");
    await testDeleteTask(projectsCol);
    */
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

/* 
Function: Test that database is working and Database is showing.
Success action: Should indicate it was able to ping the MongDB and list the databases.
*/
async function listDatabases(client){
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`);
    })
} 

/* 
Function: Test that database is working and show that all of the object classes have their Collections avalaible.
Success action: Should indicate it was able to ping the MongDB and list the databases.
*/
async function listCollections(db){
  const collectionsList = db.getCollectionInfos();

  console.log("Collections:");
  collectionsList.collection.forEach(col => {
      console.log(`- ${col.name}`);
  })
} 

/* 
Function: Test that we are able to add a project to the collection correctly.
Success action: Should indicate it was able add and find the created project.
*/
async function testAddProject(collection){
  const name = "Research Review Paper";
  entry = {Name: name}
  await projectsClient.insertone(entry);
  
  // Need to add the validation

} 

/* 
Function: Test that we are able to delete a project to the collection correctly.
Success action: Should indicate it wasn't able to find the project.
*/
async function testDeleteProject(db){
  const proj = db.find({Name: "Research Review Paper"})


} 

/* 
Function: Test that we are able to add a project to the collection correctly.
Success action: Should indicate it was able add and find the created project.
*/
async function testAddTask(db){
  const name = "Read 5 different ISEE Articles";
  entry = {Name: name}
  await projectsClient.insertone(entry);
  
  // Need to add the validation

} 

/* 
Function: Test that we are able to delete a project to the collection correctly.
Success action: Should indicate it wasn't able to find the project.
*/
async function testDeleteTask(db){
  const task = db.find({Name: "Read 5 different ISEE Articles"})
} 

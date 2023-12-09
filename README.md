# Academic Activity Task and Portfolio Assistant

***Team Members:***
+ Harish Korukonda
+ Vardhan Pothu
+ Vineetha Ravulapalli
+ Brandon McCoy

GitHub Repository:
https://github.com/McCoyBrandon/academic_activity


# Product Objective:
The goal of this product is to create a task tracking tool that could be used for helping individual students and/or researchers manage their scholarly work and to retain the activities to create an academic portfolio.  It could also act as a reference engine to assist with finding materials from projects you worked on in the past. By creating a project manager that includes descriptions, references, and categorical tags it could assist academics refer back to sources of previous work. And from their ‘project completion list’ the portfolio assistant could create activity reports and possibly even a CV.

There are plenty of task managers and academic activity products out there, but not many that do both and those that do exist can be expensive or specialized for a specific field of study. The goal of this product would be a basic universal version that could be used by all students and steadily added on to include the entire life-cycle of an academic or research professional. To start out with the base product, the structure looks like a typical task management product. However, we are looking to add features that allow the user to keep track of the sources of information they use and structure the data in a manner that is consistent with industry reporting standards.

# Use Case Example:
An example of how this would work: A graduate student is working on a project researching how to create a computer vision model that creates a topological map from an observation drone. During the semester the student uses a wide variety of sources and individuals to learn about the best practices to do this. While the student uses our product to manage tasks needed for the project, they also track all of the source references and contacts for the experts they reached out for advice. Along with having the source references and contacts for these projects, it will also allow for tagging of the subject on that project. So the above graduate student could tag this project as pertaining to the primary study of ‘Computer modeling’ or ‘Artificial Intelligence’ with an additional tag of ‘Geography’.

A couple years later the student is now graduating and needs to work on their resume.  The aim is to allow for the new graduate to be able to pull a report on the projects they’ve worked on and have descriptions on what they did. Or following getting a job with a research institute as a research assistant they get assigned to a geospatial project in which they are using drones to track the water run-off effect on the environment around key waterways. Remembering that they had worked on a similar project in the past, the student could use their academic activity portfolio to quickly find the project they worked on in the previous paragraph.  From there they can easily gather their sources and contact information from working on this project in the past and use it as a baseline to further development.  Additionally if the person continues to use the product in their professional life, they may be able to use it for their annual performance evaluations by having a quick and easy report that has been managed over the year as they worked on projects.

One of the hardest things in academia is keeping track of all the information and contacts you work with over time on various projects. Let us help make it easier for you and contribute your own features that are unique to your field of study.

# Getting Started:
## Program Dependencies
This program is built primarly using Javascript for the programming lananguage. It uses NodeJS framework for the frontend and integrations, and connects to a MongoDB server.  It is also set up using a 

***Frontend: NodeJS, React, Jest***
For the front end this single page application app is running on a NodeJS framework.  For the interface, we used the build tool Vite that utilizes React.js for its fast development server and optimized build process. 

To find more information you can find downloads and user guides on their respective websites:
+ NodeJS: https://nodejs.org/en
+ Vite: https://vitejs.dev/
+ React: https://legacy.reactjs.org/
+ Jest: https://jestjs.io/

***Backend: NodeJS, React, Jest***
For the backend we used a monolithic architecture. We used MongoDB for our datawarehouse for its flexibility, especially when dealing with nested data structures. We found this important as a core data structure issue we would have to tackle is a diverse set of tags that can be applied to projects and tasks.  Additionally we used Postman to build out tests for our MongoDB APIs.  Additionally we used CircleCI for our CI/CD pipeline and automated unit testing.  And Docker for container environment and image generations.

To find more information you can find downloads and user guides on their respective websites:
+ GitHub: https://github.com/
+ NodeJS: https://nodejs.org/en
+ Express: https://expressjs.com/
+ MongDB: https://www.mongodb.com/
+ Postman: https://www.postman.com/

## Setting up your developer environment
We used Visual Studio Code (https://code.visualstudio.com/) for IDE for their helpful addons, visual aestetic, and easier GitHub interactions when we were switching between branches to discuss our work with teammates.  Although this optional and recommend using the IDE you feel comfortable with. 

**GitHub clone command:**
```
cd path/to/desired/directory
git clone https://github.com/McCoyBrandon/academic_activity.git
```

**Fork the repository:** https://github.com/McCoyBrandon/academic_activity

### Setting up your MongoDB and CircleCi
Before you start making adjustments to personalize the code to your own test environment, you will need to be set up MongoDB and CircleCi accounts.

### MongoDB
Upon setting up your account, you will need to create a database. We used a free AtlasCluster, but more advanced options are avaliable. You will find the ability to set up and get connection information for your database within the cluster. MongoDB has a helpful [user manual](https://www.mongodb.com/docs/manual/) and a instructional [YouTube playlist](https://www.youtube.com/watch?v=ExcRbA7fy_A&list=PL4cUxeGkcC9h77dJ-QJlwGlZlTd4ecZOA) we found helpful in getting our database set up correctly.

**Database Name**
A *Database Name* will be needed in your personalization of the source code. Make sure it is simple and avoids the use of spaces and special characters. Upon creating your database, you will need to create 5 collections with the names exactly as below. 

**Collections:**
1. user_credentials
2. UserProjects
3. ProjectTasks
4. projectMembers
5. References

**Connection String**
You can find the uri connection string in your MongoDB desktop hub.  

First we recommend creating a database user called *admin* in the Database Access section of Security, but you can also use your own login information if you're having difficulty getting it to work.

Secondly, when you have your database selected, you can select 'Overview' > 'Connection' > 'Drivers'. This window will show you a code sample that includes the uri string you will need to personalize with either your database admin user information or your personal login information before pasting over into the source code.

### CircleCI
Upon having a CircleCI account, you will need to create a new 'Project'. We titled ours academic_activity for simplicity. Once your project is set up you'll need to go into the 'Project Settings' in order to set up your connections to your forked GitHub repository. Additionally you will need to create environment variables

### Necessary Adjustments to files for your own use
For locations that you need to update the code to your personal framework credentials, we have created a commented line with the tag **"PERSONALIZATION:"** that includes instructions on what credentials or APIs you will need to set up.

***Before getting started you will need the following:***
1. MongoDB account with a database that includes a database name, collections, and connection string listed out above.
2. CircleCI account that has been integrated into your forked github repository.
3. Docker account with a hub set up you can direct images to.

*Please review sections above with directions on basic needs.*

You can find required connection updates in the following locations:
MongoDB connections:
1. \Backend\BackendAcademic\index.js

CircleCI:
1. \.circleci\config.yml

Docker:
1. \docker-compose.yml
2. \Backend\backendAcademic\Dockerfile
3. \Frontend\AcademicTool\Dockerfile

### Unit Testing Code Cases
Our unit testing is set up two locations, one for frontend and other for backend. These are called when the CircleCi and Docker are set up. But you can run them separately as well by using the Jest run. You are welcome to review these test cases and add on as you find necessary for your needs and improvement to the program.

Frontend:
+ \Frontend\AcademicTool\components\test

Backend:
+ \Backend\backendAcademic\test

Additionally on the backend we used Postman to test our APIs.  [Postman](www.postman.com) is a API integration tool that that can be used via an internet browser.  But at this moment we were having difficulties to get the Postman unit testing to work correctly with their Newman integration with CircleCI and Docker.  Postman is very easy to get started and testing your invidual code. But we ran into some integration troubles we weren't able to resolve as our attention was needed on other tasks.  So when considering longer term investment and what is sustainable for a team environment, we recommend using [Jest](https://jestjs.io/). We have started moving our backend testing to Jest because it is the primary tester for the frontendaf, was much easier to handle compatability/version control, and uses code that's tangible in your repository.  Unless you are familiar with the Postman, CircleCI, and Docker integration while using a bridged Docker environment, we recommend investing your learning in the Jest framework if you want to limit how much time required to get going. And limit Postman to a quick API builder before you push it to the repository for further unit testing and team integration. This will also make sure everyone is working on the same API code versions.

### Backend Data Structure Documentation
Additionally we have provided some of the reference files that we used to document our data objects, discussions of developing APIs, and unit testing development for our various object classes. This also includes JSON examples for each data object and the various features we wanted to develope into our activity management system. These JSON files is how we call back and forth from the frontend and backend, so getting everyone on the same page was important. These files are not being actively used in the program runs. But was helpful in team communications and documenting on decisions during program review and planning for the sprints.

***Data Objects Reference Folder:***
\Backend\backendAcademic\Object_References

## Running the program
### Instructions to run the app without Docker:
**Open vs code or any editor, open the terminal, and then our project folder:**
```
cd path\to\Backend
cd backendAcademic
npm i
node index.js
```

You will get a prompt that you are connected with the database.

Now, open a second terminal:
```
cd path\to\Frontend
cd AcademicTool
npm i
npm run dev
```

Now you get a link to the local host, 5173, follow the link to open the application.
 
**Open the app in your browser:**
http://localhost:5173


### Instructions to run with Docker:
**Set up the custom bridge network used to connect the containers:**
```
docker network create bridge_network
```

**Build the docker images for the containers:**
```
cd path \academic_activity>
docker build -t harish492/docker_assignment:AA_FE_latest -f Frontend/AcademicTool/Dockerfile .
cd path/to/frontend
docker build -t harish492/docker_assignment:AA_BE_latest -f Backend/backendAcademic/Dockerfile .
```

**Verify it’s running:**
```
docker run -d –name backend-container --network bridge_network -p 5038:5038 backend-image
docker run -d –name frontend-container --network bridge_network -p 5173:8080 frontend-image
```

**Run the containers on the bridged network:**
```
docker-compose up --build
```

**(Optional) Check Docker status:**
```
docker ps
```

**Open the app in your browser:**
> http://localhost:5173

# Suggestions for Future Development:
***Ability to create reports:***
+ Yearly activity reports for performance reviews
+ Curriculum vitae for job search or research profile
+ Raw output in JSON format that can be easily used, saved, and shared.
+ Allow users to create their own APIs.
+ Bibliography generator for projects references or publications of completed projects.
+ DashBoards to view the user activities on graphs.

Other enhancements could include API integrations with existing common education platforms.

***For student classes***
+ Canvas

***For programming students***
+ Jira
+ GitHub

***Industry project management systems***
+ Asana 
+ Quickbase
+ Zoho

***Other primary calendars***
+ Outlook 
+ Google
+ Apple

***Other***
+ Spinit exercise or task randomizer.
+ Personal life managers such as health and dieting tracking.

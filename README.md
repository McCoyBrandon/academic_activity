# Academic Activity Task and Portfolio Assistant

Team Members:
Harish Korukonda,
Vardhan Pothu,
Vineetha Ravulapalli,
Brandon McCoy

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
NodeJS: https://nodejs.org/en
Vite: https://vitejs.dev/
React: https://legacy.reactjs.org/
Jest: https://jestjs.io/

***Backend: NodeJS, React, Jest***
For the backend we used a monolithic architecture. We used MongoDB for our datawarehouse for its flexibility, especially when dealing with nested data structures. We found this important as a core data structure issue we would have to tackle is a diverse set of tags that can be applied to projects and tasks.  Additionally we used Postman to build out tests for our MongoDB APIs.  Additionally we used CircleCI for our CI/CD pipeline and automated unit testing.  And Docker for container environment and image generations.

To find more information you can find downloads and user guides on their respective websites:
GitHub: https://github.com/
NodeJS: https://nodejs.org/en
Express: https://expressjs.com/
MongDB: https://www.mongodb.com/
Postman: https://www.postman.com/

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
Upon setting up your account, you will need to create a database. We used a free AtlasCluster, but more advanced options are avaliable. 

**Database Name**
Will be needed in your personalization of the source code. Make sure it is simple and avoids the use of spaces and special characters. Upon creating your database, you will need to create the following collections. 

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
Upon having a CircleCI account, you will need to create a new 'Project'. We titled ours academic_activity for simplicity. Once your project is set up you'll need to go into the 'Project Settings' in order to set up your connections to your forked GitHub repository. 

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
3. \Frontend\Dockerfile

## Running the program
### Instructions to run the app without Docker:
**Open the file directory and start the program:**
```
cd
```
 
**Open the app in your browser:**
http://localhost:3000


### Instructions to run with Docker:
**Set up the custom bridge network used to connect the containers:**
```
docker network create bridge_network
```

**Build the docker images for the containers:**
```
cd path/to/frontend
docker build -t frontend-image .
cd path/to/backend
docker build -t backend-image .
```

**Verify it’s running:**
```
docker run -d –name frontend-container --network bridge_network -p 3000:3000 frontend-image
docker run -d –name backend-container --network bridge_network -p 8080:8080 backend-image
```

**Run the containers on the bridged network:**
```
docker ps
```

**Open the app in your browser:**
> http://localhost:3000

## Suggestions for Future Development:
***Ability to create reports:***
> Yearly activity reports for performance reviews
> Curriculum vitae for job search or research profile
> Raw output in JSON format that can be easily used, saved, and shared.
> Allow users to create their own APIs.
> Bibliography generator for projects references or publications of completed projects.
> DashBoards to view the user activities on graphs.

Other enhancements could include API integrations with existing common education platforms.
***For student classes***
> Canvas
***For programming students ***
> Jira, GitHub
***Industry project management systems***
> Asana, Quickbase, Zoho
***Other primary calendars***
> Outlook, Google, Apple
***Other**
> Spinit exercise or task randomizer.
> Personal life managers such as health and dieting tracking.

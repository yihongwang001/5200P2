## cs5200-project-2

<h1 align="center">Art Gallery Management System
  <br>
  by Jiayi Ning & Yihong Wang
  <br>
</h1>

### Task 1: Provide the problem requirements and the conceptual model in UML for your project. 

https://github.com/yihongwang001/5200P2/blob/main/tasks1-3/Business%20Requirements.pdf
![Image of UML](https://github.com/yihongwang001/5200P2/blob/main/tasks1-3/UML.png?raw=true)

#### Task 2: Adapt the Logical Data model to have hierarchical tables.
![Image of ERD](https://github.com/yihongwang001/5200P2/blob/main/tasks1-3/ERD.png?raw=true)

### Task 3: From this logical model define the main Collections you will be using in your Mongo Database. Provide a couple of JSON examples of these objects with comments when necessary
#### The main collections we use in the application are the Artworks and Artists
![Image of Collections](https://github.com/yihongwang001/5200P2/blob/main/tasks1-3/Collections.png?raw=true)

### Task 4：Populate the tables with test data.
Test collections artworks.json and artists.json are included in db folder (see further instructions below).

### Task 5: Define and execute at least five queries that show your database. 
https://github.com/yihongwang001/5200P2/blob/main/db/queries.js
#### instuctions to run queries via terminal:
1. inside db folder
2. run: npm run queries


### instuctions to import database and run application
1. connect to your mongodb with localhost:27017
2. clone the repo
3. inside the repo folder, bash import the file using mongoimport
mongoimport -h localhost:27017 -d Arts -c artworks --drop --jsonArray ./db/artworks.json
mongoimport -h localhost:27017 -d Arts -c artists --drop --jsonArray ./db/artists.json
4. run: npm install
5. run: npm start
6. check localhost:3000





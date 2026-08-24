# Northem War

This project involves building a backend designed to integrate with the existing frontend available here: [FrontEnd Git Repo](https://github.com/hananFr/frontend-northern-war). The backend will consist of an Express server capable of handling requests to a MongoDB database, along with business logic that follows the rules of the conquest game.

## Database choice

I chose to use MongoDB—even though foreign keys are useful and MongoDB doesn't support them—because it offers the ability to store elements like objects or JSON and provides flexibility in data storage. Since I don't yet know the exact structure of the data I'll be storing and therefore cannot define a fixed schema (like table rows), using a NoSQL database is the right choice.

## Running and installing instructions

In the project's backend root directory, you should install the project dependencies using `npm i`, rename the `.env.example` file to `.env`, and populate it similarly to the example with your personal data (to enable the connection to MongoDB). Then, for a compatible environment, please run this Docker command: `docker compose up -d`

## Structure file

````
C:.
|   .dockerignore
|   .env
|   .env.example
|   .gitignore
|   docker-compose.yml
|   DockerFile
|   exam-backend.md
|   exam-links.md
|   package-lock.json
|   package.json
|   README.md
|   tree.txt
|   
+---frontend-northern-war-main
|   |   app.js
|   |   index.html
|   |   styles.css
|   |   
|   \---assets
|           israel-lebanon-map-clean.png
|           israel-lebanon-map.png
|           
|           
\---server
    |   server.js
    |   
    +---data
    |       map.js
    |       map.json
    |       
    +---db
    |       connect.js
    |       
    +---middleware
    |       midlleware.js
    |       
    +---repo
    |       game-repo.js
    |       map-repo.js
    |       
    +---routes
    |       route.js
    |       
    +---services
    |       services.js
    |       
    \---utilis
            utilis.js
````
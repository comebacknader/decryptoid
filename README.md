## DECRYPTOID

A web application that enables users to upload a text file, and select between different encryption/decryption algorithms to operate on said file. 

To run application, first clone the repositor:

`git clone https://github.com/comebacknader/decryptoid.git`

Change directory into the app directory: 

`cd decryptoid`

Pull the mysql image from docker: 

`docker pull mysql:5.7`

Run the database container by entering the following command:

`docker container run -d -p 3306:3306 --mount type=bind,source="$(pwd)"/mysql_init.sql,destination=/docker-entrypoint-initdb.d/mysql_init.sql -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=decryptoidb -e MYSQL_USER=nadercarun -e MYSQL_PASSWORD=secret --name decryptoid-mysql mysql:5.7`

Wait a few seconds for the database to initialize. Then run the NodeJS application: 

`node app.js`

Then type in your browser URL: 

`localhost:3000`

And enjoy! 

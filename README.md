## DECRYPTOID

A cryptography suite.

To run the container, enter the following command:

`docker container run -d -p 3306:3306 --mount type=bind,source="$(pwd)"/mysql_init.sql,destination=/docker-entrypoint-initdb.d/mysql_init.sql -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=decryptoidb -e MYSQL_USER=nadercarun -e MYSQL_PASSWORD=secret --name decryptoid-mysql mysql:5.7`

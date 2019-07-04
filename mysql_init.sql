-- ALTER USER nadercarun@'localhost' IDENTIFIED WITH mysql_native_password BY 'secret';

CREATE TABLE Users(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	digest VARCHAR(255) NOT NULL
);

CREATE TABLE Files(
	id INT NOT NULL AUTO_INCREMENT,
	user_id INT NOT NULL,
	filename VARCHAR(255),
	contents MEDIUMTEXT,
	time_created TIMESTAMP,
	cipher VARCHAR(100),
	PRIMARY KEY(id),
	FOREIGN KEY(user_id) REFERENCES Users(id));


    
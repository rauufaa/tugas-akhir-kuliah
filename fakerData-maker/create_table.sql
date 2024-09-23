CREATE TYPE gender AS ENUM ('M', 'F');

CREATE TABLE users (
	user_id SERIAL,
	first_name VARCHAR(255) DEFAULT NULL,
	last_name VARCHAR(255) DEFAULT NULL,
	bio VARCHAR(255),
	phone_number VARCHAR(15),
	email VARCHAR(50) DEFAULT NULL,
	gender gender DEFAULT NULL,
	PRIMARY KEY (user_id)
)

ALTER TABLE users
	ALTER COLUMN bio DROP NOT NULL,
	ALTER COLUMN phone_number DROP NOT NULL;

SELECT * FROM users;

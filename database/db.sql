CREATE DATABASE tasksdb;

\c tasksdb

CREATE TABLE task(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) UNIQUE,
  description VARCHAR(255)
);

SELECT * FROM task;
SELECT NOW();
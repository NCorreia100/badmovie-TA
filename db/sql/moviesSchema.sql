-- SET UP SCHEMA HERE

CREATE DATABASE IF NOT EXISTS badmovies;
USE badmovies;

CREATE TABLE IF NOT EXISTS movies(
    MOVIE_ID int(8)  PRIMARY KEY,
    TITLE varchar(30) UNIQUE NOT NULL,
    GENRE varchar(20) NOT NULL,
    RELEASED_DATE  DATETIME  DEFAULT CURRENT_TIMESTAMP,
    RATING float(3,2),
    FAVORITES_Q INT(3) DEFAULT 0 
);

CREATE TABLE IF NOT EXISTS users (
    USER_ID int(8) AUTO_INCREMENT PRIMARY KEY,
    USERNAME varchar(20) UNIQUE,
    PASSWORD varchar(20),
    LAST_LOGIN DATETIME DEFAULT CURRENT_TIMESTAMP  
);

CREATE TABLE IF NOT EXISTS favorites (
    FAVORITE_ID int(12) AUTO_INCREMENT PRIMARY KEY,  
    DATE_ADDED DATETIME DEFAULT CURRENT_TIMESTAMP,
    USER_ID int(8),
    MOVIE_ID int(8),
      FOREIGN KEY(USER_ID) 
        REFERENCES users (USER_ID), 
     FOREIGN KEY(MOVIE_ID)
         REFERENCES movies (MOVIE_ID)
);
-- only defined as pk due to mysql error, user_id and movie_id are a combined key
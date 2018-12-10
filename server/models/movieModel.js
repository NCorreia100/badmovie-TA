//SELECT one db to work with
//For SQL
const db = require('../../db/sql');

//For Mongo
// const mongoDb = require('../../db/mongodb')

module.exports = {
    loadUser: (username) => {
        db.connection.query(
            `Select * FROM users WHERE USERNAME =?;`
            , username
            , (err, result) => {
                if (err) console.log(err);
                return result;
            });

    }
    , saveNewUser: ({ username, password }) =>
        db.connection.query(
            `INSERT INTO users (USERNAME,PASSWORD) VALUES (?,?)`
            , [username, password]
            , (err, result) => {
                if (err) console.log(error);
                return result;
            }
        )
    , saveMovie: ({ id, title, genre, released, favorites }) =>
        db.connection.query(
            `INSERT INTO movies (MOVIE_ID,TITLE,GENRE,RELEASED_DATE,FAVORITES_Q)
         VALUES (?,?,?,?,?)`
            , [id, title, genre, released, favorites + 1]
            , (err, result) => {
                if (err) console.log(err);
                return result;
            }
        )
    , saveFavorite: (movieId, userid) =>
        db.connection.query(
            `INSERT INTO favorites (MOVIE_ID, USER_ID) VALUES (?,?)`
            , [movieId, userid]
            , (err, result) => {
                if (err) console.log(err);
                return result;
            }
        )
    , deleteFavorite: (movieId, userId) =>
        db.connection.query(
            `DELETE FROM favorites WHERE userId=? AND movieId=?`
            , [userId, movieId]
            , (err, result) => {
                if (err) console.log(err);
                return result;
            }
        )
    , getAllFavorites: (userId) => {
        db.connection.query(
            `Select * FROM movies m INNER JOIN favorites f ON m.MOVIE_ID=f.MOVIE_ID
            WHERE f.USER_ID = ? ORDER BY m.RATING DESC;`
            , userId
            , (err, result) => {
                if (err) console.log(err);
                return result;
            }
        )
    }
}

// get:  (callback)=> {
//     con.query(
//                 `Select U.USERNAME, R.ROOM_NAME, M.TEXT, M.CREATED_AT
//                   FROM messages M 
//                   INNER JOIN users U ON M.USER_ID = U.USER_ID AND
//                   INNER JOIN ROOMS R ON M.ROOM_ID = R.ROOM_ID
//                   ORDER BY M.CREATED_AT DESC;`
//       , function( err) {
//         if(err) callback(err);
//      console.log('messages--Get:', result);
//      return result;
// })
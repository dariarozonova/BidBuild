const mysql = require('mysql2');

const pool = mysql.createPool({
 connectionLimit: process.env.CONNECTION_LIMIT,
 password: process.env.DB_PASS,
 user: process.env.DB_USER,
 database: process.env.DB_NAME,
 host: process.env.DB_HOST,
 port: process.env.DB_PORT
});
 
let db = {};

db.checkIfExists = (email, role) => {
  let query;
  if (role === "Piegādātājs") {
    query = 'SELECT COUNT(*) as count FROM Piegadatajs WHERE Epasts = ?';
  } else if (role === "Klients") {
    query = 'SELECT COUNT(*) as count FROM Klients WHERE Epasts = ?';
  }
  return new Promise((resolve, reject) => {
    pool.query(query, [email], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result[0].count > 0);
      }
    });
  });
}

db.getUserPassword = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const seller = await db.getSellerByEmail(email);
      if (seller) {
        resolve({ exists: true, role: 'seller', name: seller.Vards, surname: seller.Uzvards, password: seller.Parole });
      }

      const buyer = await db.getBuyerByEmail(email);
      if (buyer) {
        resolve({ exists: true, role: 'buyer', name: buyer.Vards, surname: buyer.Uzvards, password: buyer.Parole });
      }

      resolve({ exists: false });
    } catch (error) {
      reject(error);
    }
  });
};
 
db.getAllSellers = () =>{
  return new Promise((resolve, reject)=>{
    pool.query('SELECT * FROM Piegadatajs ', (error, users)=>{
      if(error){
        return reject(error);
      }

      return resolve(users);
    });
  });
};

db.getAllBuyers = () =>{
  return new Promise((resolve, reject)=>{
    pool.query('SELECT * FROM Klients ', (error, users)=>{
      if(error){
        return reject(error);
      }
      return resolve(users);
    });
  });
};
 
db.getSellerByEmail = (email) =>{
  return new Promise((resolve, reject)=>{
    pool.query('SELECT * FROM Piegadatajs WHERE Epasts = ?', [email], (error, users)=>{
      if(error){
        return reject(error);
      }
      return resolve(users[0]);
    });
  });
};

db.getBuyerByEmail = (email) =>{
  return new Promise((resolve, reject)=>{
    pool.query('SELECT * FROM Klients WHERE Epasts = ?', [email], (error, users)=>{
      if(error){
        return reject(error);
      }
      return resolve(users[0]);
    });
  });
};
 
db.insertBuyer = (Vards, Uzvards, Talr_nr, Epasts, Parole, Pilseta) =>{
  return new Promise((resolve, reject)=>{
    pool.query('INSERT INTO Klients (Vards, Uzvards, Talr_nr, Epasts, Parole, Pilseta) VALUES (?, ?, ?, ?, ?, ?)', [Vards, Uzvards, Talr_nr, Epasts, Parole, Pilseta], (error, result)=>{
      if(error){
        return reject(error);
      }
    
      return resolve(result.insertId);
    });
  });
};

db.insertSeller = (Vards, Uzvards, Talr_nr, Epasts, Pieredze, Parole, Pilseta) =>{
  return new Promise((resolve, reject)=>{
    pool.query('INSERT INTO Piegadatajs (Vards, Uzvards, Talr_nr, Epasts, Pieredze, Parole, Pilseta) VALUES (?, ?, ?, ?, ?, ?, ?)', [Vards, Uzvards, Talr_nr, Epasts, Pieredze, Parole, Pilseta], (error, result)=>{
      if(error){
        return reject(error);
      }
     
      return resolve(result.insertId);
    });
  });
};
 
db.updateSeller = (userName, role, email, password, id) =>{
  return new Promise((resolve, reject)=>{
    pool.query('UPDATE User SET UserName = ?, Role_ID= ?, Email= ?, Password=? WHERE User_ID = ?', [userName, role, email, password, id], (error)=>{
      if(error){
        return reject(error);
      }
    
      return resolve();
    });
  });
};

db.updateBuyer = (userName, role, email, password, id) =>{
  return new Promise((resolve, reject)=>{
    pool.query('UPDATE User SET UserName = ?, Role_ID= ?, Email= ?, Password=? WHERE User_ID = ?', [userName, role, email, password, id], (error)=>{
      if(error){
        return reject(error);
      }
     
     return resolve();
    });
  });
};
 
db.deleteBuyer = (id) =>{
  return new Promise((resolve, reject)=>{
    pool.query('DELETE FROM Users WHERE User_ID = ?', [id], (error)=>{
      if(error){
        return reject(error);
      }
    return resolve(console.log("User deleted"));
    });
  });
};

db.deleteBuyer = (id) =>{
  return new Promise((resolve, reject)=>{
    pool.query('DELETE FROM Users WHERE User_ID = ?', [id], (error)=>{
      if(error){
        return reject(error);
      }
      return resolve(console.log("User deleted"));
    });
  });
};

////////////////////////////////
 
db.allMovies = () =>{
  return new Promise((resolve, reject)=>{
   pool.query('SELECT * FROM movies ', (error, movies)=>{
    if(error){
     return reject(error);
    }
    return resolve(movies);
   });
  });
 };
 
 db.getMovieByID = (Movie_ID) =>{
  return new Promise((resolve, reject)=>{
   pool.query('SELECT * FROM Movies WHERE Movie_ID = ?', [Movie_ID], (error, movies)=>{
    if(error){
     return reject(error);
    }
    return resolve(Movie_ID[0]);
   });
  });
 };

 db.insertMovie = (Title, Runtime, Description, Year, Genre, Publisher_ID, Language_ID) =>{
  return new Promise((resolve, reject)=>{
   pool.query('INSERT INTO movies (Title, Runtime, Description, Year, Genre, Publisher_ID, Language_ID) VALUES (?, ?, ?, ?, ?, ?, ?)', [title, runtime, description, year, genre, publisher_ID, language_ID], (error, result)=>{
    if(error){
     return reject(error);
    }

     return resolve(result.insertId);
   });
  });
 };
  
 db.updateMovie = (Title, Runtime, Description, Year, Genre, Publisher_ID, Language_ID) =>{
  return new Promise((resolve, reject)=>{
   pool.query('UPDATE movies SET Title = ?, Runtime = ?, Description = ?, Year = ?, Genre = ?, Publisher_ID = ?, Language_ID = ? WHERE Movie_ID = ?', [title, runtime, description, year, genre, publisher_ID, language_ID, Movie_ID], (error)=>{
    if(error){
     return reject(error);
    }
     
     return resolve();
   });
  });
 };
  
 db.deleteMovie = (id) =>{
  return new Promise((resolve, reject)=>{
   pool.query('DELETE FROM movies WHERE Movie_ID = ?', [id], (error)=>{
    if(error){
     return reject(error);
    }
    return resolve(console.log("Movie deleted"));
   });
  });
 };
 
module.exports = db
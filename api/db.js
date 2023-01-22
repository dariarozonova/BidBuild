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
 
module.exports = db
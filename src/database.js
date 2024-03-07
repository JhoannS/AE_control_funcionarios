const mysql = require('mysql2/promise')

const {database} = require('./keys');
const { createPool } = require('mysql2');


const connectionDB = async () => {
   const pool =  mysql.createPool(database);
   if(pool){
      console.log(">>> Conectado a la BD");
   }


   module.exports = pool; }
   connectionDB();







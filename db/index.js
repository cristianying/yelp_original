const {Pool} = require("pg");
//the database variables are in the .env files. PG library automatically
//fetches the data from .env
// const pool = new Pool();

// module.exports={
//     query: (text, params)=>pool.query(text,params),
// };


require("dotenv").config();

const devConfig = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
};

//const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const proConfig = {connectionString: process.env.DATABASE_URL,} //heroku addons

const pool = new Pool(
    process.env.NODE_ENV === "production" ? proConfig : devConfig,
);

module.exports = pool;
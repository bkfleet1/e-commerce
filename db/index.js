const mysql = require('mysql2');
const Sequelize = require('sequelize');

require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        dialectOptions: {
            decimalNumbers: true,
        }
    });
};

const schema = () => {
    sequelize.query('./db/schema.sql', (err, res) => {
        if (err) throw err
        else { console.log('Database successfully created', res) }
    })
};

schema();

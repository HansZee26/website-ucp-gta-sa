import Sequelize from "sequelize";

const db = new Sequelize('classy', 'root', 'awokawok', {
    host: "localhost",
    dialect: "mysql"
});

export default db;
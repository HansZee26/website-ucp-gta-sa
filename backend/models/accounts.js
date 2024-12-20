import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Accounts = db.define('accounts', {
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    refresh_token: {
        type: DataTypes.TEXT
    },
},{
    freezetable: true
});

// (async () => {
//     await db.sync();
// }) (0);

export default Accounts;
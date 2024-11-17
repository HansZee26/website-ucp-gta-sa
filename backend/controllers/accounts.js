import Accounts from "../models/accounts";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Accounts from "../models/accounts";

export const getAccounts = async (req, res) => {
    try {
        const Accounts = await Accounts.findAll({
            attributes:['id', 'name', 'email']
        });
        res.json(Accounts);
    } catch (error) {
        console.log(error)
    }
}

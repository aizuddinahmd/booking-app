import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../../database/index.js";

const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    //check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "please put email and password" });
    }

    // check if email exists in the database
    const query = `
            SELECT * FROM users
            WHERE email = $1 
        `;

    const checkRes = await pool.query(query, [email]);
    const user = checkRes.rows[0];

    //if user is not found return 404
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    //check if password is correct using bcrypt
    const isValidPassword = bcrypt.compareSync(password, user.password);

    // if password is not correct return 401

    // create token using jwt
  } catch (error) {}
};

export default login;

import { pool } from "../../database/index.js";

const query = `INSERT INTO users(email, password) VALUES($1, $2)`;

async function registerUser(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const dbRes = await pool.query(query, [email, password]);
    res.status(200).json({ message: "user is created" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export default registerUser;

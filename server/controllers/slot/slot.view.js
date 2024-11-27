import { pool } from "../../database/index.js";

const query = `
SELECT * FROM slots
`;

const viewAllSlot = async (req, res) => {
  try {
    const dbRes = await pool.query(query);
    res.status(200).json({ data: dbRes.rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default viewAllSlot;

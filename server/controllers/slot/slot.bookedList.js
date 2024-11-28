import { pool } from "../../database/index.js";

const bookedSlot = `
SELECT * FROM slots
WHERE customer_name IS NOT NULL AND customer_email IS NOT NULL AND customer_phone IS NOT NULL
`;

const viewAllBookedSlot = async (req, res) => {
  try {
    const dbRes = await pool.query(bookedSlot);
    console.log(dbRes.rows);
    res.status(200).json({ message: dbRes.rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default viewAllBookedSlot;

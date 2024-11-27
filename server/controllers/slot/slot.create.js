import { pool } from "../../database/index.js";

const query = `
INSERT INTO slots(date, time) 
VALUES($1, $2)
RETURNING *
`;

const checkDateTimeExists = `
SELECT * FROM slots
WHERE date = $1 AND time= $2
`;

const createNewSlot = async (req, res) => {
  try {
    const date = req.body.date;
    const time = req.body.time;

    // validation for time and date
    if (!date || !time) {
      return res.status(400).json({
        error: "date and time required",
      });
    }

    //check if slot are already exist
    const checkRes = await pool.query(checkDateTimeExists, [date, time]);
    if (checkRes.rows.length > 0) {
      //   console.log(error);
      return res.status(400).json({ error: "slot already exist" });
    }

    const dbRes = await pool.query(query, [date, time]);
    res.status(200).json({ message: "slot is created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default createNewSlot;

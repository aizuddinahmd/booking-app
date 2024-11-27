import { pool } from "../../database/index.js";

const checkSlotsBooked = `
SELECT * FROM slots
WHERE id = $1 AND customer_name IS NOT NULL AND customer_email IS NOT NULL AND customer_phone IS NOT NULL
`;

const updateSlot = `
UPDATE slots
SET customer_name = $1, customer_email = $2, customer_phone = $3
WHERE id = $4
`;

const bookASlotForPublic = async (req, res) => {
  try {
    const name = req.body.customer_name;
    const email = req.body.customer_email;
    const phone = req.body.customer_phone;
    const id = req.params.id;

    if (!customerName || !customerPhone || !customerEmail) {
      return res
        .status(400)
        .json({ message: "Customer name, phone, and email are required" });
    }

    const bookedSlot = await pool.query(checkSlotsBooked, [id]);
    if (bookedSlot.rows.length) {
      return res.status(400).json({
        message: "slot already booked",
      });
    }
    const dbRes = await pool.query(updateSlot, [name, email, phone, id]);
    console.log(dbRes.rows);

    res.status(200).json({ message: "your slot has been booked" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default bookASlotForPublic;

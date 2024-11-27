import { pool } from "../../database/index.js";

const deleteQuery = `
DELETE FROM slots WHERE id=$1
`;

const deleteSlotById = async (req, res) => {
  try {
    const id = req.params.id;
    const dbRes = await pool.query(deleteQuery, [id]);
    res.status(200).json({ message: "slot deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default deleteSlotById;

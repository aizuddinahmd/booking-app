import { pool } from "../database/index.js";

// create users table
// id, username, password, email, is_admin, created_at

const query = `
CREATE TABLE IF NOT EXISTS slots(
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  time TIME NOT NULL,
  customer_name VARCHAR(255),
  customer_email VARCHAR(255),
  customer_phone VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
`;

async function createSlotsTable() {
  try {
    await pool.query(query);
    console.log("Slots table is created");
  } catch (error) {
    console.error(error);
  }
}

export default createSlotsTable;

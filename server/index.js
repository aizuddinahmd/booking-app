import express from "express";
import "dotenv/config";
import publicRouter from "./routes/index.js";
import privateRouter from "./routes/admin.js";
import { databaseInit } from "./database/index.js";
import registerUser from "./controllers/auth/register.js";
import createNewSlot from "./controllers/slot/slot.create.js";
import viewAllSlot from "./controllers/slot/slot.view.js";
import deleteSlotById from "./controllers/slot/slot.delete.js";
import bookASlotForPublic from "./controllers/slot/slot.public.booking.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// database connection and execute DDL queries to create tables
databaseInit();

app.use("/", publicRouter);
app.use("/admin", privateRouter);

app.post("/register", registerUser);
app.post("/slots/:id/book", bookASlotForPublic);

app.post("/admin/slots", createNewSlot);
app.delete("/admin/slots/:id", deleteSlotById);

app.get("/admin/slots", viewAllSlot);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

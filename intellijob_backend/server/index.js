import express from "express";
import cors from "cors"; // Add this to the list of imports

const app = express();

app.use(cors()); // Use the cors middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("working fine");
});

import dotenv from "dotenv"; // Add to import list

dotenv.config(); // Configure dotenv to access the env variables

const PORT = process.env.PORT || 8080; // Use this instead of hardcoding it like before

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
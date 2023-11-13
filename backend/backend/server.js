const dotenv = require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connectDB");
const taskRoutes = require("./routes/taskRoute");
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 

app.use(cors({
  origin: ["http://localhost:3000" ]
}));

app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async (arg) => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}; 

startServer();

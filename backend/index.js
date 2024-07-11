const express = require('express');

const bodyParser = require('body-parser');
const { userRouter } = require('./routes/userRoutes');
const mongodbConnection = require('./dbConnection/dbConnection');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api",userRouter);


app.listen(8000, async () => {
  try {
    await mongodbConnection
    console.log("MongoDB connected");
    console.log(`Server is running on port 8000`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); 
  }
});

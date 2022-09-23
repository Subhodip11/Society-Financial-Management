const express = require('express');
const app = express();
const { dbConnect } = require('./connectToDB');
const cors = require('cors');

dbConnect();

app.use(express.json());
app.use(cors());

app.use(require('./Routes/registerSociety'))


app.listen(1221, () => console.log("Server started at port 1221..."))
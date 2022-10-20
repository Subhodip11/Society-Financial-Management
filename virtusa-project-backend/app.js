const express = require('express');
const app = express();
const { dbConnect } = require('./connectToDB');
const cors = require('cors');
const cookieParser = require('cookie-parser');
app.use(cookieParser())

dbConnect();

require('dotenv').config();
app.use(express.json());
app.use(cors());
app.use(require('./Routes/loginAdmin'));
app.use(require('./Routes/registerSociety'));
app.use(require("./Routes/updateSociety"));
app.use(require("./Routes/searchSociety"));
app.use(require('./Routes/otpVerification'));
app.use(require('./Routes/forgotPasswrod'));
app.use(require('./Routes/emailVerification'));
app.use(require('./Routes/logoutAdmin'));

app.listen(1221, () => console.log("Server started at port 1221..."))
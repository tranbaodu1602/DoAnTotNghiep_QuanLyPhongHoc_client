const express = require('express');
const dotenv = require('dotenv');
// const mongoose = require('mongoose');
const routes = require('./routes/Routes');
const bodyParser = require('body-parser');
const mongoDB = require('./database/MongoDBConnect');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

dotenv.config();
mongoDB.connectDB();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

routes(app);

// mongoose
//     .connect(process.env.MONGO_DB)
//     .then(() => {
//         console.log('MongoDB Connected');
//     })
//     .catch((err) => {
//         console.log('Error:' + err);
//     });

app.listen(PORT, () => {
    console.log('Server is running on port: ' + PORT);
});

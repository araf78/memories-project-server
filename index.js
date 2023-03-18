import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv"

import postRoutes from './routes/posts.js';

const app = express();
dotenv.config();
// MVC pattern 

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

app.use(cors());

app.use('/posts', postRoutes);

// mongodb pass>> XicrG5MQQEpz2ELF

// connection url get to mongoose side database access , network access, database > create cluster so on... 
const CONNECTION_URL = 'mongodb://localhost:27017';
const PORT = process.env.PORT || 5000;
// const CONNECTION_URL = 'mongodb+srv://robot-memories:XicrG5MQQEpz2ELF@cluster0.3bc3ld9.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUniFiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
.catch((error) => console.log(error.message))

// set any warning in the console .then() and .catch()
// mongoose.set('useFindAndModify', false);

import express, { json } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import categoryRoute from './routes/categoryRoute.js';
import productRoute from './routes/productRoute.js'
import cors from 'cors';
import path from 'path';
import {fileURLToPath} from 'url';
// import {MongoClient} from 'mongodb'; //

// rest object...
const app = express();
// environment variable setup
dotenv.config();
//database connected...
connectDB();  

//esmodulefix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middleware...
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.static(path.join(__dirname, './client/build')));

// routes...
app.use('/api/auth', authRoute);
app.use('/api/category', categoryRoute);
app.use('/api/product', productRoute);

// rest api
// app.get("/", (req, res) => {
//   res.send("<h1>Welcome to our ecommerce app</h1>");
// });
app.use('*', function(req,res){
  res.sendFile(path.join(__dirname, './client/build/index.html'));
})

// Port and database...
// const PORT = process.env.PORT;
// const uri = process.env.MONGO_DB_URL; //
// const client = new MOngoClient(uri); //
// client.connect(err => {
//   if(err){consele.log(err);}
//   app.listen(PORT, () => {
//         console.log("listening for requests");
//     });
// });

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

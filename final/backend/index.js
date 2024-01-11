// 
import express from "express"
import mongoose from "mongoose"
import router from "./routers/Routes.js";
import cors from 'cors'; // Import the cors middleware
import cookieParser from 'cookie-parser';
import adminRouter from "./routers/adminRoutes.js";

//init 
const app = express()

//middleware
app.use(express.json());
app.use(cookieParser());
//body-parser
app.use(cors());




//mongo
mongoose.connect("mongodb+srv://pedro:pedro@gamedata.qotskvj.mongodb.net/GameData?retryWrites=true&w=majority")

//routes
app.use("/auth", router)
app.use("/api", adminRouter)

//listen
app.listen(3004, ()=>{
    console.log("Connected to port")
})









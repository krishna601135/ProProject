require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const userRouter = require('./routes/userRoute')
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({limit:"30mb", extended:true}));
app.use('/api', userRouter)
app.use("/uploads",express.static(path.join(__dirname,"uploads")))
// const url = "mongodb+srv://mohan:mohan123@cluster0.blx41yg.mongodb.net/"


// const jwt = require('jsonwebtoken')


// app.post('/login', (req, res) => {
//     const username = req.body.username
//     const user = {name: username}
//     try{
//     const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, );
//       res.json(`accessToken: ${accessToken}`)

//     }catch(err){
//         res.send(`${err.message}`)
//     }
// })


// app.get('/posts',  loginMiddlware, (req, res) => {
//     res.json(posts)
// })

const connectMongoDb = async()=>{
    try{

        const res = await mongoose.connect(process.env.MONGODB_URL)
        console.log("mongodb connected...")
        app.listen(process.env.PORT_NUMBER, () => {
            console.log(`server is started at ${process.env.PORT_NUMBER}`)
        })
    }
    catch(e){
        throw e
    }
}
connectMongoDb();

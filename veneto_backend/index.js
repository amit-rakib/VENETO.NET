import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/venetoDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})
 const User = new mongoose.model("User", userSchema)
//Routes
app.post("/login", (req, res)=> {
   const { email, password } = req.body
   User.findOne({ email: email}, (error, user) => {
    if(user){
         if(password === user.password){
            res.send({message: "Login Successfull", user: user})
         } else {
            res.send({ message: "Password didn't match"})
         }
    } else {
        res.send("User not registered")
    }
   })
})
app.post("/register", (req, res)=> {
   const { name, email, password } = req.body
   User.findOne({email: email}, (error, user) => {
     if(user){
        res.send({message: "User already registered"})
     }
   })
   const user = new User({
         name,
         email,
         password
   })
   user.save( error => {
    if(error){
        res.send(error)
    } else {
        res.send( { message: "Successfully Registered, Please login now"})
    }
   })
})

app.listen(9002, () => {
    console.log("Be started at port 9002")
})
const userModel = require("../models/AccountSchema");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
require('dotenv').config()

const posts = [
    {
        username: 'Mohan',
        title: 'post1'
    },{
        username: 'Murali',
        title: 'post2'
    }
]

class userController {
  createUserAccount = async (req, res) => {
    console.log(req.body, "nnnnn");
    const userName = req.body.userName;
    const mailId = req.body.mailId;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const details = await userModel.create({
        userName: userName,
        emailId: mailId,
        password: hashedPassword,
      });
      details.save();
      res.status(200).send("successfully created..........");
    } catch (err) {
      res.send(err);
    }
  };
  loginUserAccount = async(req, res) => {
    const userName = req.body.userName
    const password = req.body.password 
    try{
        const user = await userModel.findOne({userName})
        if(user && (await bcrypt.compare(password, user.password))){
            const token = jwt.sign({sName:userName}, process.env.ACCESS_SECRET_TOKEN)
            res.status(200).send(`token:${token}`) 
        }else{
            res.status(400).send(`userName not found::`)
        }
    
    }
    catch(err){
          res.send(err)
    }
  }
  getBooksData = async(req, res) => {
        res.send(posts)
  }
}

const usercontroller = new userController();
module.exports = usercontroller;

const {Router} = require("express");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const { Usermodel } = require("../model/user.model");
// var get_ip = require('ipware')().get_ip;

const userRouter = Router();


userRouter.get("/",(req,res)=>{
    res.send("UserPage")
})

userRouter.post("/signup", async(req,res)=>{
    
    const {email,password, confirmpassword}  = req.body;
    const hash = bcrypt.hashSync(password, 5);
    console.log(req.body)
    console.log(password,confirmpassword)
    if(password!=confirmpassword){
        res.send({msg:"Error, Password missmatches"})
    }
    const user = new Usermodel({
        email,
        password:hash,
    })
    try {
        await user.save();
        res.send({msg:"Signup successful"})
    } catch (error) {
        res.send({msg:error.message})
    }
})


userRouter.post("/login", async(req,res)=>{
  const  {email, password} = req.body;
  const user = await Usermodel.findOne({email});
  const hash = user?.password
  if(bcrypt.compareSync(password, hash)){
    const userId = user._id;
    var token = jwt.sign({}, 'qwerty');
   return res.send({msg:"login successful", token:token})
  }
  else{

     return res.send({msg:"Invalid Credential"})
  }

  


})





module.exports ={userRouter}
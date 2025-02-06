const Auth = require('../model/authmodel')
const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.signup = async(req,res)=>{
    try{
        // console.log(req.body)
        let checkemail = await Auth.find({email:req.body.email}).countDocuments();
        if(checkemail == 0){
            if(req.body.password == req.body.confirmpassword){
                   req.body.password = await bycrypt.hash(req.body.password,10)
                    let signupdata = await Auth.create(req.body);
                    if(signupdata){
                        res.status(200).json({msg:'signup sucessfully ',data:signupdata})
                    }
                    else{
                        res.status(200).send({msg:"Failed to signup"})
                    }
            }
            else{

                res.status(200).json({msg:'password and confirm password not match'})
            }
        }
        else{

            res.status(200).json({msg:'email already exist!!'})
        }
    }
    catch(err){
        res.status(400).json({msg:'something wrong',error:err})
    }
}


module.exports.signin = async(req,res)=>{
    try{
        let checkemail = await Auth.findOne({email:req.body.email});
        if(checkemail){
            let checkpass = await bycrypt.compare(req.body.password,checkemail.password);
            if(checkpass){
                let token = await jwt.sign({
                    userdata : checkemail
                },'shhh')
                res.status(200).json({msg:'signin sucessfully',data:token})
            }
            else{
                res.status(200).json({msg:'password not match!!'})
            }
        }
        else{
            res.status(200).json({msg:'email not found'});
        }
    }
    catch(err){
        res.status(400).json({msg:'something wrong',error:err})
    }
}
const express = require('express')
const routes  = express.Router()
const passport = require('passport')

console.log('rouing')



const userclt = require('../controller/userclt')

routes.get('/',passport.authenticate('jwt',{failureRedirect:'/unauth'}),userclt.home)

routes.get('/unauth',async (req,res)=>{
    res.status(400).json({msg:'you are unauthorized'})
})

routes.post('/addData',passport.authenticate('jwt',{failureRedirectP:'/unauth'}),userclt.addData)

routes.delete('/deletedata/:id',passport.authenticate('jwt',{failureRedirectP:'/unauth'}),userclt.deletedata)

routes.get('/singledata/:id',passport.authenticate('jwt',{failureRedirectP:'/unauth'}),userclt.singledata)

routes.patch('/updatedata/:id',passport.authenticate('jwt',{failureRedirectP:'/unauth'}),userclt.updatedata)

routes.use("/auth",require('./authroutes'))

module.exports = routes
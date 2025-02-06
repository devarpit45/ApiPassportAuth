const express = require('express')
const port = 8005;
const app = express();

const db = require('./config/mongoose')
app.use(express.urlencoded())

const passport = require('passport')
const jwtStrategy = require('./config/passport-jwt-strategy')
const session = require('express-session')

app.use(session({
    name: 'arpit',
    secret:'abc',
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:(1000*60*60)
    }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/',require('./routes/userroutes'))


app.listen(port,(err)=>{
    if(err){
        console.log(err)
    }
    console.log('server has been started')
})
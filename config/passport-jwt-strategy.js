const passport = require('passport')
const jwtstrategy = require('passport-jwt').Strategy;
const extrajwt = require('passport-jwt').ExtractJwt;

const opts = {
    jwtFromRequest :  extrajwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'shhh'
}

const Authmodel = require('../model/authmodel')

passport.use(new jwtstrategy(opts, async function(payload,done){
        let userdata = await Authmodel.findOne({email:payload.userdata.email})
        if(userdata){
            return done(null,userdata)
        }
        else{
            return done(null,false)
        }
}))

passport.serializeUser(function(user,done){
    return done(null,user.id)
})


passport.deserializeUser(async(id,done)=>{
    let userdata = await Authmodel.findById(id)
    if(userdata){
        return done(null,userdata)
    }
    else{
        return done(null,false)
    }
})

module.exports = passport
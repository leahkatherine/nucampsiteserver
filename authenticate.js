const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const JwtStrategy = require('passport-jwt').Strategy; 
const ExtractJwt = require('passport-jwt').ExtractJwt; 
const jwt = require('jsonwebtoken'); 

const config = require('./config.js'); //import the config.js file

exports.local = passport.use(new LocalStrategy(User.authenticate())); //authenticate method is provided by passport-local-mongoose
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser()); 

exports.getToken = (user) => {
    return jwt.sign(user, config.secretKey, {expiresIn: 3600}); //this will create a new token for the user
};

const opts ={}; 
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); //this will specify how the JWT should be extracted from the incoming request message
opts.secretOrKey = config.secretKey; //this will supply the secret key

exports.jwtPassport = passport.use(
    new JwtStrategy(
        opts,
        (jwt_payload, done) => {
            console.log('JWT payload:', jwt_payload);
            User.findOne({_id: jwt_payload._id}, (err, user) => {
                if (err) {
                    return done(err, false);
                } else if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        }
    )
);

exports.verifyUser = passport.authenticate('jwt', {session: false});
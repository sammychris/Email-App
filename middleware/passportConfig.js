const passport         = require('passport');
const JwtStrategy      = require('passport-jwt').Strategy,
    ExtractJwt         = require('passport-jwt').ExtractJwt;
// const FacebookStrategy = require('passport-facebook').Strategy;
// const GoogleStrategy   = require('passport-google-oauth');
const db               = require('../models');



const cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies) token = req.cookies['jwt'];
    return token;
};



const opts = {};

//opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey    = process.env.JWT_SECRET;


passport.serializeUser(function(user, done) {
  done(null, user);
});


passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


// Jwt Strategy....
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
   // console.log(jwt_payload, 'this is thee payload in the passportConfig page');
    db.User.findOne({_id: jwt_payload.id})
    // .populate('campaignIds')
    // .populate('messageIds')
    // .populate('listIds')
    .exec(function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));


// Facebook Strategy...
// passport.use(new FacebookStrategy({
//     clientID: process.env.FACEBOOK_APP_ID,
//     clientSecret: process.env.FACEBOOK_APP_SECRET,
//     callbackURL: "http://localhost:8000/auth/facebook/callback",
//     profileFields: ['id', 'displayName', 'photos', 'email', 'name']
//   },
//   function(accessToken, refreshToken, profile, done) {
//     const { id, first_name, last_name, email, picture } = profile._json;

//     db('users').where({ email })
//         .then(users => {

//             const user = users[0];
//             const newUser = {};

//             if(user) {
//                 if(user.facebook_id) return done(null, user);
//                 user.facebook_id = id;
//                 user.picture = `https://graph.facebook.com/${id}/picture?type=large`;
//                 db('users')
//                     .where({ id: user.id })
//                     .update(user).then(() => {
//                         done(null, user);
//                     });
//             }
//             else {
            
//                 newUser.facebook_id = id;
//                 newUser.firstname   = first_name;
//                 newUser.lastname    = last_name;
//                 newUser.email       = email;
//                 newUser.picture     = `https://graph.facebook.com/${id}/picture?type=large`;

//                 db('users').insert([newUser])
//                     .then(() => done(null, newUser));

//             }

//         })
//   }
// ));
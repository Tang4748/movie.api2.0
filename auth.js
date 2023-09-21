const jwtSecret = 'your_jwt_secret'; // This has to be the same key used in the JWTStrategy

const jwt = require('jsonwebtoken');
const passport = require('passport');

require('./passport');

let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username,
    expiresIn: '7d',
    algorithm: 'HS256',
  });
};

// POST login.
module.exports = (router) => {
  router.post('/login', (req, res) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      console.log(user);
      if (error || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user,
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
};

// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTAzZjA2ODA2NTA4ODJkZDE0Mjk0OWIiLCJVc2VybmFtZSI6InVzZXJlaWdodCIsIlBhc3N3b3JkIjoiJDJiJDEwJFBuenA3eFMyL3ZHUlRyLm1NODMuVnVDeHhXQmFlcEJFbkl5RWo3SVlZNDYyeVFWNEFXVU8uIiwiRW1haWwiOiJ1c2VyOEBlbWFpbC5jb20iLCJCaXJ0aGRheSI6IjE5OTAtMDItMDFUMDA6MDA6MDAuMDAwWiIsIkZhdm9yaXRlTW92aWVzIjpbXSwiX192IjowLCJpYXQiOjE2OTQ3NjQyODQsImV4cCI6MTY5NTM2OTA4NCwic3ViIjoidXNlcmVpZ2h0In0.7T3dICzuJXPV07_2GQEThKt6gzRrcK8WUSggdRrI9y8"
const passport = require('passport');
const passportJWT = require('passport-jwt');
const Cliente = require('./src/models/Cliente');

const ExtractJwt = passportJWT.ExtractJwt;
const StrategyJWT = passportJWT.Strategy;

PASSPORT_KEY = "QWEOIUASDLKJMNBZXC012938"

passport.use(
  new StrategyJWT({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PASSPORT_KEY,
  }, (jwtPayload, done) => {
    return Cliente.findOne({where: {id: jwtPayload.id}})
      .then(cliente => {
        return done(null, cliente);
      })
      .catch(err => {
        return done(err);
      })
  })
)
module.exports = passport;
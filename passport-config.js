const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { Users } = require('./models/users'); // Adjust the path as needed

function initialize(passport) {
    const authenticateUser = async (email, password, done) => {
        try {
            const user = await Users.findOne({ email: email });

            if (!user) {
                return done(null, false, { message: 'No user with that email' });
            }

            const isPasswordMatch = await bcrypt.compare(password, user.password);

            if (isPasswordMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Password Incorrect' });
            }
        } catch (e) {
            return done(e);
        }
    };

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
}

module.exports = initialize;

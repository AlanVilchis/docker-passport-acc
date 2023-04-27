const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const pool = require('../database');
const { encryptPassword, matchPassword } = require('./helpers');

// Local Strategy
passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const rows = await pool.query("SELECT * FROM User WHERE BINARY username = ?", [username])
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await matchPassword(password, user.password)
        if (validPassword) {
            done(null, user, req.flash('success', 'Bienvenido ' + user.username));
        } else {
            done(null, false, req.flash('message','ContraseÃ±a Incorrecta'));
        }
    } else {
        return done(null, false, req.flash('message','Usuario no encontrado'));
    }

}));

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || '55065011883-nh99fvjhg2em5vfo3i278a8u2b2tsuv1.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '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',
    callbackURL: "http://localhost:3000/profile"
}, async (accessToken, refreshToken, profile, done) => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    });
    const [rows] = await connection.execute(
        "SELECT * FROM User WHERE google_id = ?",
        [profile.id]
    );
    if (rows.length > 0) {
        connection.end();
        return done(null, rows[0]);
    } else {
        const [result] = await connection.execute(
            "INSERT INTO User (google_id, email, name) VALUES (?, ?, ?)",
            [profile.id, profile.emails[0].value, profile.displayName]
        );
        const [newUser] = await connection.execute(
            "SELECT * FROM User WHERE id = ?",
            [result.insertId]
        );
        connection.end();
        return done(null, newUser);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM User WHERE id = ?', [id]);
    done(null, rows[0]);
});

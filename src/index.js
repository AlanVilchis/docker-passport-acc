require('dotenv').config();
const express = require('express')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');
const moment = require("moment")
const { database } = require('./keys');


// Initializations
const app = express();
require('./lib/passport')
moment.locale('es');

// Settings
app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));

app.set('view engine', '.hbs')


// Middlewares
app.use(session({
    secret: 'itesm502',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));

app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


// Global Variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success')
    app.locals.message = req.flash('message')
    app.locals.user = req.user;
    // Continue
    next();
})

// Routes
app.use(require('./routes'))
app.use(require('./routes/authentication'))


// Public
app.use(express.static(path.join(__dirname, 'public')));

// Starting the server
app.listen(app.get('port'), () => {
    console.log("Server on port: ", app.get('port'))
})


app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });
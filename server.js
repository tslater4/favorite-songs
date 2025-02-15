const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const PORT = process.env.PORT || 3000;
const path = require('path');
const session = require('express-session');
const User = require('./models/user.js');

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
    console.log(`connected to mongoDB ${mongoose.connection.name}`);
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
    })
);
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    const user = req.session.user;
    const userId = req.params.id;
    res.render('index.ejs', { user });
});

app.get('/error', (req, res) => {
    res.render('error.ejs');
});

app.get('/accounts', async (req, res) => {
    try {
        if (!req.session.user) {
            return res.redirect('/auth/signin');
        }
        const users = await User.find({});
        res.render('accounts.ejs', { users });
    } catch (error) {
        console.log(error);
        res.redirect('/error');
    }
});

// middlewear to prevent access to routes as a guest
const isSignedIn = require('./middlewear/is-signed-in.js');
app.use(isSignedIn);

const authController = require('./controllers/auth.js');
app.use('/auth', authController);


const userController = require('./controllers/user.js');
app.use('/users', userController);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

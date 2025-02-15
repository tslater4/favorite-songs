const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.get('/signup', (req, res) => {
    console.log('signup');
    res.render('auth/sign-up.ejs');
});

router.get('/signin', (req, res) => {
    res.render('auth/sign-in.ejs');
});

router.post('/signup', async (req, res) => {
    try {
        const username = req.body.username;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.send('Username already exists.');
        }
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        if (password !== confirmPassword) {
            return res.send('Passwords do not match.');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, password: hashedPassword });

        // Store the user's ID in the session
        req.session.user = {
            id: newUser._id,
            username: newUser.username
        };

        res.redirect(`/users/${newUser._id}`);
    } catch (error) {
        console.log(error);
        res.redirect('/error');
    }
});

router.post('/signin', async (req, res) => {
    try {
        const username = req.body.username;
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.send('username does not exist or password is incorrect.');
        }                
        const password = req.body.password;
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.send('username does not exist or password is incorrect.');
        }
        req.session.user = {
            username: existingUser.username,
            id: existingUser._id,
        };
        res.redirect(`/users/${existingUser._id}`);
    } catch (error) {
        console.log(error);
        res.redirect('/error');
    }
});

router.get('/signout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
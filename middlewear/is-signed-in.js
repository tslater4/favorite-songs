const isSignedIn = (req, res, next) => {
    if (!req.session.user && req.path !== '/auth/signin' && req.path !== '/auth/signup') {
        res.redirect('/auth/signup');
    } else {
        next();
    }
};

module.exports = isSignedIn;
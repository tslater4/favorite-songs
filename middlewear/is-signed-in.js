const isSignedIn = (req, res, next) => {
    if (!req.session.user) {
        res.redirect('/auth/signin');
    } else {
        next();
    }
};

module.exports = isSignedIn;

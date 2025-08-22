const isSignedIn = (req, res, next) => {
    // Allow public access to profile viewing and accounts page
    const publicRoutes = [
        '/auth/signin', 
        '/auth/signup',
        '/accounts'
    ];
    
    // Allow viewing user profiles (GET requests to /users/:id)
    const isProfileView = req.method === 'GET' && req.path.match(/^\/users\/[a-fA-F0-9]{24}$/);
    
    if (!req.session.user && !publicRoutes.includes(req.path) && !isProfileView) {
        res.redirect('/auth/signup');
    } else {
        next();
    }
};

module.exports = isSignedIn;
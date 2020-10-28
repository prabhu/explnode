const express = require('express');
const router = express.Router()

// Have an allowlist of redirect urls
const ALLOWED_ROUTES = {
    "reports": "/reports/overview",
    "findings": "/findings/summary"
}

const checkAuthentication = (req,res,next) => {
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
        res.redirect("/login");
    }
}

// Prevent re-authentication by using middleware
router.get('/checklogin', checkAuthentication, function(req, res){
    res.redirect('/dashboard');
});

router.get('/goto', checkAuthentication, function(req, res) {
    const route_name = req.query.route_name;
    const route_url = ALLOWED_ROUTES[route_name.toLowerCase()];
    if (route_url) {
        res.redirect(route_url);
    } else {
        res.redirect('/login');
    }
});


module.exports = router

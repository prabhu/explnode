const express = require('express');
const router = express.Router()

// Have an allowlist of redirect urls
const ALLOWED_ROUTES = {
    "reports": "/reports/overview",
    "findings": "/findings/summary"
}

router.get('/login',function(req, res){
    if(req.session.isAuthenticated()){
        res.redirect('/dashboard');
    }else{
        res.redirect('/login');
    }
});

router.get('/goto',function(req, res){
    const route_name = encodeURI(req.query.route_name);
    const url = ALLOWED_ROUTES[route_name];
    if (url) {
        res.redirect(url);
    } else {
        res.redirect('/login');
    }
});


module.exports = router

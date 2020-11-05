const express = require('express');
const router = express.Router()

const lodash = require('lodash');

//if req.body.config == '{"constructor": {"prototype": {"isAdmin": true}}}' it will bypass the authentication
function check(req, res) {

    let config = {
      isAdmin: false
    };
    const userConfig = req.body.config;
    // Validate userConfig here
    if (!isValidUserConfig(userConfig)) {
      res.send('Validation error');
    }
    lodash.defaultsDeep(config, userConfig);
    let user = getCurrentUser(config);
    if (user.isAdmin && user.isAdmin === true) {
        res.send('Welcome Admin')
    }else{
        res.send('Welcome User')
    }
}

function isValidUserConfig(userConfig) {
  if (!userConfig) {
    return false;
  }
  if (userConfig['constructor'] && typeof userConfig['constructor'] === 'function') {
    return false;
  }
  if (userConfig['__proto__']) {
    return false;
  }
  return true;
}

//fake function that get current user from session or db
function getCurrentUser(config){
  return config;
}


router.post('/check-user',check)

module.exports = router
const express = require('express')
const router = express.Router()

const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;

// There is no perfect xss sanitizer library
// This is a well maintained library and has received few rounds of security testing
// ShiftLeft won't trust any sanitizer by default and requires a policy per organization
const DOMPurify = createDOMPurify(window);

router.get('/greeting', (req, res) => {
    const { name }  = req.query;
    res.send('<h1> Hello :'+ DOMPurify.sanitize(name) +"</h1>")
})

router.get('/greet-template', (req,res) => {
    name = DOMPurify.sanitize(req.query.name);
    res.render('index', { user_name: name});
})

module.exports = router
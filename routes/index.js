const express  = require('express');
const router   = express.Router();
const template = require('../views/template.js');		
const index    = require('../views/index.js');		

/* GET home page. */
router.get('/', function(req, res, next) {
  const title  = "Make Chat";
  const link   = ``;
  const body  = `${index.html()}`;
  const script = `<script src="script.js"></script> `;
  const html   = template.HTML(title,link, body,script);
  res.send(html);
});

module.exports = router;

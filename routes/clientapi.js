var express = require('express');
var router = express.Router();

var home = function(req, res) {
	console.log("ClientAPI Home");
	res.json();
};
/* GET home page. */
router.get('/', home);

module.exports = router;

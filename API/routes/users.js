var express = require('express'),
    router  = express.Router(),
    Promise = require('bluebird'),
    usersModel = Promise.promisifyAll(require('../models/usersModel')),
    psql      = require('../queries');

/* GET users listing. */
router.get('/points', function(req, res, next) {
	var userID = req.query.userID;
	return psql.one('SELECT "userID","totalPoints" FROM users INNER JOIN customers USING("userID") WHERE "userID"=${id}', {id: userID})
    	.then(function (data) {
    		console.log("TEST2");
    		console.log(data);
    		res.status(200).json({
    			data: data
    		});
   		}).catch(function (err) {
    			throw err;
   		});
});

router.get('/purchases/transactions', function (req, res, next) {
	var userID = req.query.userID;
	return psql.any('select "shopID", "name", "transactionID", "dollarAmount", "pointsGranted"'
		+ ' FROM users u JOIN customers USING ("userID")'
		+ ' JOIN transactions USING ("customerID")'
		+ ' JOIN shops USING ("shopID")'
		+ ' WHERE u."userID"=${id}', {id: userID})

		.then(function (data) {
			res.status(200).json(data);
		}).catch(function (err) {
			throw err;
		});

});



module.exports = router;

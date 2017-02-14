var express = require('express'),
    router  = express.Router(),
    psql    = require('../../queries');

router.get('/', function(req, res, next) {
	var customerID = req.query.customerID;

	return psql.any('SELECT name, tweetid, link, pointsgranted FROM twittertransactions JOIN shops USING(shopid) WHERE customerid=$1', [ customerID ]).then(function (data) {
		var i,
		    returnObject = {},
		    returnData = [];
		
		for (i=1; i <= data.length; i++) {
		    returnData.push({
		        type: 'tweets',
		        id: i,
			attributes: data[i-1]
		    });
		}
		returnObject.data = returnData;

		res.status(200).json(returnObject);
	}).catch(function (error) {
		console.log("error", error);
	});
});

module.exports = router;

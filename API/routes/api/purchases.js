var express = require('express'),
	router  = express.Router(),
    psql    = require('../../queries');

router.get('/', function(req, res, next) {
	var customerID = req.query.customerID,
		minimumDollar = req.query.minimum;

	return psql.any('SELECT transactionid, name, dollaramount, pointsgranted FROM transactions JOIN shops USING (shopid) WHERE customerid=$1 AND dollaramount > $2', [ customerID, minimumDollar ]).then(function (data) {
		var i,
		returnObject = {},
		returnData = [];

		for (i=1; i <= data.length; i++) {
			returnData.push({
				type: 'purchases',
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
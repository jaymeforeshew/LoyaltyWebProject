var express    = require('express'),
    router     = express.Router(),
    Promise    = require('bluebird'),
    psql       = require('../../queries')
    calculator = require('../../utils/pointCalculator');

router.post('/', function(req, res, next) {
    var transactionID = req.body.transactionID,
        shopID        = req.body.shopID,
        emailAddress  = req.body.emailAddress,
        dollarAmount  = req.body.dollarAmount,
        pointsGranted = calculator.calculatePoints(dollarAmount),
        customerID,
        newPointTotal = pointsGranted;

    // With added time @TODO - put lock on the customer
    return psql.any('SELECT customerid, totalpoints FROM customers JOIN users USING(userid) WHERE emailaddress = $1', [ emailAddress ]).then(function (data) {
        customerID = data[0].customerid;
        newPointTotal += data[0].totalpoints;
        return psql.none('INSERT INTO transactions (transactionid, shopid, customerid, dollaramount, pointsgranted) VALUES ($1, $2, $3, $4, $5)',
            [ transactionID, shopID, customerID, dollarAmount, pointsGranted ]);
    }).then(function () {
        return psql.none('UPDATE customers SET totalpoints=$1 WHERE customerID=$2', [ newPointTotal, customerID ]);
    }).then(function () {
        res.status(200).json({
            customerID: customerID,
            pointsGranted: pointsGranted
        });
    }).catch(function (error) {
        console.log("error", error);
    });
});

module.exports = router;
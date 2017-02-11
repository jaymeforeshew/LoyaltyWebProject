var psql     = require('../queries'),
    Promise = require('bluebird');

var usersModel = {
    getUserPoints: function (userID, cb) {
    	return psql.one('SELECT "totalPoints" FROM users INNER JOIN customers USING("userID") WHERE "userID"=${id}', {id: userID})
    		.then(function (data) {
    			console.log("TEST2");
    			return data[0];
    		}).catch(function (err) {
    			throw err;
    		});
    	}
};


//Promise.promisifyAll(usersModel);
module.exports = usersModel;
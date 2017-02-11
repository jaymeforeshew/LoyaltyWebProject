var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};
var pgp = require('pg-promise')(options);

/**
function getSqlConnection (connectionString) {
    var close;
    return pgp.connectAsync(connectionString).spread(function (client, done) {
        close = done;
        return client;
    }).disposer(function () {
        if (close) close();
    });
}

module.exports = getSqlConnection();
*/

var connectionString = 'postgres://localhost:5432/LoyaltyProject';
var db = pgp(connectionString);

// add query functions

module.exports = db;
/**{
  getAllPuppies: getAllPuppies,
  getSinglePuppy: getSinglePuppy,
  createPuppy: createPuppy,
  updatePuppy: updatePuppy,
  removePuppy: removePuppy
};*/

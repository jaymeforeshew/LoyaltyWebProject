var Twitter = require('twitter'),
    psql    = require('./queries');

var client = new Twitter({
  consumer_key: // ENTER YOUR CREDENTIALS
  consumer_secret: //
  access_token_key: //
  access_token_secret: //
});

var myTwitterID = '536928551';


function getTwitterPoints (customerID, twitterID) {

    // @TODO: Look up keywords for shops that this customer is linked to
    var valuableTweets = [],
        insertionObject = {},
        sinceID,
        newSinceID,
        url,
        i;

    return psql.one('SELECT sinceid FROM twitteraccounts WHERE customerid=$1', [ customerID ]).then(function (data) {
        sinceID = data.sinceid;
        console.log('sinceID is: ' + sinceID);

    return client.get('statuses/user_timeline', {'since_id': sinceID, 'user_id': twitterID, 'exclude_replies': true, 'include_rts': false}, 
        function (err, statuses, resp) {

        if (err) {
            console.log(err);
            process.exit();
        }

        for (i = 0; i < statuses.length; i++) {
            var tweet = statuses[i];
            if (tweet.entities.hashtags.length !== 0) {
              console.log(tweet);
                valuableTweets.push({
                    tweetID: tweet.id_str
                });
            }
        }
        console.log(valuableTweets);
        if (valuableTweets.length === 0) {
            console.log("Nothing to do. Exiting.");
            process.exit();
        }
        // @TODO: implement the ability to actually fetch for more than one tweet.
        url = 'https://twitter.com/1/status/' + valuableTweets[0].tweetID;
        console.log("URL:", url);
        newSinceID = valuableTweets[0].tweetID;
        console.log("valuabletweets:", valuableTweets);
        console.log("new sinceid: " + newSinceID);

        client.get('statuses/oembed', { 'url': url, 'omit_script': true }, function (err, data, resp) {
            var myhtml;
            if (err) {
                console.log(err);
                process.exit();
            }

            // build insertion object
            myhtml = data.html.substr(0, data.html.length - 1); // removing newline returned by twitter
            insertionObject.customerid = 11;
            insertionObject.shopid = 1;
            insertionObject.tweetid = valuableTweets[0].tweetID;
            insertionObject.link = myhtml;
            insertionObject.pointsgranted = Math.floor((Math.random() * 10) + 1);

            // insert twitter transaction
            psql.none('INSERT INTO twittertransactions (customerid, shopid, tweetid, link, pointsgranted) VALUES ($1, $2, $3, $4, $5)', 
                [ insertionObject.customerid, insertionObject.shopid, insertionObject.tweetid, insertionObject.link, insertionObject.pointsgranted ]).then(function () {

                // update total points
                psql.one('SELECT totalpoints FROM customers WHERE customerid=$1', [ insertionObject.customerid ]).then(function (data) {
                    var newTotal = data.totalpoints + insertionObject.pointsgranted;
                    psql.none('UPDATE customers SET totalpoints=$1 WHERE customerid=$2', [ newTotal, insertionObject.customerid ]).then(function () {  
                        
                        // Update sinceid for this customer
                        psql.none('UPDATE twitteraccounts SET sinceid=$1 WHERE customerid=$2', [ newSinceID, insertionObject.customerid ]).then (function () {
                            process.exit();
                        });
                    });
                });
            });
        });
    });
    });
}


getTwitterPoints(11, myTwitterID); //'828789127227244544');





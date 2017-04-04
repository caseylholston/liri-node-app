var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var keys = require('./keys.js');
var action = '';
// var error = function (err, response, body) {
//     	console.log('ERROR [%s]', err);
// 	};
// 	var success = function (data) {
//     	console.log('Data [%s]', data);
// 	};

 console.log(keys.twitterKeys);
 console.log(process.argv);
 return;


if (process.argv[3] = 'my-tweets') {

    var client = new twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret

    });

    var params = {screen_name: 'caseylholston', count: '20'};
        
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
        
            if (!error) {
            console.log(tweets);
            }
            else{console.log(error)
            }
        });
    }
else if (process.argv[3]= 'spotify-this-song') {

        spotify.search({ type: 'track', query: process.argv[4] }, function(err, data) {
            if ( err ) {
            console.log('Error occurred: ' + err);
            return;
            }

        });
    }

else if (process.argv[3] = 'movie-this') {


    
}



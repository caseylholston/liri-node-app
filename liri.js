var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var keys = require('./keys.js');
var action = '';

 console.log(keys.twitterKeys);
 console.log(process.argv);



if (process.argv[3] == 'my-tweets') {
    console.log('You typed my tweets');
    // var client = new twitter({
    // consumer_key: keys.twitterKeys.consumer_key,
    // consumer_secret: keys.twitterKeys.consumer_secret,
    // access_token_key: keys.twitterKeys.access_token_key,
    // access_token_secret: keys.twitterKeys.access_token_secret

    // });

    // var params = {screen_name: 'caseylholston', count: '20'};
        
    //     client.get('statuses/user_timeline', params, function(error, tweets, response) {
        
    //         if (!error) {
    //         console.log(tweets);
    //         }
    //         else{console.log(error)
    //         }
    //     });
    }
else if (process.argv[3] == 'spotify-this-song') {
    console.log('You typed spotify this song')

        // spotify.search({ type: 'track', query: process.argv[4] }, function(err, data) {
        //     if ( err ) {
        //     console.log('Error occurred: ' + err);
        //     return;
        //     }
        //     console.log(data);
        // });
    }

else if (process.argv[3] == 'movie-this') {


    
};



var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var keys = require('./keys.js');
var action = '';

 console.log(keys.twitterKeys);
 console.log(process.argv);
 console.log(process.argv[2]);
 console.log(process.argv[3]);


if (process.argv[2] === 'my-tweets') {
    console.log('You typed my tweets');
    var client = new twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret

    });

    var params = {screen_name: 'caseylholston', count: '20'};
        
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
        
            if (!error) {
            //console.log(JSON.stringify(tweets).text, null, 2);
                for( var i =0; i <20; i++) {
                   console.log(JSON.stringify(tweets[i].text, null, 2));
                
                }
            }
            else {
                console.log(error);
                }
        });
    }
else if (process.argv[2] === 'spotify-this-song') {
    console.log('You typed spotify this song');

        spotify.search({ type: 'track', query: process.argv[3], limit: 20 }, function(err, data) {
            if ( err ) {
            console.log('Error occurred: ' + err);
            return;
            }
            //console.log(JSON.stringify(data, null, 2));
            console.log('Artist: '+ JSON.stringify(data.tracks.items[0].artists[0].name, null, 2));
            console.log('Song: '+ JSON.stringify(data.tracks.items[0].name, null, 2));
            console.log('Preview Link: '+ JSON.stringify(data.tracks.items[0].album.external_urls.spotify, null, 2));
            console.log('Album: '+ JSON.stringify(data.tracks.items[0].album.name, null, 2));
        });
    }

else if (process.argv[2] === 'movie-this') {


    
};



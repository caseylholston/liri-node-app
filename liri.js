//console.log('export HEROKU_CONFIG=$(heroku config --json)');
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
    var movieName ='';
    if (process.argv[3] === 'undefined') {
        movieName = 'Mr. Nobody';
    }
    else {
        movieName = process.argv[3];
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName.replace(/ /g, "+") + "&y=&plot=short&r=json";
    console.log('Query URL: '+ queryUrl);

    request(queryUrl, function (error, response, body) {
        if( !error && response.statusCode ===200) {

        console.log('Title: ' + JSON.parse(body).Title);
        console.log('The movie was released in: ' + JSON.parse(body).Year);
        console.log('The IMDB rating is: ' + JSON.parse(body).Ratings[0].Value);
        console.log('The movie was produced in: ' + JSON.parse(body).Country);
        console.log('The movie language is: ' + JSON.parse(body).Language);
        console.log('The movie plot is: ' + JSON.parse(body).Plot);
        console.log('Some actors in the movie are: ' + JSON.parse(body).Actors);
        console.log('The movie language is: ' + JSON.parse(body).Language);
        console.log('The Rotten Tomatoes score is: ' + JSON.parse(body).Ratings[1].Value);
        }
    })
};



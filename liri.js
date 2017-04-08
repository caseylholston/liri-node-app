//console.log('export HEROKU_CONFIG=$(heroku config --json)');
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var inquirer = require('inquirer');
var keys = require('./keys.js');
var fs = require('fs');
var action = '';
var searchItem = '';

console.log('Hello my name is LIRI! \n\nHow can I assist you today?\n');


// Switch Section to take in the inputs

var questions = [
    {
        type:'list',
        name:'action',
        message:'Please select an action',
        choices:['Check Some Sweet Tweets', 'Spotify a Song', 'Movie Search', 'Surprise Me']
    },
    {
        type:'input',
        name:'searchItem',
        message:'Please enter a title to search for and press ENTER or just press ENTER'
    }
];
 
 inquirer.prompt(questions).then(function (answers){
    var action = answers.action;
    var searchItem = answers.searchItem; 
    fs.appendFile('log.txt', '---Action: ' + action + '---\n', function(err){
        if (err) (console.log('Error: ' + err))});
    fs.appendFile('log.txt', '---Search Item: ' + searchItem + '---\n\n', function (err){
        if (err) (console.log('Error: ' + err))});

    switchThis(action,searchItem);
    //console.log('Action: ' + action);
    //console.log('Search Item: ' + searchItem +);
 })
 


//-------------------FUNCTIONS------------------------------------

function switchThis (answersAction,answersSearchItem) {   
        switch(answersAction) {
        case 'Check Some Sweet Tweets':
        tweetThis();
        break;

        case "Spotify a Song":
        spotifyThis(answersSearchItem);
        break;

        case "Movie Search":
        movieThis(answersSearchItem);
        break;

        case "Surprise Me":
        doWhatItSays();
        break;
    }
 }

function tweetThis() {
    // console.log('You typed my tweets');
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
                   fs.appendFile('log.txt', JSON.stringify(tweets[i].text, null, 2)+ '\n\n', function(err){
                    if (err) (console.log('Error: ' + err))});
                
                }
            }
            else {
                console.log(error);
                }
        });
}

function spotifyThis(trackName) {
    //console.log('You typed spotify this song');
        if (trackName === '') {
            song = '0hrBpAOgrt8RXigk83LLNE';
            spotify.lookup({ type: 'track', id: song, limit: 20 }, function(err, data) {
            if ( err ) {
            console.log('Error occurred: ' + err);
            return;
            }
            console.log('\n\nYou Did Not Choose a Song it Must be Some Kind of Sign\n');
            fs.appendFile('log.txt', 'You Did Not Choose a Song it Must be Some Kind of Sign\n\n', function(err){
                    if (err) (console.log('Error: ' + err))});
            for (var i = 0; i < data.artists.length; i++) {
                console.log('Artist(s): '+ JSON.stringify(data.artists[i].name, null, 2));
                fs.appendFile('log.txt', 'Artist(s): '+ JSON.stringify(data.artists[i].name, null, 2) + '\n', function(err){
                    if (err) (console.log('Error: ' + err))});
            }

            //console.log('Artist(s): '+ JSON.stringify(data.tracks.items[0].artists[0].name, null, 2));
            console.log('Song: '+ JSON.stringify(data.name, null, 2));
            fs.appendFile('log.txt', 'Song: '+ JSON.stringify(data.name, null, 2) + '\n', function(err){
             if (err) (console.log('Error: ' + err))});
            console.log('Preview Link: '+ JSON.stringify(data.external_urls.spotify, null, 2))
            fs.appendFile('log.txt', 'Preview Link: '+ JSON.stringify(data.external_urls.spotify, null, 2) + '\n', function(err){
             if (err) (console.log('Error: ' + err))});
            console.log('Album: '+ JSON.stringify(data.album.name, null, 2));
            fs.appendFile('log.txt', 'Album: '+ JSON.stringify(data.album.name, null, 2) + '\n\n', function(err){
             if (err) (console.log('Error: ' + err))});
        })
        
         }

        else {
            song = trackName; 

        //console.log(song);
        spotify.search({ type: 'track', query: song, limit: 5 }, function(err, data) {
            if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }
            console.log('-----TOP 10 SEARCH RESULTS-----\n');
            fs.appendFile('log.txt','-----TOP 10 SEARCH RESULTS-----\n', function(err){
             if (err) (console.log('Error: ' + err))});
            for (var i = 0; i < 9; i++) {
                for (var i2 = 0; i2 < data.tracks.items[i].artists.length; i2++) {
                    console.log('Artist(s): '+ JSON.stringify(data.tracks.items[i].artists[i2].name, null, 2));
                    fs.appendFile('log.txt', 'Artist(s): '+ JSON.stringify(data.tracks.items[i].artists[i2].name, null, 2) + '\n', function(err){
                        if (err) (console.log('Error: ' + err))});
                }

                //console.log('Artist(s): '+ JSON.stringify(data.tracks.items[0].artists[0].name, null, 2));
                console.log('Song: '+ JSON.stringify(data.tracks.items[i].name, null, 2));
                fs.appendFile('log.txt', 'Song: '+ JSON.stringify(data.tracks.items[i].name, null, 2) + '\n', function(err){
                 if (err) (console.log('Error: ' + err))});
                console.log('Preview Link: '+ JSON.stringify(data.tracks.items[i].album.external_urls.spotify, null, 2));
                fs.appendFile('log.txt', 'Preview Link: '+ JSON.stringify(data.tracks.items[i].album.external_urls.spotify, null, 2) + '\n', function(err){
                 if (err) (console.log('Error: ' + err))});
                console.log('Album: '+ JSON.stringify(data.tracks.items[i].album.name, null, 2) + '\n');
                fs.appendFile('log.txt', 'Album: '+ JSON.stringify(data.tracks.items[i].album.name, null, 2) + '\n\n', function(err){
                 if (err) (console.log('Error: ' + err))});           
                }
            })
        }
}

function movieThis(movie) {
    //console.log(movie);
    if (movie === '') {
          movieName = 'Mr. Nobody';
    }
    else {
        movieName = movie; 
    }
    //console.log(movieName);
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName.replace(/ /g, "+") + "&y=&plot=short&r=json";
    //console.log('Query URL: '+ queryUrl);

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

            fs.appendFile('log.txt', 'Title: ' + JSON.parse(body).Title + '\n', function(err){
                 if (err) (console.log('Error: ' + err))});
            fs.appendFile('log.txt', 'The movie was released in: ' + JSON.parse(body).Year + '\n', function(err){
                 if (err) (console.log('Error: ' + err))});
            fs.appendFile('log.txt', 'The IMDB rating is: ' + JSON.parse(body).Ratings[0].Value + '\n', function(err){
                 if (err) (console.log('Error: ' + err))});
            fs.appendFile('log.txt', 'The movie was produced in: ' + JSON.parse(body).Country + '\n', function(err){
                 if (err) (console.log('Error: ' + err))});
            fs.appendFile('log.txt', 'The movie language is: ' + JSON.parse(body).Language + '\n', function(err){
                 if (err) (console.log('Error: ' + err))});
            fs.appendFile('log.txt', 'The movie plot is: ' + JSON.parse(body).Plot + '\n', function(err){
                 if (err) (console.log('Error: ' + err))});
            fs.appendFile('log.txt', 'Some actors in the movie are: ' + JSON.parse(body).Actors + '\n', function(err){
                 if (err) (console.log('Error: ' + err))});
            fs.appendFile('log.txt', 'The movie language is: ' + JSON.parse(body).Language + '\n', function(err){
                 if (err) (console.log('Error: ' + err))});
            fs.appendFile('log.txt', 'The Rotten Tomatoes score is: ' + JSON.parse(body).Ratings[1].Value + '\n\n', function(err){
                 if (err) (console.log('Error: ' + err))});

            }
        else {
            console.log(error);
            }
    })
}

 function doWhatItSays (){
        fs.readFile("random.txt", "utf8", function(err, data) {

        data = data.split(",");
        spotifyThis(data[1]);
    })
};



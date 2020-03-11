
var apiData = {};

apiData.clientId = 'aHv2FyTWldWzvRDvI8xMV82HRv73E8taPhafHkpntGElP39e';
apiData.clientSecret = '1KRtc37sfwXbKD2rfNQy2ymVaSE1ggPVQG78Esk926IGXde6';
apiData.userKey = 'gexw9BKwOtpvhVkS';


// Hackaday API URLs:
apiData.apiKey = '?api_key=' + apiData.userKey;
apiData.apiUrl = 'http://api.hackaday.io/v1';


if (!apiData.userKey || !apiData.clientId || !apiData.clientSecret) {
    console.log('API credentials fault, killing node server process');
    process.exit();
}


// Create express HTTP server, port, request/response handler
var http = require('http'),
    express = require('express'),
    request = require('request'),
    app = express(),
    server = http.createServer(app),
    port = 3001;

server.listen(port);
console.log('Listening on port: ', port);


// Enable EJS templates
app.set('views', __dirname);
app.set('view engine', 'ejs');


// Set Express static file route for hosting js and css files
app.use('/static', express.static(__dirname + '/static'));


// Render index page at server-side
app.get('/', function(req, res) {
    res.render('index');
});


// API query projects
app.get('/projects', function(req, res) {
    var url = apiData.apiUrl + '/projects' + apiData.apiKey;

    request.get(url, function(error, response, body) {
        var bodyData = parseJSON(body);
        res.send(bodyData.projects);
    });
});


// API query specific project with project id
app.get('/projects/:id', function(req, res) {
    var url = apiData.apiUrl + '/projects/' + req.params.id + apiData.apiKey;

    request.get(url, function(error, response, body) {
        var bodyData = parseJSON(body);
        res.render('detail',{
            apiData: bodyData
        });
    });
});

// API query users
app.get('/users/:id', function(req, res) {
    var url = apiData.apiUrl + '/users/' + req.params.id + apiData.apiKey;

    request.get(url, function(error, response, body) {
        var bodyData = parseJSON(body);
        res.send(bodyData);
    });
});


// redirect illegal url visits
app.all('*', function(req, res) {
    res.redirect('/');
});


function parseJSON(value) {
    var parsed;
    try {
        parsed = JSON.parse(value);
    } catch (e) {
        console.log('Error parsing JSON: ', e, '\nInput: ', value);
    }
    return parsed || false;
}

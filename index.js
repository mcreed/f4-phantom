var phantom = require('phantom');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
	
	// Set page to phantom
	var page_url = "http://mcreed.com";
	if(request.query.linky){
		page_url = request.query.linky;
	}

	phantom.create(function (ph) {
		ph.createPage(function (page) {
			page.open(page_url, function (status) {

				console.log("opened url? ", status);
				page.getContent(function (content) {
					response.send(content);
				});

		    });
		});
	});
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

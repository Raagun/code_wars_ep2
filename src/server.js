var StringDecoder = require('string_decoder').StringDecoder;


var Server = function (workerFn) {
	var express = require('express');
	var app = express();

	app.get("/heartbeat", function(req, res) {
		res.send("<html><h1>ALIVE");
	});

	app.post('/codewars', function (req, res) {

		var dataStr = "";

		req.on('data', function (data) {
			dataStr = dataStr + data.toString("utf8");
			console.log("on data: ", dataStr);
	    });

		req.on("end", function(){
			console.log("on end", dataStr);
			var parsed = JSON.parse(dataStr);
			console.log("parsed JSON: ", parsed);
			var result = workerFn(parsed);
			console.log("answer: ", result);
			res.send(answer);
		});

	});

	app.listen(8080, function () {
	  console.log('Listening');
	});
};

module.exports = Server;


(function(){

	var http = require("http"),
		_ = require("lodash"),
		deasync = require("deasync");

	var ApiCaller = function(host, port) {

		var _options = {
			host: host,
			port: port
		};

		this.call = function(method, path, successFn) {
			opts = _.assign({}, _options);
			opts.method = method;
			opts.path = path;
			endOfData = false;

			var callback = function(response) {
				var str = "";
				response.on("data", function(chunk){
					str += chunk;
				});

				response.on("end", function() {
					endOfData = true;
					var jso = JSON.parse(str);
					successFn(jso);
				});
			};

			http.request(opts, callback).end();

			deasync.loopWhile(function() {
				return !endOfData;
			});

		};
		
	};

	module.exports = ApiCaller;
}());

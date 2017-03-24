(function(){

	describe("api get extensive looper", function(){

		var apiCaller;


		beforeAll(function(){
			var ApiCaller = require("../../src/call-loop");
			apiCaller = new ApiCaller("localhost", 3000);
		});

		it("should loop 1M times calling an API", function() {

			var succi = 0;
			var successFn = function(json) {
				succi += json.userId;
			};

			for(var i = 0; i < 100 * 1000; i++) {
				apiCaller.call("GET", "/" + i % 4, successFn);
				if( i % 10000 === 0 ) {
					console.log("---" + i / 10000 + "---" + i);
				}
			}

			expect(succi).toBe(25000 * 2 + 25000 * 3  + 25000 * 2);

		});
	});

}());

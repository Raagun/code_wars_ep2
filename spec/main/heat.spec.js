
var heatFn = require("../../src/heat");

describe("heat function", function(){

	it("does not fail on boundary", function(){
		var data = [
			[{value: "#", heat: -1000}],
			[{heat: 10}]
		];

		var data2 = heatFn(data);

		expect(data2).toEqual(false);

	});

});

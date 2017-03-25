var _ = require("lodash");

var heat = function(arr) {

	var sumFn = function(a) {return a.reduce(function(a, b) { return a + b; }, 0)};

	return _.map(arr, function(row, ri){
		return _.map(row, function(col, ci){

			var nd = [];
			if(ri > 0) {
				nd.push(arr[ri - 1][ci].heat);
			}
			if(ri < arr.length - 1) {
				nd.push(arr[ri + 1][ci].heat);
			}
			if(ci > 0) {
				nd.push(arr[ri][ci - 1].heat);
			}
			if(ci < arr[0].length - 1) {
				nd.push(arr[ri][ci + 1].heat);
			}

			//col.heat = col.heat + sumFn(nd);

			//return _.merge(col, {heat: col.heat + sumFn(nd)});
			return {value: col.value, heat: col.heat + sumFn(nd)};

		});
	});

}

module.exports = heat;

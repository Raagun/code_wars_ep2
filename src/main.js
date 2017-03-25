var Server = require("./server");

var logic = require("./logic");

function Main() {

    this.run = function() {
        console.log('running');
    }

	var server = new Server(logic);

}

Main();

module.exports = Main;

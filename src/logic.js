function gameLogic(gameJson) {

	console.log("logic module got json: ", gameJson);

	return {"wrap": gameJson};

}

module.exports = gameLogic;

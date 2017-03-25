function gameLogic(input) {

    var map = convert(input.Map, input.Players[input.YourIndex]);
    return doMoveForPlayer(map, input.Players[input.YourIndex]);

}
function convert(map, player) {
    var updatedMap = map.Rows.map(function (row) {
        return row.split("");
    });
    return updatedMap;
}

function doMoveForPlayer(map, playerData) {
    var moves = {
        Moves: playerData.RatPositions.map(function (ratPos) {
            return createRateMove(map, ratPos);
        })
    };
    // moves.Moves = checkDuplicates(moves.Moves, playerData);
    return moves;
}

function createRateMove(map, ratInfo) {
    var move = getNextMove(map, ratInfo.Position);
    move.RatId = ratInfo.RatId;
    return move;
}

function convertMapToHeated(map) {
    map = map.map(function (row) {
        return row.map(function (col) {
            if (col === "0")
                return {
                    heat: -100,
                    value: col
                };
            if (col === "#")
                return {
                    heat: -10000,
                    value: col
                };
            if (col === ".")
                return {
                    heat: 30,
                    value: col
                };
            if (col === " ")
                return {
                    heat: -1,
                    value: col
                };
        })
    });
    return map;
}

function getNextMove(map, position) {
    var row = position.Row;
    var col = position.Col;

    if (map[row][col] === ".") {
        return getEatAction();
    }

    map = convertMapToHeated(map);
    for (var i = 0; i < Math.max(map.length, map[0].length); i++) {
        map = heat(map);
        // map = heat(map);
        // map = heat(map);
        // map = heat(map);
        // map = heat(map);
    }
    var moves = getMoves(row, col, map);
    moves.sort(function (a, b) {
        return b.element.heat - a.element.heat;
    });
    var validMove = moves[0];
    console.log(moves, validMove);
    return getMoveAction(validMove.row, validMove.col);
}

function getMoves(row, col, map) {
    var moves = [];
    if (row > 0) {
        moves.push(getElement(row - 1, col, map));
    }
    if (row < map.length - 1) {
        moves.push(getElement(row + 1, col, map));
    }
    if (col > 0) {
        moves.push(getElement(row, col - 1, map));
    }
    if (col < map[0].length - 1) {
        moves.push(getElement(row, col + 1, map));
    }
    return moves;
}

function getMoveAction(row, col) {
    return {
        Action: "Move",
        Position: {
            Row: row,
            Col: col
        }
    }
}
function getEatAction() {
    return {
        Action: "Eat"
    }
}

function getElement(row, col, map) {
    return {row: row, col: col, element: map[row][col]};
}

var previousMoves = [];

function previousMovesAdjust(r, c) {
	var r = previousMoves.find(function(e){ 
		return e.row === r && e.col === c;
	});

	if(r) { 
		return -1;
	} else {
		return 0;
	}
}

function calculatePreviousMovesArray(r, c) {
	if(previousMoves.length > 10) {
		previousLength.splice(0, 1);
	}
}

function heat(arr) {

    var sumFn = function (a) {
        return a.reduce(function (a, b) {
            return a + b;
        }, 0)
    };

    return arr.map(function (row, ri) {
        return row.map(function (col, ci) {

            var nd = [];
            if (ri > 0) {
                nd.push(arr[ri - 1][ci].heat);
            }
            if (ri < arr.length - 1) {
                nd.push(arr[ri + 1][ci].heat);
            }
            if (ci > 0) {
                nd.push(arr[ri][ci - 1].heat);
            }
            if (ci < arr[0].length - 1) {
                nd.push(arr[ri][ci + 1].heat);
            }

            return {value: col.value, heat: col.heat + Math.max.apply(null, nd)};

        });
    });

}

function checkDuplicates(moves, playerData) {
    var allMoves = [];


    return moves.map(function (move) {
        var foundMove = allMoves.find(function (allMove) {
            return move.Row === allMove.Row && move.Col === allMove.Col;
        });
        if (foundMove) {
            var rat = playerData.find(function (player) {
                return player.RatId === foundMove.RatId;
            });
            return getMoveAction(rat.Position.Row, rat.Position.Col);
        }
        allMoves.push(move.Position);
        return move;
    })
}

module.exports = gameLogic;

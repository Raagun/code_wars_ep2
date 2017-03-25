function gameLogic(input) {

    var map = convert(input.Map);
    return doMoveForPlayer(map, input.Players[input.YourIndex]);

}
function convert(map) {
    return map.Rows.map(function (row) {
        return row.split("");
    });
}

function doMoveForPlayer(map, playerData) {
    return {
        Moves: playerData.RatPositions.map(function (ratPos) {
            return createRateMove(map, ratPos);
        })
    };
}

function createRateMove(map, ratInfo) {
    var move = getNextMove(map, ratInfo.Position);
	calculatePreviousMovesArray(ratInfo.Position.Row, ratInfo.Position.Col);
    move.RatId = ratInfo.RatId;
    return move;
}

function convertMapToHeated(map) {
    map = map.map(function (row) {
        return row.map(function (col) {
            if (col === "#")
                return {
                    heat: -1000,
                    value: col
                };
            if (col === ".")
                return {
                    heat: 10,
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
function getNextMove(map, position) {
    var row = position.Row;
    var col = position.Col;

    if (map[row][col] === ".") {
        return getEatAction();
    }

    map = convertMapToHeated(map);
    for(var i=0; i< Math.max(map.length, map.Row.length); i++){
        map = heat(map);
    }
    //calculate heat x5 for map
    var moves = getMoves(row, col, map);
    moves.sort(function (a, b) {
        return b.element.heat - a.element.heat;
    });
    var validMove = moves[0];
    console.log(moves, validMove);
    return getMoveAction(validMove.row, validMove.col);
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

            //col.heat = col.heat + sumFn(nd);

            //return _.merge(col, {heat: col.heat + sumFn(nd)});

			var previousMovesAdjust = getPreviousMovesAdjust(row, col);

            return {value: col.value, heat: col.heat + Math.max.apply(null, nd) + previousMovesAdjust};

        });
    });

}

module.exports = gameLogic;

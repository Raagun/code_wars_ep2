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

function getNextMove(map, position) {
    var row = position.Row;
    var col = position.Col;

    if (map[row][col] === ".") {
        return getEatAction();
    }

    map = convertMapToHeated(map);
    var iterationCount = Math.min(map.length, map[0].length);
    for (var i = 0; i < iterationCount; i++) {
        map = heat(map, Math.pow((iterationCount - i)/iterationCount, 2));
    }
    var moves = getMoves(row, col, map);
    moves.sort(function (a, b) {
        return b.element.heat - a.element.heat;
    });
    var validMove = moves[0];
    // console.log(moves, validMove);
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

function heat(arr, intensity) {

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

            return {value: col.value, heat: col.heat + intensity * Math.max.apply(null, nd)};

        });
    });

}

function checkDuplicates(moves, playerData) {
    var allMoves = [];

    return moves.map(function (move) {
        if(move.Action === "Eat") {
            console.log(move);
            return move;
        }
        var foundMove = allMoves.find(function (allMove) {
            return move.Position.Row === allMove.Position.Row && move.Position.Col === allMove.Position.Col;
        });
        if (foundMove !== undefined) {
            var rat = playerData.RatPositions.find(function (player) {
                return player.RatId === foundMove.RatId;
            });
            var moveAction = getMoveAction(rat.Position.Row, rat.Position.Col);
            moveAction.RatId = move.RatId;
            console.log(moveAction);
            return moveAction;
        }
        console.log(move);
        allMoves.push(move);
        return move;
    })
}

module.exports = gameLogic;

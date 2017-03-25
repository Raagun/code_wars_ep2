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

    if(map[row][col] === "."){
        return getEatAction();
    }

    map = convertMapToHeated(map);
    //calculate heat x5 for map
    var moves = [
        getElement(row, col + 1, map),
        getElement(row, col - 1, map),
        getElement(row + 1, col, map),
        getElement(row - 1, col, map)
    ];
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

module.exports = gameLogic;

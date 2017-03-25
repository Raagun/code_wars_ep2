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

function getNextMove(map, position) {
    var row = position.Row;
    var col = position.Col;
    var moves = [
        getElement(row, col + 1, map),
        getElement(row, col - 1, map),
        getElement(row + 1, col, map),
        getElement(row - 1, col, map)
    ];
    var validMove = moves.find(function (move) {
        return move.element !== "#";
    });
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

function getElement(row, col, map) {
    return {row: row, col: col, element: map[row][col]};
}

module.exports = gameLogic;

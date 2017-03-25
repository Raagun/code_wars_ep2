(function () {
    function CodeWars (input) {
        var map = convert(input.Map);
        return doMoveForPlayer(map, input.EnPlayerState[input.YourIndex]);
    }

     function convert(map){
        return map.Rows.map(function (row) {
            return row.split("");
        });
    }

    function doMoveForPlayer(map, playerData){

    }

    module.exports = CodeWars;
});
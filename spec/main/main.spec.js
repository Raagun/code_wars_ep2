describe("Main", function () {
    var Main = require('../../src/main');
    var main;

    beforeEach(function () {
        //main = new Main();
    });

    xit("should check if main is defined", function () {
        expect(main).toBeDefined();
    });
    xit("should have run", function () {
        expect(main.run).toBeDefined();
    })
    it("should sort right", function () {
        var moves = [
            {heat: -15},
            {heat: 15},
            {heat: 0},
            {heat: -14},
        ]
        moves.sort(function (a, b) {
            return b.heat - a.heat;
        });
        console.log(moves);
        expect(moves[0]).toEqual({heat: 15});
    });

});
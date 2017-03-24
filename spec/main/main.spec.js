describe("Main", function() {
  var Main = require('../../src/main');
  var main;

  beforeEach(function() {
    main = new Main();
  });

  it("should check if main is defined", function() {
    expect(main).toBeDefined();
  });

});
var Jasmine = require('jasmine');
var jasmine = new Jasmine();

jasmine.loadConfigFile('./config/jasmine.json');

jasmine.execute();
var fs = require('fs')
  , column = require('../')
  , assert = require('assert')
  , through = require('through');

var output = ''
  , testStream = column()
  , result = fs.readFileSync(__dirname + '/result.txt');

testStream.pipe(through(
  function(data) { output += data },
  function() {
    assert(String(output) === String(result), 'Expected: "' + result + '", Got: "' + output + '"');
  }
));

fs.createReadStream(__dirname + '/generic.txt').pipe(testStream);

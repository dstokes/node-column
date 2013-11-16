var fs = require('fs')
  , test = require('tape')
  , columns = require('../')
  , through = require('through');

function write(items, cb, delimiter) {
  var s = columns(delimiter)
    , res = '';

  s.pipe(through(function(d) { res += d }, function() { cb(null, res); }));
  while (items.length) s.write(items.shift());
  s.end();
}

test('properly formats output', function(t) {
  write([ "a b c\n", "one two three\n", "d e f\n" ], function(err, res) {
    var exp = "a   b   c    \n" +
              "one two three\n" +
              "d   e   f    \n";
    t.equal(res, exp, "should format");
    t.end();
  });
});

test('handled dynamic column counts', function(t) {
  write([ "a b c\n", "one two three\n", "d  t" ], function(err, res) {
    var exp = "a   b   c    \n" +
              "one two three\n" +
              "d       t    \n";
    t.equal(res, exp, "should format");
    t.end();
  });
});

test('properly splits columns by delimiter', function(t) {
  write([ "a|b|c\n", "one|two|three\n", "d||t" ], function(err, res) {
    var exp = "a   b   c    \n" +
              "one two three\n" +
              "d       t    \n";
    t.equal(res, exp, "should format");
    t.end();
  }, '|');
});

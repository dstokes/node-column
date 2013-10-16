var through = require('through');

module.exports = function(delimiter) {
  var rows = []
    , widths = []
    , soFar = '';

  if(typeof delimiter === "undefined") delimiter = ' ';

  return through(function(data) {
    var pieces = (soFar + data).split(/\r?\n/)
    soFar = pieces.pop();
    pieces.map(function(piece, i) {
      rows.push(
        piece.split(delimiter).map(function(col, c) {
          var len = (col = col.trim()).length, curw = (widths[c] || 0);
          return (widths[c] = Math.max(len , curw)) && col;
        })
      );
    });
  }, function() {
    var str = "                               ";
    var pad = function(s, i) { return (s + str).slice(0, widths[i]); }
    rows.map(function(cols) {
      this.queue( cols.map(pad).join(" ") + "\n" )
    }, this);
    this.queue(null);
  });
}

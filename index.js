var split = require('split')
  , through = require('through');

module.exports = function(delimiter) {
  var rows = []
    , widths = [];

  if(typeof delimiter === "undefined") delimiter = ' ';

  return through(function(data) {
    rows.push(
      data.split(delimiter).map(function(col, i) {
        var len = (col = col.trim()).length, curw = (widths[i] || 0);
        return (widths[i] = Math.max(len + 1, curw)) && col;
      })
    );
  }, function() {
    var str = "                               ";
    var pad = function(s, i) { return (s + str).slice(0, widths[i]); }
    for(var r = 0, l = rows.length; r < l; r++) {
      this.queue( rows[r].map(pad).join(" ") + "\n" );
    }
    this.queue(null);
  });
}

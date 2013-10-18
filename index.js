var through = require('through');

function pad(str, len) {
  return (str + Array(len).join(" ")).slice(0, len);
}

module.exports = function(delimiter) {
  var rows = []
    , soFar = ''
    , widths = [];

  if(typeof delimiter === 'undefined') delimiter = " ";

  return through(function(data) {
    var pieces = (soFar + data).split(/\r?\n/)
      , columns;
    soFar = pieces.pop();

    for(var i = 0, l = pieces.length; i < l; i++) {
      rows.push(columns = pieces[i].split(delimiter));
      for(var c = 0, cl = columns.length; c < cl; c++) {
        widths[c] = Math.max(columns[c].length , (widths[c] || 0));
      }
    }
  }, function() {
    for(var i = 0, l = rows.length; i < l; i++) {
      var columns = rows[i];
      for(var c = 0, cl = columns.length; c < cl; c++) {
        columns[c] = pad(columns[c], widths[c]);
      }
      this.queue(columns.join(" ") + "\n");
    }
    this.queue(null);
  });
}

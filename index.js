var through = require('through');

function pad(str, len) {
  return ((str===''?' ':str) + Array(len).join(" ")).slice(0, len);
}

module.exports = function(delimiter) {
  var rows = []
    , soFar = ''
    , widths = [];

  if (typeof delimiter === 'undefined') delimiter = " ";

  function columns(data) {
    var cols = data.split(delimiter);
    for (var i = 0, l = cols.length; i < l; i++) {
      widths[i] = Math.max(cols[i].length, (widths[i] || 0));
    }
    return cols;
  }

  return through(function(data) {
    var pieces = (soFar + data).split(/\r?\n/);
    soFar = pieces.pop();

    for (var i = 0, l = pieces.length; i < l; i++) {
      rows.push( columns(pieces[i]) );
    }
  }, function() {
    if (soFar) rows.push( columns(soFar) );
    for (var i = 0, l = rows.length; i < l; i++) {
      var cols = rows[i];
      for (var c = 0, cl = cols.length; c < cl; c++) {
        cols[c] = pad(cols[c], widths[c]);
      }
      this.queue(cols.join(" ") + "\n");
    }
    this.queue(null);
  });
}

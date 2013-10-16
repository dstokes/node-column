column
======

Unix `column` util ported to a nodejs stream

[![Build Status](https://travis-ci.org/dstokes/node-column.png)](https://travis-ci.org/dstokes/node-column)  
[![NPM](https://nodei.co/npm/node-column.png?downloads=true)](https://nodei.co/npm/node-column/)  

Example
=======
``` js
var column = require('node-column')
  , fs     = require('fs');
  
fs.createReadStream(somefile)
  .pipe(column())
  .pipe(process.stdout)
```

install
=======

With [npm](http://npmjs.org) do:

```
npm install node-column
```

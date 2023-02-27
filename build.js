/*
gotoB - v2.3.0

Written by Federico Pereiro (fpereiro@gmail.com) and released into the public domain.

To build gotoB, run `node build`. If everything works well, a file named `gotoB.min.js` will be created. If you want to create a non-minified version, run `node build dev` instead.
*/

var fs       = require ('fs');
var zlib     = require ('zlib');

var dale     = require ('dale');
var teishi   = require ('teishi');
var UglifyJS = require ('uglify-js');

var clog     = teishi.clog;

var build = function (files, dev) {

   var code = '', t = teishi.time ();
   dale.go (files, function (v) {
      code += fs.readFileSync (v, 'utf8');
   });

   if (dev) {
      return fs.writeFile ('gotoB.min.js', code, 'utf8', function (error) {
         if (error) return clog ('Error', 'writeFile error.');
         clog ('Success', 'gotoB.min.js built successfully!');
      });
   }

   var lines = code.split ('\n').length - 1;
   code = UglifyJS.minify (code, {ie8: true}).code;
   if (! code) return clog ('Error', 'js build error.');

   zlib.gzip (code, function (error, zipcode) {
      zlib.gunzip (zipcode, function (error, check) {
         if (error) return clog ('Error', 'Compression error.');
         if (code !== check.toString ('utf8')) return clog ('Error', 'Compression mismatch error.');

         fs.writeFile ('gotoB.min.js', code, 'utf8', function (error) {
            if (error) return clog ('Error', 'writeFile error.');
            clog ('Success', 'gotoB.min.js built successfully in ' + Math.round ((teishi.time () - t) / 10) / 100 + 's!', code.length + ' bytes total,', zipcode.length + ' bytes minified & gzipped,', lines, 'lines of source code.');
         });
      });
   });
}

build (dale.go (['dale', 'teishi', 'lith', 'recalc', 'cocholate'], function (v) {
   return 'node_modules/' + v + '/' + v + '.js';
}).concat ('./gotoB.js'), process.argv [2] === 'dev');

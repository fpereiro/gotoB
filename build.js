/*
gotoB - v0.2.1

Written by Federico Pereiro (fpereiro@gmail.com) and released into the public domain.

To build gotoB, run `node build`. If everything works well, a file named `gotoB.min.js` will be created.
*/

(function () {

   var fs       = require ('fs');
   var dale     = require ('dale');
   var teishi   = require ('teishi');
   var UglifyJS = require ('uglify-js');
   var zlib     = require ('zlib');
   var log      = teishi.l;

   var build = function (files, dev) {

      var concat = '';
      dale.do (files, function (v) {
         concat += fs.readFileSync (v, 'utf8');
      });

      if (dev) {
         return fs.writeFile ('gotoB.min.js', concat, 'utf8', function (error) {
            if (error) return log ('Error', 'writeFile error.');
            log ('Success', 'gotoB.min.js built successfully!');
         });
      }

      try {
         var lines = 0;
         dale.do (files, function (v) {
            lines += fs.readFileSync (v, 'utf8').split ('\n').length;
         });
      }
      catch (error) {
         log ('Error', 'A source file is missing.');
         throw new Error (error);
      }

      var code = UglifyJS.minify (concat).code;
      if (! code) {
         log ('Error', 'js build error.');
      }

      zlib.gzip (code, function (error, zipcode) {
         zlib.gunzip (zipcode, function (error, check) {
            if (error) return log ('Error', 'Compression error.');
            if (code !== check.toString ('utf8')) return log ('Error', 'Compression mismatch error.');

            fs.writeFile ('gotoB.min.js', code, 'utf8', function (error) {
               if (error) return log ('Error', 'writeFile error.');
               log ('Success', 'gotoB.min.js built successfully!', code.length + ' bytes total,', zipcode.length + ' bytes minified & gzipped,', lines, 'lines of source code.');
            });
         });
      });
   }

   build (dale.do (['dale', 'teishi', 'lith', 'recalc', 'cocholate'], function (v) {
      return 'node_modules/' + v + '/' + v + '.js';
   }).concat ('./gotoB.js'), process.argv [2] === 'dev');

}) ();

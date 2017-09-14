(function () {

   c.place ('head', 'beforeEnd',  lith.g (['link', {rel: 'stylesheet', href: 'https://unpkg.com/purecss@1.0.0/build/pure-min.css', integrity: 'sha384-nn4HPE8lTHyVtfCBi5yW9d20FjT8BJwUXyWZT9InLYax14RDjBj46LmSztkmNP9w',  crossorigin: 'anonymous'}]));

   var view = function () {
      return B.view (['Data'], {listen: [
         ['reload', 'data', function () {
            B.do ('set', ['Data', 'items'], [
               {title: 'A book on design', price: 5},
               {title: 'Something useless', price: 8},
               {title: 'Kittens & sunshine', price: 11},
               {title: 'Dinner & movie with JSON', price: 200}
            ]);
            alert ('Loaded fresh data!');
         }],
         ['addto', '*', function (x) {
            var item = B.get ('Data', 'items') [x.path [0]];
            var q    = B.get ('Data', 'addto', x.path [0]);
            if (! item || ! q) return;
            item = teishi.c (item);
            if (! q.match (/^\d+$/)) return alert ('Please enter a valid amount.');
            item.amount = parseInt (q);

            if (! B.get ('Data', 'cart')) B.do ('set', ['Data', 'cart'], []);
            var matching = dale.stopNot (B.get ('Data', 'cart'), undefined, function (cartitem, k) {
               if (cartitem.title === item.title) return k;
            });

            B.do ('set', ['Data', 'addto', x.path [0]], '');
            if (matching === undefined) return B.do ('add', ['Data', 'cart'], item);
            B.do ('set', ['Data', 'cart', matching, 'amount'], B.get ('Data', 'cart', matching, 'amount') + parseInt (q));
         }],
         ['change', ['Data', 'cart'], function () {
            var cart = B.get ('Data', 'cart');
            var total = 0;
            dale.do (cart, function (item) {
               total += item.amount * item.price;
            });
            B.do ('set', ['Data', 'total'], total);
         }],
         ['checkout', [], function () {
            var cart = B.get ('Data', 'cart');
            alert ('PROFIT! ' + teishi.s (cart));
            B.do ('set', ['Data', 'cart'], []);
         }]
      ], ondraw: function () {
         if (! B.get ('Data', 'items')) B.do ('reload', 'data');
      }}, function (x, Data) {

         if (! Data) return;

         var colsleft  = ['title', 'price', 'actions'];
         var colsright = ['title', 'price', 'subtotal', 'actions'];

         return [
            ['style', lith.css.g ([
               ['body', {padding: 15}],
               ['span.action', {color: 'blue', cursor: 'pointer', 'text-decoration': 'underline'}]
            ])],
            ['div', {class: 'left pure-u-1-2'}, [
               ['h3', 'Product list'],
               ['h4', [dale.fil (Data.items, undefined, function (item) {
                  if (! Data.filter || item.title.toLowerCase ().match (Data.filter.toLowerCase ())) return item;
               }).length, ' matching products, ', (Data.items || []).length, ' total.']],
               ['span', B.ev ({class: 'action'}, ['onclick', 'reload', 'data']), 'Reload'],
               ['br'],
               ['br'],
               ['form', {class: 'pure-form'}, [
                  ['input', B.ev ({placeholder: 'filter', value: B.get ('Data', 'filter')}, ['onchange, oninput', 'set', ['Data', 'filter']])],
               ]],
               ['br'],
               ['br'],
               ['table', {class: 'pure-table pure-table-bordered pure-table-striped'}, [
                  ['thead', ['tr', dale.do (colsleft, function (key) {return ['th', key]})]],
                  dale.fil (Data.items, undefined, function (item, k) {
                     if (Data.filter && item.title.toLowerCase ().match (Data.filter.toLowerCase ()) === null) return;
                     return ['tr', dale.do (colsleft, function (key) {
                        if (key === 'actions') return ['td', [
                           ['input', B.ev ({placeholder: 'Please enter a number', value: B.get ('Data', 'addto', k)},
                              ['onchange, oninput', 'set', ['Data', 'addto', k]]
                           )],
                           ['span', B.ev ({class: 'action'}, ['onclick', 'addto', k]), ' Add to cart'],
                        ]];
                        return ['td', item [key]];
                     })];
                  })
               ]]
            ]],
            ['div', {class: 'right pure-u-1-2'}, [
               ['h3', 'My cart'],
               ['h4', [(Data.cart || []).length, ' products in cart, total amount: $', Data.total || 0]],
               ['table', {class: 'pure-table pure-table-bordered pure-table-striped'}, [
                  ['thead', ['tr', dale.do (colsright, function (key) {return ['th', key]})]],
                  dale.fil ((Data.cart || []), undefined, function (item, k) {
                     return ['tr', dale.do (colsright, function (key) {
                        if (key === 'subtotal') return ['td', item.amount * item.price];
                        if (key === 'actions') return ['td', [
                           ['span', B.ev ({class: 'action'}, ['onclick', 'rem', ['Data', 'cart'], {args: k}]), 'Remove from cart'],
                        ]];
                        return ['td', item [key]];
                     })];
                  })
               ]],
               ['br'], ['br'],
               (Data.cart || []).length === 0 ? [] : ['button', B.ev ({style: 'background: rgb(28, 184, 65)', class: 'pure-button button-success'},
                  ['onclick', 'checkout', []]
               ), 'Show me the money!']
            ]],
         ];
      });
   }

   B.mount ('body', view ());

}) ();

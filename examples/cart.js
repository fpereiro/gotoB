// *** STORE ***

/*
Structure of the store:

products:   [{id: INTEGER, title: STRING, price: INTEGER|FLOAT}, ...]
cart:       {productId: INTEGER, ...}
quantities: {productId: STRING, ...}
total:      INTEGER
filter:     STRING

Note: all keys on the store might be `undefined` before being initialized.
*/

// *** RESPONDERS ***

B.mrespond ([
   ['load', 'data', function (x) {
      // On a real shopping cart, the products would be retrieved from a server through an ajax call.
      B.call (x, 'set', 'products', [
         {id: 'p1', title: 'A book on design', price: 5},
         {id: 'p2', title: 'Something useless', price: 8},
         {id: 'p3', title: 'Kittens & sunshine', price: 11},
         {id: 'p4', title: 'Dinner & movie with JSON', price: 200}
      ]);
      alert ('Loaded fresh data!');
   }],
   ['cart', 'add', function (x, productId, quantity) {
      var cart = B.get ('cart') || {};
      quantity = parseInt (quantity);
      if (isNaN (quantity) || quantity <= 0) return alert ('Please enter a valid quantity.');
      if (! cart [productId]) B.call (x, 'set', ['cart', productId], quantity);
      else                    B.call (x, 'set', ['cart', productId], cart [productId] + quantity);
   }],
   // cart changes when items are added or removed, so we link its change to a recalculation of the total.
   ['change', 'cart', {match: B.changeResponder}, function (x) {
      B.call (x, 'calculate', 'total');
   }],
   ['calculate', 'total', function (x) {
      var products = B.get ('products'), total = 0;
      dale.go (B.get ('cart'), function (quantity, productId) {
         var product = dale.stopNot (products, undefined, function (product) {
            if (product.id === productId) return product;
         });
         total += product.price * quantity;
      });
      B.call (x, 'set', 'total', total);
   }],
   ['checkout', [], function (x) {
      var cart = B.get ('cart');
      alert ('PROFIT! ' + JSON.stringify (cart));
      B.call (x, 'rem', [], 'cart');
   }]
]);

// *** VIEWS ***

var cart = function () {

   var colsleft  = ['title', 'price', 'actions'];
   var colsright = ['title', 'price', 'quantity', 'subtotal', 'actions'];

   return [
      ['style', [
         ['body', {padding: 15}],
         ['span.action', {color: 'blue', cursor: 'pointer', 'text-decoration': 'underline'}]
      ]],
      B.view ([['products'], ['filter']], function (products, filter) {

         if (products === undefined) products = [];

         var filteredProducts = dale.fil (products, undefined, function (product) {
            if (filter === undefined || filter === '') return product;
            if (product.title.toLowerCase ().match (filter.toLowerCase ())) return product;
         });

         return ['div', {class: 'left pure-u-1-2'}, [
            ['h3', 'Product list'],
            ['h4', [filteredProducts.length, ' matching products, ', products.length, ' total.']],
            ['span', {class: 'action', onclick: B.ev ('load', 'data')}, 'Load data'],
            ['br'],
            ['br'],
            ['form', {class: 'pure-form'}, [
               ['input', {
                  placeholder: 'filter',
                  value: filter,
                  onchange: B.ev ('set', 'filter'),
                  oninput:  B.ev ('set', 'filter')
               }]
            ]],
            ['br'], ['br'],
            ['table', {class: 'pure-table pure-table-bordered pure-table-striped'}, [
               ['thead', ['tr', dale.go (colsleft, function (key) {return ['th', key]})]],
               dale.go (filteredProducts, function (product) {
                  return B.view (['quantities', product.id], function (quantity) {
                     return ['tr', dale.go (colsleft, function (key) {
                        if (key === 'actions') return ['td', [
                           ['input', {
                              placeholder: 'Please enter a number',
                              value:       quantity,
                              onchange:    B.ev ('set', ['quantities', product.id], {raw: 'this.value'}),
                              oninput:     B.ev ('set', ['quantities', product.id], {raw: 'this.value'})
                           }],
                           ['LITERAL', '&nbsp;'],
                           ['LITERAL', '&nbsp;'],
                           ['span', {class: 'action', onclick: B.ev (['cart', 'add', product.id, quantity], ['rem', 'quantities', product.id])}, 'Add to cart'],
                        ]];
                        return ['td', product [key]];
                     })];
                  });
               })
            ]]
         ]];
      }),
      B.view ([['products'], ['cart'], ['total']], function (products, cart, total) {
         if (cart === undefined) cart = {};
         return ['div', {class: 'right pure-u-1-2'}, [
            ['h3', 'My cart'],
            ['h4', [dale.keys (cart).length, ' products in cart, total amount: $', total || 0]],
            ['table', {class: 'pure-table pure-table-bordered pure-table-striped'}, [
               ['thead', ['tr', dale.go (colsright, function (key) {return ['th', key]})]],
               dale.go (cart, function (quantity, productId) {
                  var product = dale.stopNot (products, undefined, function (product) {
                     if (product.id === productId) return product;
                  });
                  return ['tr', dale.go (colsright, function (key) {
                     if (key === 'quantity') return ['td', quantity];
                     if (key === 'subtotal') return ['td', product.price * quantity];
                     if (key === 'actions') return ['td', [
                        ['span', {class: 'action', onclick: B.ev ('rem', 'cart', productId)}, 'Remove from cart'],
                     ]];
                     return ['td', product [key]];
                  })];
               })
            ]],
            ['br'], ['br'],
            dale.keys (cart).length > 0 ? ['button', {
               style: 'background: rgb(28, 184, 65)',
               class: 'pure-button button-success',
               onclick: B.ev ('checkout', [])
            }, 'Show me the money!'] : []
         ]];
      })
   ];
}

B.mount ('body', cart);

B.call ('load', 'data');

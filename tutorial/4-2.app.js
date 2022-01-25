var server = function (method, path) {
   var body = arguments.length === 4 ? arguments [2] : undefined;
   var cb   = arguments.length === 4 ? arguments [3] : arguments [2];
   if (! cb) cb = function () {};

   var reply = function (code, body) {
      setTimeout (function () {
         if (code >= 400) return cb (body);
         else             return cb (null, body);
      }, 10);
   }

   if (method !== 'GET'  && method !== 'POST') return reply (400, {error: 'Invalid method: ' + method});

   if (method === 'GET' && (path !== '/products' && path !== '/cart')) return reply (404, {error: 'Path not found'});

   if (method === 'POST' && path !== '/cart') return reply (404, {error: 'Path not found'});

   if (method === 'GET' && path === '/products') {
      return reply (200, [
         {id: 1, name: 'banana', image: 'banana.png', price: 3},
         {id: 2, name: 'book',   image: 'book.png',   price: 5},
         {id: 3, name: 'car',    image: 'car.png',    price: 80},
         {id: 4, name: 'table',  image: 'table.png',  price: 25},
         {id: 5, name: 'tree',   image: 'banana.png', price: 40},
      ]);
   }

   if (method === 'GET' && path === '/cart') {
      var cart = localStorage.getItem ('cart');

      if (cart) cart = JSON.parse (cart);
      else cart = [];

      reply (200, cart);
   }

   if (method === 'POST' && path === '/cart') {
      localStorage.setItem ('cart', JSON.stringify (body));
      reply (200, '');
   }
}

var loadProducts = function (cb) {
   server ('GET', '/products', cb);
}

var saveCart = function (cart, cb) {
   server ('POST', '/cart', cart, cb);
}

var loadCart = function (cb) {
   server ('GET', '/cart', cb);
}

// Adapted from https://github.com/staltz/flux-challenge

// The goal of `fluxServer.js` is to provide a fake server that can be run fully on the client and is functionally equivalent to the real server in the Flux challenge.

var jedis = [
  {
    id: 5105,
    name: 'Xendor',
    homeworld: {
      id: 58,
      name: 'Coruscant',
    },
    master: null,
    apprentice: 4629,
  },
  {
    id: 4629,
    name: 'Ajunta Pall',
    homeworld: {
      id: 19,
      name: 'Alderaan',
    },
    master: 5105,
    apprentice: 4601,
  },
  {
    id: 4601,
    name: 'Simus',
    homeworld: {
      id: 27,
      name: 'Korriban',
    },
    master: 4629,
    apprentice: 2950,
  },
  {
    id: 2950,
    name: 'Naga Sadow',
    homeworld: {
      id: 64,
      name: 'Ziost',
    },
    master: 4601,
    apprentice: 8295,
  },
  {
    id: 8295,
    name: 'Freedon Nadd',
    homeworld: {
      id: 62,
      name: 'Onderon',
    },
    master: 2950,
    apprentice: 2941,
  },
  {
    id: 2941,
    name: 'Exar Kun',
    homeworld: {
      id: 58,
      name: 'Coruscant',
    },
    master: 8295,
    apprentice: 1548,
  },
  {
    id: 1548,
    name: 'Jorak Uln',
    homeworld: {
      id: 27,
      name: 'Korriban',
    },
    master: 2941,
    apprentice: 4618,
  },
  {
    id: 4618,
    name: 'Skere Kaan',
    homeworld: {
      id: 58,
      name: 'Coruscant',
    },
    master: 1548,
    apprentice: 5611,
  },
  {
    id: 5611,
    name: 'Na\'daz',
    homeworld: {
      id: 35,
      name: 'Ryloth',
    },
    master: 4618,
    apprentice: 9285,
  },
  {
    id: 9285,
    name: 'Kas\'im',
    homeworld: {
      id: 38,
      name: 'Nal Hutta',
    },
    master: 5611,
    apprentice: 3256,
  },
  {
    id: 3256,
    name: 'Darth Bane',
    homeworld: {
      id: 40,
      name: 'Apatros',
    },
    master: 9285,
    apprentice: 3385,
  },
  {
    id: 3385,
    name: 'Darth Zannah',
    homeworld: {
      id: 11,
      name: 'Somov Rit',
    },
    master: 3256,
    apprentice: 2942,
  },
  {
    id: 2942,
    name: 'Darth Cognus',
    homeworld: {
      id: 5,
      name: 'Iktotch',
    },
    master: 3385,
    apprentice: 1121,
  },
  {
    id: 1121,
    name: 'Darth Millennial',
    homeworld: {
      id: 94,
      name: 'Dromund Kaas',
    },
    master: 2942,
    apprentice: 5956,
  },
  {
    id: 5956,
    name: 'Darth Tenebrous',
    homeworld: {
      id: 90,
      name: 'Clak\'dor VII',
    },
    master: 1121,
    apprentice: 2350,
  },
  {
    id: 2350,
    name: 'Darth Plagueis',
    homeworld: {
      id: 83,
      name: 'Mygeeto',
    },
    master: 5956,
    apprentice: 3616,
  },
  {
    id: 3616,
    name: 'Darth Sidious',
    homeworld: {
      id: 7,
      name: 'Naboo',
    },
    master: 2350,
    apprentice: 1489,
  },
  {
    id: 1489,
    name: 'Darth Vader',
    homeworld: {
      id: 18,
      name: 'Tatooine',
    },
    master: 3616,
    apprentice: 1330,
  },
  {
    id: 1330,
    name: 'Antinnis Tremayne',
    homeworld: {
      id: 58,
      name: 'Coruscant',
    },
    master: 1489,
    apprentice: null,
  }
];

var worlds = [
  {
    id: 8,
    name: 'Cato Neimoidia',
  },
  {
    id: 57,
    name: 'Dagobah',
  },
  {
    id: 10,
    name: 'Endor',
  },
  {
    id: 14,
    name: 'Felucia',
  },
  {
    id: 59,
    name: 'Geonosis',
  },
  {
    id: 24,
    name: 'Hoth',
  },
  {
    id: 36,
    name: 'Jakku',
  },
  {
    id: 95,
    name: 'Jestefad',
  },
  {
    id: 74,
    name: 'Kamino',
  },
  {
    id: 92,
    name: 'Kashyyyk',
  },
  {
    id: 13,
    name: 'Mustafar',
  },
  {
    id: 4,
    name: 'Saleucami',
  },
  {
    id: 32,
    name: 'Utapau',
  },
  {
    id: 12,
    name: 'Bespin',
  },
  {
    id: 58,
    name: 'Coruscant',
  },
  {
    id: 19,
    name: 'Alderaan',
  },
  {
    id: 27,
    name: 'Korriban',
  },
  {
    id: 64,
    name: 'Ziost',
  },
  {
    id: 62,
    name: 'Onderon',
  },
  {
    id: 35,
    name: 'Ryloth',
  },
  {
    id: 38,
    name: 'Nal Hutta',
  },
  {
    id: 40,
    name: 'Apatros',
  },
  {
    id: 11,
    name: 'Somov Rit',
  },
  {
    id: 5,
    name: 'Iktotch',
  },
  {
    id: 94,
    name: 'Dromund Kaas',
  },
  {
    id: 90,
    name: 'Clak\'dor VII',
  },
  {
    id: 83,
    name: 'Mygeeto',
  },
  {
    id: 7,
    name: 'Naboo',
  },
  {
    id: 18,
    name: 'Tatooine',
  }
];

window.server = {
   worldsSocket: function (listener) {
      var randomWorld = worlds [Math.floor (Math.random () * worlds.length)];
      listener (JSON.stringify (randomWorld));

      setInterval (function () {
         var randomWorld = worlds [Math.floor (Math.random () * worlds.length)];
         listener (JSON.stringify (randomWorld));
      }, 5000); // 5000ms delay between world and world
   },
   getJedi: function (id, listener) {
      var jedi = Object.values (jedis).filter (function (jedi) {
         if (jedi.id === id) return true;
      }) [0];

      if (! jedi) return listener ('404. No such jedi.');

      jedi = teishi.copy (jedi);

      jedi.master = {
         url: jedi.master ? '/dark-jedis/' + jedi.master : null,
         id: jedi.master
      };
      jedi.apprentice = {
         url: jedi.apprentice ? '/dark-jedis/' + jedi.apprentice : null,
         id: jedi.apprentice
      };

      setTimeout (function () {
         listener (null, JSON.stringify (jedi));
      }, 500 + Math.round (1000 * Math.random ())); // Wait 500ms + 0-1000ms to reply.
   }
}

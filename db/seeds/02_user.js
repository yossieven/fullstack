exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([{
        id: 1,
        name: 'יוסי',
        last_name: 'אבן',
        email: 'yossi.even@gmail.com',
        password: 'q1w2e3r4',
        city: 'נהרייה',
        street: 'שקד',
        role: 0
      }, ]);
    });
};
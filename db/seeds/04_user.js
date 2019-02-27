const bcrypt = require('bcrypt');


exports.seed = function (knex, Promise) {
  console.log("USER update seed");
  knex('user').then((users) => {
    return users.forEach(element => {
      bcrypt.hash(element.password, 10, function (err, hash) {
        if (err) {
          console.log("err encrypt password in seed user", err);
        }
        console.log("encrypted password : ", hash);
        password = hash;

        // Inserts seed entries
        return knex('user').where({
            'id': element.id
          }).update({
            password: password
          })
          .catch((err) => {
            console.log('USER update : ', err.sqlMessage);
            return err;
          });
      });
    });
  })
  let password = "q1w2e3r4";


};
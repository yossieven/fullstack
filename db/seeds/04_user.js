const bcrypt = require('bcrypt');


exports.seed = function (knex, Promise) {
  console.log("USER update seed");
  let password = "q1w2e3r4";
  return bcrypt.hash(password, 10, function (err, hash) {
    if (err) {
      console.log("err encrypt password in seed user", err);
    }
    console.log("encrypted password : ", hash);
    password = hash;

    // Inserts seed entries
    return knex('user').where({
        'id': 1
      }).update({
        password: password
      })
      .catch((err) => {
        console.log('USER update : ', err.sqlMessage);
        return err;
      });
  });

};
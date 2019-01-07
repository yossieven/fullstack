exports.seed = function (knex, Promise) {
  // Inserts seed entries
  return knex('product').insert([{
        id: 1,
        name: 'חלב בקרטון 3% שופרסל',
        category: 1,
        price: 5.30,
        image: 'z_7296073231554.PNG'
      },
      {
        id: 2,
        name: 'חלב 1% בקרטון שופרסל',
        category: 1,
        price: 5.30,
        image: 'z_7296073231547.PNG'
      },
      {
        id: 3,
        name: 'חלב טרי 2% דל לקטוז - תנובה',
        category: 1,
        price: 7.10,
        image: 'z_40974.PNG'
      },
      {
        id: 4,
        name: 'חלב מפוסטר 1% בקרטון - תנובה',
        category: 1,
        price: 5.40,
        image: 'z_42435.PNG'
      },
      {
        id: 5,
        name: 'חלב מועשר בקרטון 1% שומן - תנובה',
        category: 1,
        price: 8.00,
        image: 'z_42466.PNG'
      },
      {
        id: 6,
        name: '3.6%-4%חלב של פעם מלא - תנובה',
        category: 1,
        price: 7.40,
        image: 'z_51352.PNG'
      },
      {
        id: 7,
        name: 'חלב מועשר יטבתה 3% כד - יטבתה',
        category: 1,
        price: 15.00,
        image: 'z_3029815.PNG'
      }
    ])
    .catch((err) => {
      console.log('PRODUCT: ', err.sqlMessage);
      return err;
    });
};
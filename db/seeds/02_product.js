exports.seed = function (knex, Promise) {
  console.log("PRODUCT seed");
  // Inserts seed entries
  return knex('product').insert([{
        id: 1,
        name: 'חלב בקרטון 3% שופרסל',
        category: 2,
        price: 5.30,
        image: 'z_7296073231554.PNG'
      },
      {
        id: 2,
        name: 'חלב 1% בקרטון שופרסל',
        category: 2,
        price: 5.30,
        image: 'z_7296073231547.PNG'
      },
      {
        id: 3,
        name: 'חלב טרי 2% דל לקטוז - תנובה',
        category: 2,
        price: 7.10,
        image: 'z_40974.PNG'
      },
      {
        id: 4,
        name: 'חלב מפוסטר 1% בקרטון - תנובה',
        category: 2,
        price: 5.40,
        image: 'z_42435.PNG'
      },
      {
        id: 5,
        name: 'חלב מועשר בקרטון 1% שומן - תנובה',
        category: 2,
        price: 8.00,
        image: 'z_42466.PNG'
      },
      {
        id: 6,
        name: '3.6%-4%חלב של פעם מלא - תנובה',
        category: 2,
        price: 7.40,
        image: 'z_51352.PNG'
      },
      {
        id: 7,
        name: 'חלב מועשר יטבתה 3% כד - יטבתה',
        category: 2,
        price: 15.00,
        image: 'z_3029815.PNG'
      },
      {
        id: 8,
        name: "עגבניות",
        category: 3,
        price: 6.9,
        image: "e_22.png"
      },
      {
        id: 9,
        name: 'גבינה לבנה 3% תנובה - תנובה',
        category: 2,
        price: 9.20,
        image: 'e_4131227.PNG'
      },
      {
        id: 10,
        name: 'גבינה לבנה 5% סקי - שטראוס',
        category: 2,
        price: 9.20,
        image: 'e_2824183.PNG'
      },
      {
        id: 11,
        name: '5% קוטג\' תנובה - תנובה',
        category: 2,
        price: 5.50,
        image: 'e_41445.PNG'
      },
      {
        id: 12,
        name: 'פלפל אדום - קטיף',
        category: 3,
        price: 9.90,
        image: 'e_91.PNG'
      },
      {
        id: 13,
        name: 'מלפפון טרי ארוז - שופרסל',
        category: 3,
        price: 6.90,
        image: 'e_7296073342809.PNG'
      },
      {
        id: 14,
        name: 'בשר בקר טחון טרי - שופרסל',
        category: 4,
        price: 39.0,
        image: 'e_9012361.PNG'
      },
      {
        id: 15,
        name: 'אנטריקוט טרי חלק אנגוס - שופרסל',
        category: 4,
        price: 139.90,
        image: 'e_9012392.PNG'
      },
      {
        id: 16,
        name: 'פילה אמנון טרי שופרסל - שופרסל',
        category: 4,
        price: 86.90,
        image: 'e_9011043.PNG'
      },
      {
        id: 17,
        name: 'יין ירדן הר חרמון אדום יבש',
        category: 5,
        price: 29.60,
        image: '6019.jpg'
      }
    ])
    .catch((err) => {
      console.log('PRODUCT: ', err.sqlMessage);
      return err;
    });
};
const sdk = require('../index.js');

const liteApi = sdk('sand_c0155ab8-c683-4f26-8f94-b5e92c5797b9');

liteApi.getPlaces('Manhattan').then((places) => {
  console.log(places);
});

liteApi.getHotels({ countryCode: 'IT', cityName: 'Rome' }).then((hotels) => {
  console.log(hotels);
});
const sdk = require('../index.js');

const liteApi = sdk('your_api_key');

liteApi.getPlaces('Manhattan').then((places) => {
  console.log(places);
});
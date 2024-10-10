const sdk = require('../index.js');

const liteApi = sdk('sand_c0155ab8-c683-4f26-8f94-b5e92c5797b9');


liteApi.getFullRates({
  hotelIds: ['lp1897'],
  occupancies: [{ adults: 2, children: [5] }], 
  currency: 'USD',
  guestNationality: 'US',
  checkin: '2024-12-30',
  checkout: '2024-12-31',
  countryCode: 'USD' 
}).then((rates) => {
  console.log('rates:', JSON.stringify(rates, null, 2)); 
});

liteApi.preBook({offerId:'GE5ESNBSIZKVMQ2QJJNEERSPKIZEMR2OIRKVOVCTKNFVMRCWKNLUWVKKGVDVMRKWGJEEWRSOIVEVCS2PJRFEUVKPK5JVKSKSI5LFKVKTLBFFMSKWKVJEGQSKKZHEMRKSGJFEYRSDIU3FIS2LJRBEIVSLJUZEKSSOJBDEKVSTJBGEUSSWJFJEWTSJJJGFKT2TJJKESUSGKU2FKU2WJE2UKVSTKJBUQSSWIZDEOURSIJDU4S2FI5KFGMSLLJCFMU2NKNKUUVSIIVKVMMSOJNLE4RKJKFFU6S2KJJKU6V2KKNFVER2VGRJEEVKJGVBVMRKWINDEUVSCIZDVEMSSJRDEWRKLKRFTES2GJFDEGV2TIVEUMR2WIVLEWSCJKZHEKSKSGJHEUUJSIUZFMU2ZJFMTGRSNKMZFKS2CJJCVOVSTJBDTKQSWJVJTET2JJZCUMU2UJNKESSSEKVCVCU2ZJRDEOVSFKUZESSKGJZDFCV2LK5FEUSSVK5LVGTSKIJBVIT2RKNJUSNBSIZKVEQ2SJJNEERSDKIZEUR2SINDEOVCLINGEERKFINGTERSKGRNEKV2RGJHEUVSKIZEVIS2OJNFE4RKPKZFVGS2SI5KTEVKTKVEVUS2UI5JEGRSKGVDEMTKVINJUUSSDKUZFMQ2VI5JEIVKTK5FUKSKWJBCUKVKTJBFEMTSFJFJTETSLJJEVKT2RJNNEUQSNKUZFIQSVJJHEKVSTKZBUQSSWJZDEKVKDKJDUUQ2FI5KEWS2LKZCUKQ2VKNLUSVSLIZKVEQ2MJJFEGRKLJZBUUTCKJJKU6UKLGJEVERKVLFJVGU2JGVCVMT2WINDEUWSGIVBVEMSKJRDEGRSLKRFUGS2GGZCESTKKLJDFSM2UIE3UEU2HIFNEISKMJJJEOSKXKRCU4SSBI5EVSRCVJVBFCSCJLFCECN2DKNFDI7BWGI4TK7BSPRWHAMJYHE3XYMRNPRKVGRD4KVJXYMRQGI2C2MJSFUZTA7BSGAZDILJRGIWTGML4PQZC4MBQ'})
 .then((preBook) => {
  console.log(preBook);
});  

liteApi.book({holder: {
  firstName: "Steve",
  lastName: "Doe",
  email: "s.doe@liteapi.travel"
},
payment: {
  method: "ACC_CREDIT_CARD"
},
prebookId: "G8CsAGcQE", 
guests: [
  {
    occupancyNumber: 1,
    remarks: "quiet room please",
    firstName: "Sunny",
    lastName: "Mars",
    email: "s.mars@liteapi.travel"
  }
]}).then((book) => {
  console.log(book);
});

liteApi.getBookingsList({clientReference: 'testref'}).then((bookings) => { //query parameters
  console.log(bookings);
});

liteApi.retrieveBooking('TaGu19c_H').then((booking) => {  //path parameters
  console.log(booking);
});  

liteApi.cancelBooking('TaGu19c_H').then((cancel) => { 
  console.log(cancel);
});

liteApi.getCitiesByCountryCode({countryCode: 'SG'}).then((cities) => { 
  console.log('cities', JSON.stringify(cities, null, 2)); 
});  

liteApi.getPlaces('Manhattan').then((places) => {
  console.log(places);
});

liteApi.getCurrencies().then((currencies) => {
  console.log(currencies);
});

liteApi.getHotelFacilities().then((facilities) => {          
  console.log(facilities);
});

liteApi.getHotelTypes().then((types) => { 
  console.log(types);
});

liteApi.getHotelChains().then((chains) => {
  console.log(chains);
});

liteApi.getHotels({ countryCode: 'IT', cityName: 'Rome' }).then((hotels) => {
  console.log(hotels);
});

liteApi.getHotelDetails('lp1897').then((details) => {
  console.log(details);
});

liteApi.getHotelReviews('lp1897',true).then((reviews) => {
  console.log(reviews);
});

liteApi.getCountries().then((countries) => {
  console.log(countries);
});

liteApi.getIataCodes().then((codes) => { 
  console.log(codes);
});  

liteApi.getGuestsIds(10).then((guests) => { //path parameters
  console.log(guests);
});

liteApi.getGuestsBookings(10).then((guests) => { 
  console.log(guests);
});

liteApi.getVouchers().then((response) => {
  console.log('Vouchers Response:', JSON.stringify(response, null, 2)); 
});

liteApi.getVoucherById(80).then((vouchers) => {    
  console.log(vouchers);
});  

liteApi.createVoucher({voucher_code: "em1zpd7l", discount_type: "percentage", discount_value: 12, minimum_spend: 60, maximum_discount_amount: 20, currency: "USD", validity_start: "2024-06-03", validity_end: "2024-07-30", usages_limit: 10, status: "active"}).then((voucher) => {    
  console.log(voucher);
});  

liteApi.updateVoucher('80', {voucher_code: "em8kyd7l", discount_type: "percentage", discount_value: 12, minimum_spend: 60, maximum_discount_amount: 20, currency: "USD", validity_start: "2024-06-03", validity_end: "2024-07-30", usages_limit: 10, status: "active"}).then((voucher) => {    
  console.log(voucher);
}); 

liteApi.updateVoucherStatus('80', {status: "inactive"}).then((voucher) => {
  console.log(voucher);
});

liteApi.getLoyalty().then((loyalty) => {    
  console.log(loyalty);
});

liteApi.enableLoyalty({status: "disabled", cashbackRate: 0.03 }).then((loyalty) => {  
  console.log(loyalty);
}); 

liteApi.updateLoyalty({status: "enable", cashbackRate: 0.03 }).then((loyalty) => {
  console.log(loyalty);
});

liteApi.retrieveWeeklyAnalytics({from: "2024-01-01", to: "2024-01-07"}).then((analytics) => {
  console.log('retrieveWeeklyAnalytics:', JSON.stringify(analytics, null, 2)); 
});

liteApi.retrieveAnalyticsReport({from: "2024-01-01", to: "2024-01-07"}).then((analytics) => {
  console.log('retrieveAnalyticsReport:', JSON.stringify(analytics, null, 2)); 
});

liteApi.retrieveMarketAnalytics({from: "2024-01-01", to: "2024-01-07"}).then((analytics) => {
  console.log('retrieveMarketAnalytics:', JSON.stringify(analytics, null, 2)); 
});

liteApi.retrieveMostBookedHotels({from: "2024-01-01", to: "2024-01-07"}).then((analytics) => {
  console.log(analytics);
});
const expect = require('expect.js');
const liteApi = require('../index.js')('sand_c0155ab8-c683-4f26-8f94-b5e92c5797b9'); 

describe('LiteAPI SDK Test Suite', function() {
  this.timeout(20000); 

  it('should retrieve full rates', async function() {
    const data = {
      hotelIds: ['lp1897'],
      occupancies: [{ adults: 2, children: [5] }],
      currency: 'USD',
      guestNationality: 'US',
      checkin: '2024-12-30',
      checkout: '2024-12-31',
      countryCode: 'USD',
    };

    const result = await liteApi.getFullRates(data);
    expect(result).to.have.property('status', 'success');
    expect(result).to.have.property('data');
    expect(result.data).to.be.an('object');
  });

  it('should prebook an offer', async function() {
    const data = {
      offerId: 'GE5ESNBSIZKVMQ2QJJNEERSPKIZEMR2OIRKVOVCTKNFVMRCWKNLUWVKKGVDVMRKWGJEEWRSOIVEVCS2PJRFEUVKPK5JVKSKSI5LFKVKTLBFFMSKWKVJEGQSKKZHEMRKSGJFEYRSDIU3FIS2LJRBEIVSLJUZEKSSOJBDEKVSTJBGEUSSWJFJEWTSJJJGFKT2TJJKESUSGKU2FKU2WJE2UKVSTKJBUQSSWIZDEOURSIJDU4S2FI5KFGMSLLJCFMU2NKNKUUVSIIVKVMMSOJNLE4RKJKFFU6S2KJJKU6V2KKNFVER2VGRJEEVKJGVBVMRKWINDEUVSCIZDVEMSSJRDEWRKLKRFTES2GJFDEGV2TIVEUMR2WIVLEWSCJKZHEKSKSGJHEUUJSIUZFMU2ZJFMTGRSNKMZFKS2CJJCVOVSTJBDTKQSWJVJTET2JJZCUMU2UJNKESSSEKVCVCU2ZJRDEOVSFKUZESSKGJZDFCV2LK5FEUSSVK5LVGTSKIJBVIT2RKNJUSNBSIZKVEQ2SJJNEMRSPKNBUMR2OINCU6VCTJNFTKRCVJNLUWVSLGRNFKR2XKNGEURSKIZEVIS2OJNFE4RKPKZFVGS2SI5KTEVKTKVEVUS2UI5JEGRSKGVDEMTKVINJUUSSDKUZFMQ2VI5JEIVKTK5FUKSKWJBCUKVKTJBFEMTSFJFJTETSLJJEVKT2RJNNEUQSNKUZFIQSVJJDEQRCNKJJUMSSWIZDEWURSJJGEMTKGKNKFGQ2LJJCFKS2NKNCUWRSFKRCVKMSLI5JEURSNKJFVGS2OJBKUWVCLGJEVEQKVGJKVGVSJLJFVMU2WINDEUUSGIZDVEMSWJNDEGRKLKRFUGR2KIRKUGV2LIJIFCMSEI5HFET2HIUZUQWKNKJIUOSJSIMZE2SSTIZKVURCLJFBFGR2BGVCECTKCGJDUCWKILFKVGUD4GYZDSNL4GJ6GY4BRHA4TO7BSFV6FKU2EPRKVG7BSGAZDILJRGIWTGMD4GIYDENBNGEZC2MZRPR6DMLRQGA', // Replace with actual offerId
    };

    const result = await liteApi.preBook(data);
    expect(result).to.have.property('status', 'success');
    expect(result).to.have.property('data');
    expect(result.data).to.be.an('object');
  });

  it('should book a hotel room', async function() {
    const data = {
      holder: {
        firstName: 'Steve',
        lastName: 'Doe',
        email: 's.doe@liteapi.travel',
      },
      payment: {
        method: 'ACC_CREDIT_CARD',
      },
      prebookId: '6-xUGK8_C', 
      guests: [
        {
          occupancyNumber: 1,
          remarks: 'quiet room please',
          firstName: 'Sunny',
          lastName: 'Mars',
          email: 's.mars@liteapi.travel',
        },
      ],
    };

    const result = await liteApi.book(data);
    expect(result).to.have.property('status', 'success');
    expect(result).to.have.property('data');
    expect(result.data).to.be.an('object');
  });

  it('should retrieve booking list', async function() {
    const result = await liteApi.getBookingsList('testref');
    expect(result).to.have.property('status', 'success');
    expect(result).to.have.property('data');
    expect(result.data).to.be.an('array');
  });

  it('should retrieve a specific booking', async function() {
    const result = await liteApi.retrieveBooking('XE1Bxh1bS'); 
    expect(result).to.have.property('status', 'success');
    expect(result).to.have.property('data');
    expect(result.data).to.be.an('object');
  });

  it('should cancel a booking', async function() {
    const result = await liteApi.cancelBooking('Ck93oaHCj'); 
    expect(result).to.have.property('status', 'success');
    expect(result).to.have.property('data');
    expect(result.data).to.be.an('object');
  });

  it('should retrieve cities by country code', async function() {
    const result = await liteApi.getCitiesByCountryCode('SG');
    expect(result).to.have.property('status', 'success');
    expect(result).to.have.property('data');
    expect(result.data).to.be.an('array');
  });

  it('should retrieve available currencies', async function() {
    const result = await liteApi.getCurrencies();
    expect(result).to.have.property('status', 'success');
    expect(result).to.have.property('data');
    expect(result.data).to.be.an('array');
  });

  it('should retrieve hotel facilities', async function() {
    const result = await liteApi.getHotelFacilities();
    expect(result).to.have.property('status', 'success');
    expect(result).to.have.property('data');
    expect(result.data).to.be.an('array');
  });

  it('should retrieve hotel types', async function() {
    const result = await liteApi.getHotelTypes();
    expect(result).to.have.property('status', 'success');
    expect(result).to.have.property('data');
    expect(result.data).to.be.an('array');
  });

  it('should retrieve hotel chains', async function() {
    const result = await liteApi.getHotelChains();
    expect(result).to.have.property('status', 'success');
    expect(result).to.have.property('data');
    expect(result.data).to.be.an('array');
  });

  it('should retrieve hotels by country and city', async function() {
    const result = await liteApi.getHotels({ countryCode: 'IT', cityName: 'Rome' });
    expect(result).to.have.property('status', 'success');
    expect(result).to.have.property('data');
    expect(result.data).to.be.an('array');
  });

  it('should retrieve hotel details by ID', async function() {
    const result = await liteApi.getHotelDetails('lp1897');
    expect(result).to.have.property('status', 'success');
    expect(result).to.have.property('data');
    expect(result.data).to.be.an('object');
  });

  it('should retrieve hotel reviews by ID', async function() {
    const result = await liteApi.getHotelReviews('lp1897', 5, true);
    expect(result).to.have.property('status', 'success');
    expect(result).to.have.property('data');
    expect(result.data).to.be.an('array');
  });

  it('should retrieve available countries', async function() {
    const result = await liteApi.getCountries();
    expect(result).to.have.property('status', 'success');
    expect(result).to.have.property('data');
    expect(result.data).to.be.an('array');
  });

  it('should retrieve IATA codes', async function() {
    const result = await liteApi.getIataCodes();
    expect(result).to.have.property('status', 'success');
    expect(result).to.have.property('data');
    expect(result.data).to.be.an('array');
  });

  it('should retrieve guest IDs', async function() {
    const result = await liteApi.getGuestsIds(10);
    expect(result).to.have.property('status', 'success');
    expect(result).to.have.property('data');
    expect(result.data).to.be.an('object');
  });

  it('should retrieve guest bookings', async function() {
    const result = await liteApi.getGuestsBookings(10);
    expect(result).to.have.property('status', 'success');
    expect(result).to.have.property('data');
    expect(result.data).to.be.an('array');
  });

  it('should retrieve vouchers', async function () {
    const result = await liteApi.getVouchers();
  
    expect(result).to.have.property('status', 'success');
    expect(result.data).to.have.property('vouchers');
    expect(result.data.vouchers).to.be.an('array');
  });

  it('should retrieve a specific voucher by ID', async function() {
    const result = await liteApi.getVoucherById(80);
    expect(result).to.have.property('status', 'success');
    expect(result).to.have.property('data');
    expect(result.data).to.be.an('object');
  });

  it('should create a new voucher', async function() {
    const data = {
      voucher_code: 'em4z9z7l',
      discount_type: 'percentage',
      discount_value: 12,
      minimum_spend: 60,
      maximum_discount_amount: 20,
      currency: 'USD',
      validity_start: '2024-06-03',
      validity_end: '2024-07-30',
      usages_limit: 10,
      status: 'active',
    };

    const result = await liteApi.createVoucher(data);
    expect(result).to.have.property('status', 'success');
    expect(result).to.have.property('data');
    expect(result.data).to.be.an('object');
  });

  it('should update an existing voucher', async function() {
    const data = {
      voucher_code: 'em8kyd7l',
      discount_type: 'percentage',
      discount_value: 12,
      minimum_spend: 60,
      maximum_discount_amount: 20,
      currency: 'USD',
      validity_start: '2024-06-03',
      validity_end: '2024-07-30',
      usages_limit: 10,
      status: 'active',
    };

    const result = await liteApi.updateVoucher(80, data);
    expect(result).to.have.property('status', 'success');
    expect(result).to.have.property('data');
    expect(result.data).to.be.an('object');
  });

  it('should update the status of a voucher', async function() {
    const result = await liteApi.updateVoucherStatus(80, { status: 'inactive' });
    expect(result).to.have.property('status', 'success');
    expect(result).to.have.property('data');
    expect(result.data).to.be.an('object');
  });

  it('should retrieve loyalty information', async function() {
    const result = await liteApi.getLoyalty();
    expect(result).to.have.property('status', 'success');
    expect(result).to.have.property('data');
    expect(result.data).to.be.an('object');
  });

  it('should enable loyalty', async function () {
    const result = await liteApi.enableLoyalty({ status: 'enabled', cashbackRate: 0.03 });
  
    if (result.status === 'failed' && result.error.message === 'loyalty already created') {
      expect(result.error).to.have.property('message', 'loyalty already created');
    } else {
      expect(result).to.have.property('status', 'success');
      expect(result).to.have.property('data');
      expect(result.data).to.be.an('object');
    }
  });

  it('should update loyalty', async function() {
    const result = await liteApi.updateLoyalty({ status: 'enable', cashbackRate: 0.03 });
    expect(result).to.have.property('status', 'success');
    expect(result).to.have.property('data');
    expect(result.data).to.be.an('object');
  });

  it('should retrieve weekly analytics', async function () {
    const result = await liteApi.retrieveWeeklyAnalytics({ from: '2024-01-01', to: '2024-01-07' });
  
    expect(result).to.have.property('status', 'success');
    expect(result.data).to.have.property('arr'); 
    expect(result.data.arr).to.be.an('array');
  });

  it('should retrieve analytics report', async function () {
    const result = await liteApi.retrieveAnalyticsReport({ from: '2024-01-01', to: '2024-01-07' });

    expect(result).to.have.property('status', 'success');
    expect(result).to.have.property('data');
});

  it('should retrieve market analytics', async function() {
    const result = await liteApi.retrieveMarketAnalytics({ from: '2024-01-01', to: '2024-01-07' });
    expect(result).to.have.property('status', 'success');
    expect(result).to.have.property('data');
    expect(result.data).to.be.an('array');
  });

  it('should retrieve most booked hotels', async function() {
    const result = await liteApi.retrieveMostBookedHotels({ from: '2024-01-01', to: '2024-01-07' });
    expect(result).to.have.property('status', 'success');
    expect(result).to.have.property('data');
    expect(result.data).to.be.an('array');
  });
});

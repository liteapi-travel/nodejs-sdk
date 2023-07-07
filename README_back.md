# liteapi-travel

liteAPI - JavaScript client for liteAPI-travel
The **liteAPI** can be used to to do the following

Get room rates & availability for a set of hotels
Select a specific hotel with room availability and make a booking
Manage the bookings - retrieve and cancel existing bookings
Get static content for hotels, search hotels by destination

- API version: 2.0.0
- Package version: 2.0.0

## Installation

### For [Node.js](https://nodejs.org/)

#### npm

To publish the library as a [npm](https://www.npmjs.com/), please follow the procedure in ["Publishing npm packages"](https://docs.npmjs.com/getting-started/publishing-npm-packages).

Then install it via:

```shell
npm install liteapi-travel --save
```

Finally, you need to build the module:

```shell
npm run build
```

##### Local development

To use the library locally without publishing to a remote npm registry, first install the dependencies by changing into the directory containing `package.json` (and this README). Let's call this `JAVASCRIPT_CLIENT_DIR`. Then run:

```shell
npm install
```

Next, [link](https://docs.npmjs.com/cli/link) it globally in npm with the following, also from `JAVASCRIPT_CLIENT_DIR`:

```shell
npm link
```

To use the link you just defined in your project, switch to the directory you want to use your liteapi-travel from, and run:

```shell
npm link /path/to/<JAVASCRIPT_CLIENT_DIR>
```

Finally, you need to build the module:

```shell
npm run build
```

#### git

If the library is hosted at a git repository, e.g.https://github.com/liteapi-travel/javascript-sdk
then install it via:

```shell
    npm install liteapi-travel/javascript-sdk --save
```

### For browser

The library also works in the browser environment via npm and [browserify](http://browserify.org/). After following
the above steps with Node.js and installing browserify with `npm install -g browserify`,
perform the following (assuming *main.js* is your entry file):

```shell
browserify main.js > bundle.js
```

Then include *bundle.js* in the HTML pages.

### Webpack Configuration

Using Webpack you may encounter the following error: "Module not found: Error:
Cannot resolve module", most certainly you should disable AMD loader. Add/merge
the following section to your webpack config:

```javascript
module: {
  rules: [
    {
      parser: {
        amd: false
      }
    }
  ]
}
```

## Getting Started

Please follow the [installation](#installation) instruction and execute the following JS code:

```javascript
var LiteApi = require('liteapi-travel');

var defaultClient = LiteApi.ApiClient.instance;
// Configure API key authorization: apikeyAuth
var apikeyAuth = defaultClient.authentications['apikeyAuth'];
apikeyAuth.apiKey = "YOUR API KEY"
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//apikeyAuth.apiKeyPrefix['X-API-Key'] = "Token"

var api = new LiteApi.BookApi()
var opts = {
  'ratesBookPostRequest': {"prebookId":"UwfMkUWH6","guestInfo":{"guestFirstName":"Kim","guestLastName":"James","guestEmail":"test@nlite.ml"},"payment":{"holderName":"Kim James","number":"4242424242424242","expireDate":"11/29","cvc":"456","method":"CREDIT_CARD"}} // {RatesBookPostRequest} 
};
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
api.ratesBookPost(opts, callback);

```

## Documentation for API Endpoints

All URIs are relative to *https://api.liteapi.travel/v2.0*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*LiteApi.BookApi* | [**ratesBookPost**](docs/BookApi.md#ratesBookPost) | **POST** /rates/book | hotel rate book
*LiteApi.BookApi* | [**ratesPrebookPost**](docs/BookApi.md#ratesPrebookPost) | **POST** /rates/prebook | hotel rate prebook
*LiteApi.BookingManagementApi* | [**bookingsBookingIdGet**](docs/BookingManagementApi.md#bookingsBookingIdGet) | **GET** /bookings/{bookingId} | Booking retrieve
*LiteApi.BookingManagementApi* | [**bookingsBookingIdPut**](docs/BookingManagementApi.md#bookingsBookingIdPut) | **PUT** /bookings/{bookingId} | Booking cancel
*LiteApi.BookingManagementApi* | [**bookingsGet**](docs/BookingManagementApi.md#bookingsGet) | **GET** /bookings | Booking list
*LiteApi.GuestAndLoyaltyApi* | [**guestsGet**](docs/GuestAndLoyaltyApi.md#guestsGet) | **GET** /guests | guests
*LiteApi.SearchApi* | [**hotelsGet**](docs/SearchApi.md#hotelsGet) | **GET** /hotels | hotel minimum rates availability
*LiteApi.SearchApi* | [**hotelsRatesGet**](docs/SearchApi.md#hotelsRatesGet) | **GET** /hotels/rates | hotel full rates availability
*LiteApi.StaticDataApi* | [**dataCitiesGet**](docs/StaticDataApi.md#dataCitiesGet) | **GET** /data/cities | City list
*LiteApi.StaticDataApi* | [**dataCountriesGet**](docs/StaticDataApi.md#dataCountriesGet) | **GET** /data/countries | Country list
*LiteApi.StaticDataApi* | [**dataCurrenciesGet**](docs/StaticDataApi.md#dataCurrenciesGet) | **GET** /data/currencies | Currency list
*LiteApi.StaticDataApi* | [**dataHotelGet**](docs/StaticDataApi.md#dataHotelGet) | **GET** /data/hotel | Hotel details
*LiteApi.StaticDataApi* | [**dataHotelsGet**](docs/StaticDataApi.md#dataHotelsGet) | **GET** /data/hotels | Hotel list
*LiteApi.StaticDataApi* | [**dataIataCodesGet**](docs/StaticDataApi.md#dataIataCodesGet) | **GET** /data/iataCodes | IATA code list


## Documentation for Models

 - [LiteApi.RatesBookPostRequest](docs/RatesBookPostRequest.md)
 - [LiteApi.RatesBookPostRequestGuestInfo](docs/RatesBookPostRequestGuestInfo.md)
 - [LiteApi.RatesBookPostRequestPayment](docs/RatesBookPostRequestPayment.md)


## Documentation for Authorization


Authentication schemes defined for the API:
### apikeyAuth


- **Type**: API key
- **API key parameter name**: X-API-Key
- **Location**: HTTP header


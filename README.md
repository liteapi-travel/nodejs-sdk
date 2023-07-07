# liteAPI SDK

## Table of Contents
- [liteAPI SDK](#liteapi-sdk)
  - [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
  - [Installing](#installing)
  - [Usage](#usage)
  - [Static data](#static-data)
    - [List of cities](#list-of-cities)
    - [List of Countries](#list-of-countries)
    - [List of available currencies](#list-of-available-currencies)
    - [List of hotels](#list-of-hotels)
    - [Hotel details](#hotel-details)
    - [IATA code list](#iata-code-list)
  - [Booking flow](#booking-flow)
    - [Search](#search)
      - [Hotel Minimum Rates availability](#hotel-minimum-rates-availability)
      - [Hotel full rates availability](#hotel-full-rates-availability)
    - [book](#book)
      - [Hotel rate prebook](#hotel-rate-prebook)
      - [Hotel rate book](#hotel-rate-book)

# Introduction
[liteAPI](https://www.liteapi.travel/) The fastest way to build travel apps
Launch your hospitality product in minutes. Effortlessly monetize by selling accommodations at over 2 million properties worldwide.


The liteAPI can be used to to do the following:
- Get room rates & availability for a set of hotels. 
- Select a specific hotel with room availability and make a booking 
- Manage the bookings 
- retrieve and cancel existing bookings.
- Get static content for hotels.
- Search hotels by destination.

Don't have an account yet?  Sign Up [Here](https://dashboard.liteapi.travel/register/).


## Installing

Install the package with:

```sh
npm install liteapi-travel
# or
yarn add liteapi-travel
```

## Usage
The package needs to be configured with your account's apikey, which is
available in the [liteAPI Dashboard](https://dashboard.liteapi.travel/apikeys/). Require it with the key's
value:

```js
const liteApi = require('liteapi-travel');

const defaultClient = liteApi.ApiClient.instance;

const apikeyAuth = defaultClient.authentications['apikeyAuth'];
apikeyAuth.apiKey = "YOUR API KEY"
```

## Static data

### List of cities

The API returns a list of city names from a specific country. The country codes needs be is in ISO-2 format. To get the country codes in ISO-2 for all countries please use the GET Country list endpoint

*  Example :
```js
 fetchCitiesByCountryCode = (countryCode: string) => {
    const apiInstance = new liteApi.StaticDataApi();
    return new Promise((resolve, reject) => {
      apiInstance.dataCitiesGet(countryCode, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data.data);
        }
      });
    });
  };


  public async getDataCities() {
    try {
      let countryCode = "US";
      const data = await this.fetchCitiesByCountryCode(countryCode);
      return {data };
    } catch (error) {
      console.error(error);
      return { error };
    }
  }
```
*  Parameters :


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **countryCode** | **string**| Country code in iso-2 format (example: US) | [required]

*  Return type :

An array of city objects containing the following properties:

Field | Type | Description
------|------|------------
**city** | **string** | The name of the city.

### List of Countries

The API returns the list of countries available along with its ISO-2 code.

*  Example :
```js
  fetchCountries = () => {
    const apiInstance = new liteApi.StaticDataApi();
    return new Promise((resolve, reject) => {
      apiInstance.dataCountriesGet((error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data.data);
        }
      });
    });
  };


  public async getDataCountries() {
    try {
      const data = await this.fetchCountries();
      return {data };
    } catch (error) {
      console.error(error);
      return { error };
    }
  }
```
*  Parameters :

This endpoint does not need any parameter.

*  Return type :

An array of country objects containing the following properties:

Field | Type | Description
------|------|------------
**code** | **string** | The country code in iso-2 format.
**name** | **string** | The name of the country.

### List of available currencies

The API returns all available currency codes along with its name and the list of supported countries that the currency applies to.


*  Example :
```js
  fetchCurrencies = () => {
    const apiInstance = new liteApi.StaticDataApi();
    return new Promise((resolve, reject) => {
      apiInstance.dataCurrenciesGet((error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data.data);
        }
      });
    });
  };


  public async getDataCurrencies() {
    try {
      const data = await this.fetchCurrencies();
      return {data };
    } catch (error) {
      console.error(error);
      return { error };
    }
  }
```
*  Parameters :

This endpoint does not need any parameter.

*  Return type :

An array of currency objects containing the following properties:

| Name     | Type  | Description                                                 |
| -------- | ----- | ----------------------------------------------------------- |
| **code**      | **string**   | The currency code.                                           |
| **currency**  | **string**  | The name of the currency.                                    |
| **countries** | **Array**    | An array of countries where the currency is used.             |


### List of hotels

The API returns a list of hotels available based on different search criterion. The minimum required information is the county code in ISO-2 format.

*  Example :
```js
  fetchHotels = (countryCode: string,cityName: string,opts:any) => {
    const apiInstance = new liteApi.StaticDataApi();
    return new Promise((resolve, reject) => {
      apiInstance.dataHotelsGet(countryCode, cityName, opts, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data.data);
        }
      });
    });
  };


  public async getDataHotels() {
    let countryCode = "SG"; 
    let cityName = "Singapore"; 
    let opts = {
        'offset': 0,
        'limit': 1000, 
        'longitude': -115.16988, 
        'latitude': 36.12510, 
        'distance': 1000
    };
    try {
      const data = await this.fetchHotels(countryCode,cityName,opts);
      return {data };
    } catch (error) {
      console.error(error);
      return { error };
    }
  }
```
*  Parameters :

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **countryCode** | **string**| country code ISO-2 code - example (US) | [required]
 **cityName** | **string**| name of the city | [required]
 **offset** | **number**| specifies the number of rows to skip before starting to return rows | [optional] 
 **limit** | **number**| limit number of results (max 1000) | [optional] 
 **longitude** | **number** | longitude geo coordinates | [optional] 
 **latitude** | **number** | latitude geo coordinates | [optional] 
 **distance** | **number** | distance in meters (min 1000m) | [optional] 


*  Return type :

An array of hotel objects containing the following properties:  

| Name            | Type   | Description                                                                                               |
| --------------- | ------ | --------------------------------------------------------------------------------------------------------- |
| **id**              | **string** | The unique identifier of the hotel.                                                                        |
| **name**            | **string** | The name of the hotel.                                                                                     |
| **hotelDescription**| **string** | The description of the hotel.                                                                              |
| **currency**        | **string** | The currency used in the hotel.                                                                            |
| **country**         | **string** | The country code of the hotel.                                                                             |
| **city**            | **string** | The city where the hotel is located.                                                                       |
| **latitude**        | **number** | The latitude coordinates of the hotel's location.                                                         |
| **longitude**       | **number** | The longitude coordinates of the hotel's location.                                                        |
| **address**         | **string** | The address of the hotel.                                                                                  |
| **zip**             | **string** | The postal code of the hotel.                                                                              |
| **main_photo**      | **string** | The URL of the main photo of the hotel.                                                                    |
| **stars**           | **number** | The star rating of the hotel.                                                                              |



### Hotel details

The hotel details API returns all the static contents details of a hotel or property if the hotel ID is provided. The static content include name, description, address, amenities, cancellation policies, images and more.


*  Example :
```js
  fetchHotelDetails = (hotelId: string) => {
    const apiInstance = new liteApi.StaticDataApi();
    return new Promise((resolve, reject) => {
    apiInstance.dataHotelGet(hotelId, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data.data);
        }
      });
    });
  };


  public async getDataHotelDetails() {
    let hotelId = "lp19c06";
    try {
      const data = await this.fetchHotelDetails(hotelId);
      return {data };
    } catch (error) {
      console.error(error);
      return { error };
    }
  }
```
*  Parameters :
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **hotelId** | **string**| Unique ID of a hotel | [required]

*  Return type :

| Name            | Type   | Description                                                                                               |
| --------------- | ------ | --------------------------------------------------------------------------------------------------------- |
| **id**                    | **string**               | The unique identifier of the hotel.                                                                                     |
| **name**                  | **string**               | The name of the hotel.                                                                                                  |
| **hotelDescription**      | **string**               | The description of the hotel.                                                                                           |
| **checkinCheckoutTimes**  | **Object**               | An object containing the check-in and check-out times of the hotel.                                                     |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **checkout**      | **string**               | The check-out time of the hotel.                                                                                        |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **checkin**       | **string**               | The check-in time of the hotel.                                                                                         |
| **hotelImages**           | **Array**                | An array of hotel image objects containing the following properties:                                                     |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **url**           | **string**               | The URL of the hotel image.                                                                                             |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **thumbnailUrl**  | **string**               | The thumbnail URL of the hotel image.                                                                                   |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **caption**       | **string**               | The caption of the hotel image.                                                                                         |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **order**         | **string**                 | The order of the hotel image (null if not applicable).                                                                   |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **defaultImage**  | **boolean**              | Indicates whether the hotel image is the default image or not.                                                          |
| **currency**              | **string**               | The currency used in the hotel.                                                                                         |
| **country**               | **string**              | The country code of the hotel.                                                                                          |
| **city**                  | **string**               | The city where the hotel is located.                                                                                    |
| **starRating**            | **number**               | The star rating of the hotel.                                                                                           |
| **location**              | **Object**               | An object containing the latitude and longitude coordinates of the hotel's location.                                   |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **latitude**      | **number**               | The latitude coordinate of the hotel's location.                                                                        |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **longitude**     | **number**               | The longitude coordinate of the hotel's location.                                                                       |
| **address**               | **string**               | The address of the hotel.                                                                                               |
| **zip**                   | **string**               | The postal code of the hotel.                                                                                           |
| **chainId**               | **string**               | The unique identifier of the hotel chain.                                                                                |
| **hotelFacilities**       | **Array**                | An array of hotel facilities offered by the hotel.                                                                      |



### IATA code list

The API returns the IATA (International Air Transport Association) codes for all available airports along with the name of the airport, geographical coordinates and country code in ISO-2 format.


*  Example :
```js
 fetchIataCode  = () => {
    const apiInstance = new liteApi.StaticDataApi();
    return new Promise((resolve, reject) => {
    apiInstance.dataIataCodesGet((error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data.data);
        }
      });
    });
  };


  public async getDataIataCode() {
    try {
      const data = await this.fetchIataCode();
      return {data };
    } catch (error) {
      console.error(error);
      return { error };
    }
  }
```
*  Parameters :

This endpoint does not need any parameter.

*  Return type :

An array of IATA objects with the following properties:

| Name        | Type   | Description                                      |
| ----------- | ------ | ------------------------------------------------ |
| **code**        | **string** | The IATA code.                                |
| **name**        | **string** | The name of the IATA.                         |
| **latitude**    | **number** | The latitude coordinates of the IATA.          |
| **longitude**   | **number** | The longitude coordinates of the IATA.         |
| **countryCode** | **string** | The country code of the IATA.                  |


## Booking flow

liteAPI is a comprehensive and simple to implement Hotel Booking API. The booking flow consists of 3 section: Search, Book, and 
booking management.

### Search
#### Hotel Minimum Rates availability
Hotel Minimum Rates API is to search and return the minimum room rates that are available for a list of hotel ID's on the specified search dates.

For each hotel ID, the minimum room rate that is available is returned.

The API also has a built in loyalty rewards system. The system rewards return users who have made prior bookings.

If the search is coming from a known guest ID, the guest level is also returned along with the pricing that's appropriate for the guest level.

If it is a new user, the guest ID will be generated at the time of the first confirmed booking.

*  Example :
```js
 fetchHotelMinimumRates = (hotelIds: string,checkin: string,checkout: string,currency: string,guestNationality: string,adults: number, opts: any) => {
    const apiInstance = new liteApi.SearchApi();
    return new Promise((resolve, reject) => {
    apiInstance.hotelsGet(hotelIds, checkin, checkout, currency, guestNationality, adults, opts, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data.data);
        }
      });
    });
  };


  public async getHotelMinimumRates() {
    let hotelIds = "lp3803c,lp1f982,lp19b70,lp19e75"; 
    let checkin = "2023-11-15"; 
    let checkout = "2023-11-16"; 
    let currency = "USD"; 
    let guestNationality = "US"; 
    let adults = 1; 
    let opts = {
        'children': "12,9",
        'guestId': "testtraveler1"
    };
    try {
      const data = await this.fetchHotelMinimumRates(hotelIds,checkin,checkout,currency,guestNationality,adults,opts);
      return {data };
    } catch (error) {
      console.error(error);
      return { error };
    }
  }
```
*  Parameters :

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **hotelIds** | **string**| List of hotelIds | [required]
 **checkin** | **string**| Check in data in YYYY-MM-DD format | [required]
 **checkout** | **string**| Check out data in YYYY-MM-DD format | [required]
 **currency** | **string**| Currency code - example (USD) | [required]
 **guestNationality** | **string**| Guest nationality ISO-2 code - example (SG) | [required]
 **adults** | **number**| Number of adult guests staying | [required]
 **children** | **string**| Number of children staying if any | [optional] 
 **guestId** | **string**| Unique traveler ID if available | [optional] 

*  Return type :

An array of hotel minimum rates objects with the following properties:

| Name         | Type   | Description                                      |
| ------------ | ------ | ------------------------------------------------ |
| **hotelId**    | **string** | The ID of the hotel.                             |
| **currency**   | **string** | The currency code for the price.                  |
| **price**      | **number** | The price of the hotel.                           |
| **supplierId** | **number** | The ID of the supplier.                           |
| **supplier**   | **string** | The name of the supplier.                         |


#### Hotel full rates availability
The Full Rates API is to search and return all available rooms along with its rates, cancellation policies for a list of hotel ID's based on the search dates.

For each hotel ID, all available room information is returned.

The API also has a built in loyalty rewards system. The system rewards return users who have made prior bookings.

If the search is coming from a known guest ID, the guest level is also returned along with the pricing that's appropriate for the guest level.

If it is a new user, the guest ID will be generated at the time of the first confirmed booking.


*  Example :
```js
 fetchHotelFullRates = (hotelIds: string,checkin: string,checkout: string,currency: string,guestNationality: string,adults: number, opts: any) => {
    const apiInstance = new liteApi.SearchApi();
    return new Promise((resolve, reject) => {
    apiInstance.hotelsRatesGet(hotelIds, checkin, checkout, currency, guestNationality, adults, opts, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data.data);
        }
      });
    });
  };


  public async getHotelFullRates() {
    let hotelIds = "lp3803c,lp1f982,lp19b70,lp19e75"; 
    let checkin = "2023-11-15"; 
    let checkout = "2023-11-16"; 
    let currency = "USD"; 
    let guestNationality = "US"; 
    let adults = 1; 
    let opts = {
        'children': "12,9",
        'guestId': "testtraveler1"
    };
    try {
      const data = await this.fetchHotelFullRates(hotelIds,checkin,checkout,currency,guestNationality,adults,opts);
      return {data };
    } catch (error) {
      console.error(error);
      return { error };
    }
  }
```
*  Parameters :

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **hotelIds** | **string**| List of hotelIds | [required]
 **checkin** | **string**| Check in data in YYYY-MM-DD format | [required]
 **checkout** | **string**| Check out data in YYYY-MM-DD format | [required]
 **currency** | **string**| Currency code - example (USD) | [required]
 **guestNationality** | **string**| Guest nationality ISO-2 code - example (SG) | [required]
 **adults** | **number**| Number of adult guests staying | [required]
 **children** | **string**| Number of children staying if any | [optional] 
 **guestId** | **string**| Unique traveler ID if available | [optional] 

*  Return type :

An array of hotel full rates with the following properties:

| Name         | Type   | Description                                      |
| ------------ | ------ | ------------------------------------------------ |
| **roomTypeId** | string | The ID of the room type.                                                                                |
| **supplier**   | string | The name of the supplier.                                                                               |
| **supplierId** | number | The ID of the supplier.                                                                                 |
| **rates**      | Array  | An array of rate objects containing the pricing and details for each rate within the room type.        |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **rateId**        | string | The ID of the rate.                                                                                   |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **name**          | string | The name of the rate.                                                                                 |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **maxOccupancy** | number | The maximum occupancy of the room.                                                                     |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **boardType**     | string | The type of board included (e.g., Bed Only).                                                           |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **boardName**     | string | The name of the board (e.g., Bed Only).                                                                 |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **priceType**     | string | The type of pricing (e.g., commission).                                                                 |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **commission**    | Array  | An array of commission objects containing the commission amount and currency.                         |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **retailRate**    | Object | An object containing the retail rate information, including total price, MSP (Marked Selling Price), and taxes and fees. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **total**         | Array  | An array of total price objects containing the amount and currency.                                    |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **msp**           | Array  | An array of MSP (Marked Selling Price) objects containing the amount and currency.                     |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **taxesAndFees**  | Array  | An array of taxes and fees objects containing information about included or additional charges.         |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **cancellationPolicies** | Object | An object containing cancellation policy information.                                                   |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **cancelPolicyInfos** | Array  | An array of cancellation policy info objects containing information about cancellation time, amount, currency, and type. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **hotelRemarks**      | Array  | An array of hotel remarks.                                                                              |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **refundableTag**      | string | The tag indicating if the rate is refundable or non-refundable.                                          |


### book
#### Hotel rate prebook

This API is used to confirm if the room and rates for the search criterion. The input to the endpoint is a specific rate Id coming from the GET hotel full rates availability API.

In response, the API generates a prebook Id, a new rate Id and contains information if price, cancellation policy or boarding information has changed.



*  Example :
```js
 fetchHotelRatePrebook = (opts: any) => {
    const apiInstance = new liteApi.BookApi();
    return new Promise((resolve, reject) => {
    apiInstance.ratesPrebookPost(opts, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data.data);
        }
      });
    });
  };


  public async getHotelRatePrebook() {
    let opts = {
        'body': {"rateId":"2_3P6L4TRYIFKLFM3DRKUQ4SBFCSO3QJBU27UQ76RU6HTAVUULOUZN3HLFLDS6HRUUQXXZNPELVXHLEXZF3J26PGYXGZEMZOPATZGAUBZLMB7BR6OL7QW4FIAIWTOCOLVHBIRGQFE7UJLTQP5RB6AXVPADIRT34YR56BBBSLSAWK2BMTRYBFRZCYG6HQKMULTSO6JIWWTEGVSBOHNFO7KTFXFMGCULXME2B4PZDCFWK62PT3EL4XUVOEB37V2EA7CWJKOZZU4OYDFB36YWUCID6LWVCCRMVU4PYZH2WBTJ6SLVVEGVZHTVGCVXA5GXEOCUE4ARMWXCIGRPASA5WBFI2T557GWUUZ6YMBZZMPUPCWI7DVO2OG6KY36WWASVBLEJRYFHJRRGQKDV5HY6INAD3YARYKVNFMITJ6BX5LVBVXNF33OZF34ZQDE5S74ND73FMHCYSSTZFOBCOBKYDHQ5BWGRYS7GALROITVAFG2OIFSXLUSKRT3MEURPJL7S3MHWEJMAYJFGGPMRZBEQZXAXDJI"}
    };
    try {
      const data = await this.fetchHotelRatePrebook(opts);
      return {data };
    } catch (error) {
      console.error(error);
      return { error };
    }
  }
```
*  Parameters :

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **Object**|  | [required] 
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **rateId** | **string**| rate id retrieved from rates response| [required]

*  Return type :

An object containing prebook information and room type details.                      

| Name                      | Type   | Description                                                                                            |
| ------------------------- | ------ | ------------------------------------------------------------------------------------------------------ |
| **prebookId**        | **string** | The ID of the prebook.                                                                                |
| **hotelId**          | **string** | The ID of the hotel.                                                                                  |
| **currency**         | **string** | The currency used for pricing.                                                                         |
| **termsAndConditions** | **string** | The terms and conditions (if available).                                                               |
| **roomTypes**        | **Array**  | An array of room type objects containing the following properties:                                    |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **rates**      | **Array**  | An array of rate objects containing pricing and details for each rate within the room type.          |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **rateId**        | **string** | The ID of the rate.                                                                                    |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **name**          | **string** | The name of the rate.                                                                                  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **maxOccupancy** | **number** | The maximum occupancy of the room.                                                                      |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **boardType**     | **string** | The type of board included (e.g., Bed Only).                                                            |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **boardName**     | **string** | The name of the board (e.g., Bed Only).                                                                  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **priceType**     | **string** | The type of pricing (e.g., commission).                                                                  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **commission**    | [**[]Amont**](#amount)   | An array of commission objects containing the commission amount and currency.                          |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **retailRate**    | **Object** | An object containing the retail rate information, including total price, MSP (Marked Selling Price), and taxes and fees. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **total**         | [**[]Amont**](#amount)    | An array of total price objects containing the amount and currency.                                     |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **msp**           | [**[]Amont**](#amount)    | An array of MSP (Marked Selling Price) objects containing the amount and currency.                      |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **taxesAndFees**  | [**[]TaxesAndFees**](#taxesAndFees)    | An array of taxes and fees objects containing information about included or additional charges.          |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **cancellationPolicies** | **Object** | An object containing cancellation policy information.                                                    |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **cancelPolicyInfos** | [**[]cancelPolicyInfos**](#amount) | An array of cancellation policy info objects containing information about cancellation time, amount, and type. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **hotelRemarks**      | **Array**  | An array of hotel remarks.                                                                             |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **refundableTag**      | **string** | The tag indicating if the rate is refundable or non-refundable.                                         |
| **msp**                   | **number** | The Marked Selling Price (MSP) for the prebook.                                                         |
| **commission**            | **number** | The commission amount for the prebook.                                                                  |
| **price**                 | **number** | The price of the prebook.                                                                              |
| **priceType**             | **string** | The type of pricing (e.g., commission).                                                                 |
| **priceDifferencePercent**| **number** | The percentage difference between the retail rate and the Marked Selling Price (MSP).                   |
| **cancellationChanged**   | **boolean** | Indicates if there were changes to the cancellation policy.                                             |
| **boardChanged**          | **boolean** | Indicates if there were changes to the board type.                                                      |
| **supplier**              | **string** | The name of the supplier.                                                                              |
| **supplierId**            | **number** | The ID of the supplier.                                                                                |

___
___
___

Amount

| Name     | Type   | Description                  |
| -------- | ------ | ---------------------------- |
| **amount**   | **number** | The commission amount.       |
| **currency** | **string** | The currency of the commission. |

___
___
___
taxesAndFees

| Name         | Type    | Description            |
| ------------ | ------- | ---------------------- |
| **included** | **boolean** | Indicates if taxes are included. |
| **description**  | **string**  | The description of the taxes.  |
| **amount**   | **number**  | The amount of taxes.   |
| **currency** | **string**  | The currency of the taxes. |

___
___
___
cancelPolicyInfos

| Name         | Type    | Description            |
| ------------ | ------- | ---------------------- |
| **cancelTime** | **string** | The time of cancellation. |
| **amount**  | **number**  | The amount of cancellation.  |
| **type**    | **string** | The type of cancellation.  |


#### Hotel rate book

This API confirms a booking when the prebook Id and the rate Id from the pre book stage along with the guest and payment information are passed.

The guest information is an object that should include the guest first name, last name and email.

The payment information is an object that should include the name, credit card number, expiry and CVC number.

The response will confirm the booking along with a booking Id and a hotel confirmation code. It will also include the booking details including the dates, price and the cancellation policies.


*  Example :
```js
 fetchHotelRateBook = (opts: any) => {
    const apiInstance = new liteApi.BookApi();
    return new Promise((resolve, reject) => {
    apiInstance.ratesBookPost(opts, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data.data);
        }
      });
    });
  };


  public async getHotelRateBook() {
    let opts = {
    'ratesBookPostRequest': {
        "prebookId":"UwfMkUWH6",
        "guestInfo":{"guestFirstName":"Kim","guestLastName":"James","guestEmail":"test@nlite.ml"},
        "payment":{"holderName":"Kim James","number":"4242424242424242","expireDate":"11/29","cvc":"456","method":"CREDIT_CARD"}}
    };

    try {
      const data = await this.fetchHotelRateBook(opts);
      return {data };
    } catch (error) {
      console.error(error);
      return { error };
    }
  }
```
*  Parameters :

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **Object**|  | [required] 
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **rateId** | **string**| rate id retrieved from rates response| [required]

*  Return type :


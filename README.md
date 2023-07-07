# Lite API SDK

## Table of Contents
- [Lite API SDK](#lite-api-sdk)
  - [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
  - [Installing](#installing)
  - [Usage](#usage)
  - [Static data](#static-data)
    - [List of cities](#list-of-cities)
      - [Example :](#example-)
      - [Parameters :](#parameters-)
      - [Return type :](#return-type-)
    - [List of Countries](#list-of-countries)
      - [Example :](#example--1)
      - [Parameters :](#parameters--1)
      - [Return type :](#return-type--1)
    - [List of available currencies](#list-of-available-currencies)
      - [Example :](#example--2)
      - [Parameters :](#parameters--2)
      - [Return type :](#return-type--2)
    - [List of hotels](#list-of-hotels)
      - [Example :](#example--3)
      - [Parameters :](#parameters--3)
      - [Return type :](#return-type--3)
    - [Hotel details](#hotel-details)
      - [Example :](#example--4)
      - [Parameters :](#parameters--4)
      - [Return type :](#return-type--4)
    - [IATA code list](#iata-code-list)
      - [Example :](#example--5)
      - [Parameters :](#parameters--5)
      - [Return type :](#return-type--5)
  - [Booking flow](#booking-flow)
    - [Search](#search)
      - [Hotel Minimum Rates](#hotel-minimum-rates)
      - [hotel full rates availability](#hotel-full-rates-availability)
    - [Pre-book](#pre-book)
    - [Confirm booking](#confirm-booking)
    - [Cancel booking](#cancel-booking)
    - [Get booking details by id](#get-booking-details-by-id)

# Introduction
[liteAPI](https://www.liteapi.travel/) The fastest way to build travel apps
Launch your hospitality product in minutes. Effortlessly monetize by selling accommodations at over 2 million properties worldwide.


The Lite API can be used to to do the following:
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

#### Example :
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
#### Parameters :


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **countryCode** | **string**| Country code in iso-2 format (example: US) | [required]

#### Return type :

An array of city objects containing the following properties:

Field | Type | Description
------|------|------------
**city** | **string** | The name of the city.

### List of Countries

The API returns the list of countries available along with its ISO-2 code.

#### Example :
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
#### Parameters :

This endpoint does not need any parameter.

#### Return type :

An array of country objects containing the following properties:

Field | Type | Description
------|------|------------
**code** | **string** | The country code in iso-2 format.
**name** | **string** | The name of the country.

### List of available currencies

The API returns all available currency codes along with its name and the list of supported countries that the currency applies to.


#### Example :
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
#### Parameters :

This endpoint does not need any parameter.

#### Return type :

An array of currency objects containing the following properties:

| Name     | Type  | Description                                                 |
| -------- | ----- | ----------------------------------------------------------- |
| **code**      | **string**   | The currency code.                                           |
| **currency**  | **string**  | The name of the currency.                                    |
| **countries** | **Array**    | An array of countries where the currency is used.             |


### List of hotels

The API returns a list of hotels available based on different search criterion. The minimum required information is the county code in ISO-2 format.

#### Example :
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
#### Parameters :

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **countryCode** | **string**| country code ISO-2 code - example (US) | [required]
 **cityName** | **string**| name of the city | [required]
 **offset** | **number**| specifies the number of rows to skip before starting to return rows | [optional] 
 **limit** | **number**| limit number of results (max 1000) | [optional] 
 **longitude** | **number** | longitude geo coordinates | [optional] 
 **latitude** | **number** | latitude geo coordinates | [optional] 
 **distance** | **number** | distance in meters (min 1000m) | [optional] 


#### Return type :

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


#### Example :
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
#### Parameters :
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **hotelId** | **string**| Unique ID of a hotel | [required]

#### Return type :

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


#### Example :
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
#### Parameters :

This endpoint does not need any parameter.

#### Return type :

An array of IATA objects with the following properties:

| Name        | Type   | Description                                      |
| ----------- | ------ | ------------------------------------------------ |
| **code**        | **string** | The IATA code.                                |
| **name**        | **string** | The name of the IATA.                         |
| **latitude**    | **number** | The latitude coordinates of the IATA.          |
| **longitude**   | **number** | The longitude coordinates of the IATA.         |
| **countryCode** | **string** | The country code of the IATA.                  |


## Booking flow

Lite API is a comprehensive and simple to implement Hotel Booking API. The booking flow consists of 3 steps: Search, preBook, and Confirm. The API also allows booking cancellations as well as static data retrieval.

### Search
#### Hotel Minimum Rates
is to search and return the minimum room rates that are available for a list of hotel ID's on the specified search dates.

For each hotel ID, the minimum room rate that is available is returned.

The API also has a built in loyalty rewards system. The system rewards return users who have made prior bookings.

If the search is coming from a known guest ID, the guest level is also returned along with the pricing that's appropriate for the guest level.

If it is a new user, the guest ID will be generated at the time of the first confirmed booking.

```js
const checkin = "2023-07-15";
const checkout = "2023-07-16";
const currency = "USD";
const guestNationality = "US";
const hotelIdsList = ["lp3803c", "lp1f982", "lp19b70", "lp19e75"];
const adults = 2;
//Optional values
const childrenAges = [2,3];
const result = await sdk.getMinimumRates(checkin, checkout, currency, guestNationality, hotelIdsList, adults,childrenAges);
```

#### hotel full rates availability
The Full Rates API is to search and return all available rooms along with its rates, cancellation policies for a list of hotel ID's based on the search dates.

For each hotel ID, all available room information is returned.

The API also has a built in loyalty rewards system. The system rewards return users who have made prior bookings.

If the search is coming from a known guest ID, the guest level is also returned along with the pricing that's appropriate for the guest level.

If it is a new user, the guest ID will be generated at the time of the first confirmed booking.

```js
const checkin = "2023-07-15";
const checkout = "2023-07-16";
const currency = "USD";
const guestNationality = "US";
const hotelIdsList = ["lp3803c", "lp1f982", "lp19b70", "lp19e75"];
const adults = 2;
//Optional values
const childrenAges = [2,3];
const result = await sdk.getFullRates(checkin, checkout, currency, guestNationality, hotelIdsList, adults,childrenAges);
```
### Pre-book
This API is used to confirm if the room and rates for the search criterion. The input to the endpoint is a specific rate Id coming from the GET hotel full rates availability API.

In response, the API generates a prebook Id, a new rate Id and contains information if price, cancellation policy or boarding information has changed.
```js
const rateId = "NRYDCZRZHAZHYMRQGIZS2MJRFUYTK7BS";
const result = await sdk.preBook(rateId)
```

### Confirm booking
This API confirms a booking when the prebook Id and the rate Id from the pre book stage along with the guest and payment information are passed.

The guest information is an object that should include the guest first name, last name and email.

The payment information is an object that should include the name, credit card number, expiry and CVC number.

The response will confirm the booking along with a booking Id and a hotel confirmation code. It will also include the booking details including the dates, price and the cancellation policies.


```js
const prebookID = "-4e0EKQMb";
const guestInfo = { guestFirstName: 'Kim', guestLastName: 'James', guestEmail: 'test@nlite.ml' };
const paymentMethod = "CREDIT_CARD";
const holderName = "Kim James";
const paymentInfo = { "card_number": "4242424242424242", "exp_month": 11, exp_year: "23", "cvc": 123 }
const result = await sdk.book(prebookID, guestInfo, paymentMethod, holderName, paymentInfo)
```

### Cancel booking
This API is used to request a cancellation of an existing confirmed booking. Cancellation policies and conditions will be used to determine the success of the cancellation. For example a booking with non-refundable (NRFN) tag or a booking with a cancellation policy that was requested past the cancellation date will not be able to cancel the confirmed booking.

```js
const bookingId = "FrT56hfty";
const result = await sdk.cancelBooking(bookingId);
```

### Get booking details by id
The API returns the status and the details for the a specific booking Id.
```js
const bookingId = "FrT56hfty";
const result = await sdk.retrievedBooking(bookingId);
```
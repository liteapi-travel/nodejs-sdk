<h1 style="font-weight: 500;">liteAPI SDK</h1>

# Table of Contents
- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
- [Installing](#installing)
- [Usage](#usage)
- [Static data](#static-data)
  - [Suggest a list of places](#suggest-a-list-of-places)
  - [List of cities](#list-of-cities)
  - [List of Countries](#list-of-countries)
  - [List of available currencies](#list-of-available-currencies)
  - [List of hotels](#list-of-hotels)
  - [Hotel details](#hotel-details)
  - [Hotel reviews](#hotel-reviews)
  - [IATA code list](#iata-code-list)
  - [Hotel facilities](#Hotel-facilities)
  - [Hotel types](#Hotel-types)
  - [Hotel chains](#Hotel-chains)
- [Booking flow](#booking-flow)
  - [Search](#search)
    - [Hotel full rates availability](#hotel-full-rates-availability)
  - [Book](#book)
    - [Hotel rate prebook](#hotel-rate-prebook)
    - [Hotel rate book](#hotel-rate-book)
  - [Booking management](#booking-management)
    - [Booking list](#booking-list)
    - [Booking retrieve](#booking-retrieve)
    - [Booking cancel](#booking-cancel)
- [Vouchers](#vouchers)
  - [Retrieve vouchers](#Retrieve-vouchers)
  - [Voucher Details](#voucher-details)
  - [Create Voucher](#Create-voucher)
  - [Update Voucher](#Update-voucher)
  - [Update Voucher status](#Update-voucher-status)
- [Loyalty](#Loyalty)
  - [Loyalty Program](#loyalty-program)
  - [Enable loyalty program](#Enable-loyalty-program)  
  - [Update loyalty program](#Enable-loyalty-program)
  - [Fetch specific guest](#Fetch-specific-guest)
  - [Fetch guest's bookings](#Fetch-guest's-bookings)
- [Analytics](#Analytics)
  - [Retrieve weekly analytics](#Retrieve-weekly-analytics)
  - [Retrieve detailed analytics report](#Retrieve-detailed-analytics-report)
  - [Retrieve market analytics](#Retrieve-market-analytics)
  - [Most booked hotels](#Most-booked-hotels)
- [Example Project](#example-project)

# Introduction
[liteAPI](https://www.liteapi.travel/) is an innovative and robust collection of infrastructure APIs that cater to the travel industry. It is designed to empower developers, offering them the fastest way to build and launch comprehensive travel applications.

At the heart of LiteAPI's power is its extensive network of over 2 million properties worldwide. By incorporating LiteAPI into an app, developers can effortlessly tap into the vast inventory, allowing users to search and book accommodations at these properties.

But that's not all. With LiteAPI, monetization is made even more simple. Developers can generate revenue through their hospitality products by selling accommodations from LiteAPI's broad portfolio of properties. This means that not only can developers launch their products quickly, they can also start generating profits in no time.

LiteAPI opens up a range of powerful functions for travel and hospitality applications. Its features include:

<h3 style="font-weight: 500; display:inline">Hotel Search:</h3> Developers can incorporate a robust search function that allows users to find hotels based on their preferred destination. This can help users discover accommodations that suit their travel plans.
<br><br>
<h3 style="font-weight: 500; display:inline">Static Content for Hotels:</h3> LiteAPI also provides access to static content for hotels, including descriptions, images, and amenity details. This is essential for developers to present comprehensive and accurate information to the end users, aiding their decision-making process.
<br><br>
<h3 style="font-weight: 500; display:inline">Room Rates & Availability:</h3> One of the most significant features of LiteAPI is the ability to pull data on room rates and availability for a selected set of hotels. This feature ensures users have real-time, accurate information to assist in their booking decisions.
<br><br>
<h3 style="font-weight: 500; display:inline">Hotel Booking:</h3> Beyond just providing information, LiteAPI also allows developers to integrate a seamless booking function. Users can select a specific hotel with room availability and proceed to make a booking directly within the app.
<br><br>
<h3 style="font-weight: 500; display:inline">Booking Management:</h3> With LiteAPI, managing bookings becomes a straightforward task. The booking management functions allow for the tracking and management of all bookings made through the app, ensuring users can keep track of their travel plans.
<br><br>
<h3 style="font-weight: 500; display:inline">Booking Retrieval and Cancellation:</h3> LiteAPI offers the capability to retrieve and cancel existing bookings. This added flexibility is crucial for users who might need to alter their travel plans.
<br><br>
All these features make LiteAPI a comprehensive solution for travel app development, offering a plethora of functionalities, from search and booking to management and cancellation. Developers can harness these powerful tools to create high-quality, user-friendly travel applications.
<br><br>
<h3 style="font-weight: 500; display:inline">Vouchers:</h3> LiteAPI allows developers to manage and retrieve vouchers, adding an extra layer of value to users by offering discounts or special offers through the app.
<br><br>
<h3 style="font-weight: 500; display:inline">Loyalty Program:</h3> A comprehensive loyalty system within liteAPI, which includes guest tracking, loyalty points accrual, and retrieval of guest booking history and information via a unique guestId.
<br><br>
<h3 style="font-weight: 500; display:inline">API: Analytics:</h3>Lastly, LiteAPI allows you to fetch analytics data within a specified date range, including weekly detailed, and market reports. It also retrieves data on the most booked hotels during the specified period.
<br><br>


Don't have an account yet?  Sign Up [Here](https://dashboard.liteapi.travel/register/).

# Installing

Install the package using the following npm or yarn commands:

```sh
npm install liteapi-node-sdk
# or
yarn add liteapi-node-sdk
```

# Usage

After you have installed the LiteAPI package, you need to configure it with your API key. The API key is available in the [liteAPI Dashboard](https://dashboard.liteapi.travel/apikeys/). Here's the step to add the API key to the package.

```js
const liteApi = require('liteapi-node-sdk')(YOUR_API_KEY);
```

# Static data

Static data can be directly fetched from the functions below. Alternatively, LiteAPI also provides an option to download static data directly from the [Github URL](STATICDATA.md).

## Suggest a list of places
The `getPlaces` function look up for a list of places and areas, given a search query. Places can be used to search for hotels within a location and restrict the list to results within the boundaries of a selected place.

*  <h4 style="color:#9155fd; font-weight: 800;"> Example :</h4>
```js
const result = await liteApi.getPlaces('Manhattan');
```

*  <h4 style="color:#9155fd; font-weight: 800;"> Parameters :</h4>

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **textQuery** | **string**| Search query. e.g. 'Manhattan' | [required]
 **type** | **string**| Restricts the results to places matching the specified type. e.g. 'hotel' | [optional]
 **language** | **string**| The language code, indicating in which language the results should be returned. e.g. 'en' | [optional]

*  <h4 style="color:#9155fd; font-weight: 800;"> Return type :</h4>

An array of city objects containing the following properties:

Field | Type | Description
------|------|------------
**data** | **object** | An array of the suggested places.

<br>

## List of cities

The getCitiesByCountryCode function returns a list of city names from a specific country. The country codes must be in ISO-2 format. To get the country codes in ISO-2 for all countries please use the getCountries function.

*  <h4 style="color:#9155fd; font-weight: 800;"> Example :</h4>
```js
    const countryCode = "IT";
    const result = await liteApi.getCitiesByCountryCode(countryCode);
```
*  <h4 style="color:#9155fd; font-weight: 800;"> Parameters :</h4>


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **countryCode** | **string**| Country code in iso-2 format (example: US) | [required]

*  <h4 style="color:#9155fd; font-weight: 800;"> Return type :</h4>

An array of city objects containing the following properties:

Field | Type | Description
------|------|------------
**city** | **string** | The name of the city.

<br>

## List of Countries

The getCountries function returns the list of countries available along with its ISO-2 code.

*  <h4 style="color:#9155fd; font-weight: 800;"> Example :</h4>
```js
      const result = await liteApi.getCountries();
```
*  <h4 style="color:#9155fd; font-weight: 800;"> Parameters :</h4>

The function does not need any additional parameter.

*  <h4 style="color:#9155fd; font-weight: 800;"> Return type :</h4>

An array of country objects containing the following properties:

Field | Type | Description
------|------|------------
**code** | **string** | The country code in iso-2 format.
**name** | **string** | The name of the country.

<br>

## List of available currencies

The getCurrencies function returns all available currency codes along with its name and the list of supported countries that the currency applies to.

*  <h4 style="color:#9155fd; font-weight: 800;"> Example :</h4>
```js
    const result = await liteApi.getCurrencies();
```
*  <h4 style="color:#9155fd; font-weight: 800;"> Parameters :</h4>

This function does not need any additional parameters.

*  <h4 style="color:#9155fd; font-weight: 800;"> Return type :</h4>

An array of currency objects containing the following properties:

| Name     | Type  | Description                                                 |
| -------- | ----- | ----------------------------------------------------------- |
| **code**      | **string**   | The currency code.                                           |
| **currency**  | **string**  | The name of the currency.                                    |
| **countries** | **Array**    | An array of countries where the currency is used.             |

<br>

## List of hotels

The `getHotels` function returns a list of hotels available based on different search criterion.
The API supports additional search criteria such as city name, geo coordinates, and radius.
This function provides detailed hotel metadata, including names, addresses, ratings, amenities, and images, facilitating robust hotel search and display features within applications.

*  <h4 style="color:#9155fd; font-weight: 800;"> Example :</h4>
```js
const result = await liteApi.getHotels({
    countryCode: 'IT',
    cityName: 'Rome'
});
```

Please refer to the [documentation of this endpoint](https://docs.liteapi.travel/reference/get_data-hotels) for the full list of parameters and their descriptions.


*  <h4 style="color:#9155fd; font-weight: 800;"> Return type :</h4>

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

<br>

## Hotel details

The getHotelDetails function returns all the static contents details of a hotel or property when given a hotel ID. The static content includes name, description, address, amenities, cancellation policies, images and more.


*  <h4 style="color:#9155fd; font-weight: 800;"> Example :</h4>
```js
    const hotelID = "lp24373";
    const result = await liteApi.getHotelDetails(hotelID);
```
*  <h4 style="color:#9155fd; font-weight: 800;"> Parameters :</h4>
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **hotelId** | **string**| Unique ID of a hotel | [required]

*  <h4 style="color:#9155fd; font-weight: 800;"> Return type :</h4>

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

<br>

## Hotel reviews

The getHotelReviews function returns a list of reviews for a specific hotel identified by hotelId. The number of reviews returned is limited by the limit parameter.


*  <h4 style="color:#9155fd; font-weight: 800;"> Example :</h4>

```js
    const result = await liteApi.getHotelReviews("lp24373", 200);
```

*  <h4 style="color:#9155fd; font-weight: 800;"> Parameters :</h4>
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **hotelId** | **string**| Unique ID of a hotel | [required]
 **limit** | **number**| Number of reviews to retrieve | [required]

<br>

## IATA code list

The getIataCodes function returns the IATA (International Air Transport Association) codes for all available airports along with the name of the airport, geographical coordinates and country code in ISO-2 format.


*  <h4 style="color:#9155fd; font-weight: 800;"> Example :</h4>
```js
    const result = await liteApi.getIataCodes();
```
*  <h4 style="color:#9155fd; font-weight: 800;"> Parameters :</h4>

This function does not need any additional parameters.

*  <h4 style="color:#9155fd; font-weight: 800;"> Return type :</h4>

An array of IATA objects with the following properties:

| Name        | Type   | Description                                      |
| ----------- | ------ | ------------------------------------------------ |
| **code**        | **string** | The IATA code.                                |
| **name**        | **string** | The name of the IATA.                         |
| **latitude**    | **number** | The latitude coordinates of the IATA.          |
| **longitude**   | **number** | The longitude coordinates of the IATA.         |
| **countryCode** | **string** | The country code of the IATA.                  |

<br>

## Hotel facilities

The API returns the list of hotel facilities available in the system.


*  <h4 style="color:#9155fd; font-weight: 800;"> Example :</h4>
```js
    const result = await liteApi.getHotelFacilities();
```
*  <h4 style="color:#9155fd; font-weight: 800;"> Parameters :</h4>

This function does not need any additional parameters.

*  <h4 style="color:#9155fd; font-weight: 800;"> Return type :</h4>

An array of facilities with the following properties:

name       | Type       | Description
-----------|------------|------------
**status** | **string** | Status of the operation.
**data**   | **object** | Details of the hotel facilities.
<br>

## Hotel types

The API returns a list of available hotel types


*  <h4 style="color:#9155fd; font-weight: 800;"> Example :</h4>
```js
    const result = await liteApi.getHotelTypes();
```
*  <h4 style="color:#9155fd; font-weight: 800;"> Parameters :</h4>

This function does not need any additional parameters.

*  <h4 style="color:#9155fd; font-weight: 800;"> Return type :</h4>

An array of hotel types with the following properties:

name       | Type       | Description
-----------|------------|------------
**status** | **string** | Status of the operation.
**data**   | **object** | Details of the hotel types.

<br>

## Hotel chains

The API returns a list of available hotel chains

*  <h4 style="color:#9155fd; font-weight: 800;"> Example :</h4>
```js
    const result = await liteApi.getHotelChains();
```
*  <h4 style="color:#9155fd; font-weight: 800;"> Parameters :</h4>

This function does not need any additional parameters.

*  <h4 style="color:#9155fd; font-weight: 800;"> Return type :</h4>

An array of hotel chains with the following properties:

name       | Type       | Description
-----------|------------|------------
**status** | **string** | Status of the operation.
**data**   | **object** | Details of the hotel chains.

<br>
# Booking flow

liteAPI offers a comprehensive and simple way to implement Hotel Booking flow. The booking flow consists of 3 sections: Search, Book, and booking management.

<br>

## Search


### Hotel full rates availability
------
The getFullRates function return the rates of all available rooms along with its cancellation policies for a list of hotel ID's based on the search dates.

*  <h4 style="color:#9155fd; font-weight: 800;"> Example :</h4>
```js
    const result = await liteApi.getFullRates({
        checkin: "2023-07-15",
        checkout: "2023-07-16",
        currency: "USD",
        guestNationality: "US",
        hotelIds: ["lp3803c", "lp1f982", "lp19b70", "lp19e75"],
        occupancies: [
            {
                rooms: 1,
                adults: 2,
                children: [2, 3]
            }
        ]
    });
```

*  <h4 style="color:#9155fd; font-weight: 800;"> Parameters :</h4>

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **hotelIds** | **array of strings**| List of hotelIds | [required]
 **checkin** | **string**| Check in data in YYYY-MM-DD format | [required]
 **checkout** | **string**| Check out data in YYYY-MM-DD format | [required]
 **currency** | **string**| Currency code - example (USD) | [required]
 **guestNationality** | **string**| Guest nationality ISO-2 code - example (SG) | [required]
 **occupancies** | **array of objects**| Occupancies | [required]
 **guestId** | **string**| Unique traveler ID if available | [optional]

*  <h4 style="color:#9155fd; font-weight: 800;"> Return type :</h4>

An array of hotel full rates with the following properties for each `roomType`:

| Name         | Type   | Description                                      |
| ------------ | ------ | ------------------------------------------------ |
| **offerId** | **string** | The offer for this rate. To be used when calling the prebook endpoint                                                                             |
| **roomTypeId** | **string** | The ID of the room type.                                                                                |
| **supplier**   | **string** | The name of the supplier.                                                                               |
| **supplierId** | **number** | The ID of the supplier.                                                                                 |
| **rates**      | **Array**  | An array of rate objects containing the pricing and details for each rate within the room type.        |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **rateId**        | **string** | The ID of the rate.                                                                                   |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **name**          | **string** | The name of the rate.                                                                                 |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **maxOccupancy** | **number** | The maximum occupancy of the room.                                                                     |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **boardType**     | **string** | The type of board included (e.g., Bed Only).                                                           |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **boardName**     | **string** | The name of the board (e.g., Bed Only).                                                                 |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **priceType**     | **string** | The type of pricing (e.g., commission).                                                                 |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **commission**    | **Array**  | An array of commission objects containing the commission amount and currency.                         |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **retailRate**    | **Object** | An object containing the retail rate information, including total price, MSP (Marked Selling Price), and taxes and fees. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **total**         | **Array**  | An array of total price objects containing the amount and currency.                                    |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **msp**           | **Array**  | An array of MSP (Marked Selling Price) objects containing the amount and currency.                     |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **taxesAndFees**  | **Array**  | An array of taxes and fees objects containing information about included or additional charges.         |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **cancellationPolicies** | **Object** | An object containing cancellation policy information.                                                   |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **cancelPolicyInfos** | **Array**  | An array of cancellation policy info objects containing information about cancellation time, amount, currency, and type. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **hotelRemarks**      | **Array**  | An array of hotel remarks.                                                                              |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **refundableTag**      | **string** | The tag indicating if the rate is refundable or non-refundable.                                          |


<br>

## Book

### Hotel rate prebook
------

The preBook function is used to confirm if the room rates are still available before a booking function can be called. The input to the function is an object that maps to the available options in the API documentation for the prebook endpoint.
The function returns a prebook Id, a new rate Id and also contains information if the price, cancellation policy or boarding information changed.

*  <h4 style="color:#9155fd; font-weight: 800;"> Example :</h4>
```js
    const offerId = ["abcde123"];
    const result = await liteApi.preBook({ offerId, usePaymentSdk: true, voucherCode: "1234" });
```
*  <h4 style="color:#9155fd; font-weight: 800;"> Parameters :</h4>

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**data** | **object** | the input parameters for the API request | [required]

*  <h4 style="color:#9155fd; font-weight: 800;"> Return type :</h4>

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
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **commission**    | **Object**  | An array of commission objects containing the commission amount and currency.                          |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **retailRate**    | **Object** | An object containing the retail rate information, including total price, MSP (Marked Selling Price), and taxes and fees. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **total**         | **Object**   | An array of total price objects containing the amount and currency.                                     |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **msp**           | **Object**   | An array of MSP (Marked Selling Price) objects containing the amount and currency.                      |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **taxesAndFees**  | **Object**    | An array of taxes and fees objects containing information about included or additional charges.          |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **cancellationPolicies** | **Object** | An object containing cancellation policy information.                                                    |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **cancelPolicyInfos** | **Object** | An array of cancellation policy info objects containing information about cancellation time, amount, and type. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **hotelRemarks**      | **Array**  | An array of hotel remarks.                                                                             |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **refundableTag**      | **string** | The tag indicating if the rate is refundable or non-refundable.                                         |
| **msp**                   | **number** | The Marked Selling Price (MSP) for the prebook.                                                         |
| **commission**            | **number** | The commission amount for the prebook.                                                                  |
| **price**                 | **number** | The price of the prebook.                                                                              |
| **priceType**             | **string** | The type of pricing (e.g., commission).                                                                 |
| **priceDifferencePercent**| **number** | The percentage difference between the retail rate and the Marked Selling Price (MSP).                   |
| **cancellationChanged**   | **boolean** | Indicates if there were changes to the cancellation policy.                                             |
| **boardChanged**          | **boolean** | Indicates if there were changes to the board type.                                                      |
| **supplier**              | **string** | The name of the supplier.                                                                              |
| **supplierId**            | **number** | The ID of the supplier.                                                                                |


<br>

### Hotel rate book
------

The book function confirms a booking when the prebook Id and the rate Id from the pre book stage along with the guest and payment information are passeed.

The guest information is an object that should include the guest first name, last name and email.

The payment information is an object that should include the name, credit card number, expiry and CVC number.

The response will confirm the booking along with a booking Id and a hotel confirmation code. It will also include the booking details including the dates, price and the cancellation policies.

*  <h4 style="color:#9155fd; font-weight: 800;"> Example :</h4>


```js
const result = await liteApi.book({
  holder: {
    firstName: 'Steve',
    lastName: 'Doe',
    email: 's.doe@liteapi.travel'
  },
  payment: {
    method: 'TRANSACTION_ID',
    transactionId: '456'
  },
  prebookId: '123',
  guests: [
    {
      occupancyNumber: 1,
      firstName: 'Sunny',
      lastName: 'Mars',
      email: 's.mars@liteapi.travel'
    }
  ]
});
```
*  <h4 style="color:#9155fd; font-weight: 800;"> Parameters :</h4>

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**prebookId** | **string**| prebook id retrieved from prebook response| [required]
**guestInfo** | **object**| traveler informations| [required]|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **guestFirstName** | **string**| traveler first name | [required]|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **guestLastName** | **string**| traveler last name | [required]|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **guestEmail** | **string**| traveler email | [required]|
**paymentMethod** | **string**| methodEnum: "CREDIT_CARD" or "STRIPE_TOKEN" | [required]
**holderName** | **string**| name of the cardholder	| [required]
**paymentInfo** | **object**| payment informations | [required]
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **card_number** | **string**| the card number associated with the credit card| [required if paymentMethod is CREDIT_CARD]
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **exp_month** | **number**| the expiration month of the credit card | [required if paymentMethod is CREDIT_CARD]
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **exp_year** | **number**| the expiration year of the credit card | [required if paymentMethod is CREDIT_CARD]
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **cvc** | **number**| the card verification code (CVC) associated with the credit card | [required if paymentMethod is CREDIT_CARD]
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **token** | **string**| token provided by Stripe for the payment method. | [required if paymentMethod is STRIPE_TOKEN]


*  <h4 style="color:#9155fd; font-weight: 800;"> Return type :</h4>

An object containing booking information and room details.


| Name                      | Type    | Description                          |
| ------------------------- | ------- | ------------------------------------ |
| **bookingId**             | **string**  | The ID of the booking.               |
| **clientReference**       | **string**  | The client reference.                |
| **supplierBookingId**     | **string**  | The supplier booking ID.             |
| **supplierBookingName**   | **string**  | The supplier booking name.           |
| **supplier**              | **string**  | The supplier.                        |
| **supplierId**            | **number**  | The ID of the supplier.              |
| **status**                | **string**  | The status of the booking.           |
| **hotelConfirmationCode** | **string**  | The hotel confirmation code.         |
| **checkin**               | **string**  | The check-in date.                   |
| **checkout**              | **string**  | The check-out date.                  |
| **hotel**                 | **object**  | An object containing hotel details.  |
| **bookedRooms**           | **array**   | An array of booked room objects.     |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **roomType**      | **object**  | An object containing room type details. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **adults**        | **number**  | The number of adults.           |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **children**      | **number**  | The number of children.         |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **rate**          | **object**  | An object containing rate details. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **maxOccupancy**      | **number** | The maximum occupancy.           |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **retailRate**        | **object** | An object containing the retail rate information, including total price. |
| **guestInfo**             | **object**  | An object containing guest details.  |
| **createdAt**             | **string**  | The creation date of the booking.    |
| **cancellationPolicies**  | **object**  | An object containing cancellation policies information.
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **cancelPolicyInfos** | **Object** | An array of cancellation policy info objects containing information about cancellation time, amount, and type. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **hotelRemarks**      | **Array**  | An array of hotel remarks.                                                                             |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **refundableTag**      | **string** | The tag indicating if the rate is refundable or non-refundable.
| **price**                 | **number**  | The price of the booking.            |
| **msp**                   | **number**  | The MSP (Merchant Service Provider) price. |
| **commission**            | **number**  | The commission amount.               |
| **currency**              | **string**  | The currency of the booking.         |


<br>

## Booking management

### Booking list
------
The getBookingListByGuestID function returns the list of all booking Id's for a given guest Id.

*  <h4 style="color:#9155fd; font-weight: 800;"> Example :</h4>
```js
    const guestId = "FrT56hfty";
    const result = await liteApi.getBookingListByGuestId(guestId)
```
*  <h4 style="color:#9155fd; font-weight: 800;"> Parameters :</h4>


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guestId** | **string** | The Guest Id of the user | [required]


*  <h4 style="color:#9155fd; font-weight: 800;"> Return type :</h4>

An array containing objects with the following properties:

| Name        | Type   | Description        |
| ----------- | ------ | ------------------ |
| **bookingId** | **string** | The booking ID.    |


<br>

### Booking retrieve
------
The retrieveBooking function returns the status and the details of a specific booking Id.

*  <h4 style="color:#9155fd; font-weight: 800;"> Example :</h4>
```js
    const bookingId = "uSQ6Zsc5R";
    const result = await liteApi.retrieveBooking(bookingId);
```
*  <h4 style="color:#9155fd; font-weight: 800;"> Parameters :</h4>


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **bookingId** | **string** | The Booking Id that needs to be retrieved | [required]


*  <h4 style="color:#9155fd; font-weight: 800;"> Return type :</h4>

An object containing booking information and room details.

| Name                  | Type   | Description                      |
| --------------------- | ------ | -------------------------------- |
| **bookingId**         | **string** | The booking ID.                  |
| **clientReference**   | **string** | The client reference.            |
| **status**            | **string** | The booking status.              |
| **hotelConfirmationCode** | **string** | The hotel confirmation code.    |
| **checkin**           | **string** | The check-in date.               |
| **checkout**          | **string** | The check-out date.              |
| **hotel**             | **object** | An object containing hotel details. |
| **bookedRooms**       | **array**  | An array of booked room objects. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **roomType**      | **object**  | An object containing room type details. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **adults**        | **number**  | The number of adults.           |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **children**      | **number**  | The number of children.         |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **rate**          | **object**  | An object containing rate details. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **maxOccupancy**      | **number** | The maximum occupancy.           |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **boardType**    | **string** | The board type.              |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **boardName**    | **string** | The board name.              |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **retailRate**        | **object** | An object containing the retail rate information, including total price. |
| **guestInfo**         | **object** | An object containing guest information. |
| **createdAt**         | **string** | The creation date of the booking. |
| **cancellationPolicies** | **object** | An object containing cancellation policy details. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **cancelPolicyInfos** | **Object** | An array of cancellation policy info objects containing information about cancellation time, amount, and type. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **hotelRemarks**      | **Array**  | An array of hotel remarks.                                                                             |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **refundableTag**      | **string** | The tag indicating if the rate is refundable or non-refundable.
| **currency**          | **string** | The currency code.               |
| **price**             | **number** | The price of the booking.        |



<br>

### Booking cancel
------

The cancelBooking function is used to request a cancellation of an existing confirmed booking. Cancellation policies and conditions will be used to determine the success of the cancellation. For example a booking with non-refundable (NRFN) tag or a booking with a cancellation policy that was requested past the cancellation date will not be able to cancel the confirmed booking.


*  <h4 style="color:#9155fd; font-weight: 800;"> Example :</h4>
```js
const bookingId = "K8Hvb-85O";
const result = await liteApi.cancelBooking(bookingId);
```
*  <h4 style="color:#9155fd; font-weight: 800;"> Parameters :</h4>

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **bookingId** | **string** | The booking Id of the booking you would like to cancel. |  [required]



*  <h4 style="color:#9155fd; font-weight: 800;"> Return type :</h4>

| Name             | Type   | Description                 |
| ---------------- | ------ | --------------------------- |
| **bookingId**    | **string** | The booking ID.             |
| **status**       | **string** | The booking status.         |
| **cancellation_fee** | **number** | The cancellation fee.       |
| **refund_amount**    | **number** | The refund amount.          |
| **currency**     | **string** | The currency of the booking. |

<br>

# Vouchers

LiteAPI provides straightforward access to voucher details, including codes and discounts, along with current loyalty program status and cashback rates.

## Retrieve vouchers

The `getVouchers` function retrieves a list of all available vouchers. This endpoint provides details such as the voucher code, discount type and value, validity period, and other relevant information.

* <h4 style="color:#9155fd; font-weight: 800;">Example :</h4>

```js
const result = await liteApi.getVouchers();
```
*  <h4 style="color:#9155fd; font-weight: 800;"> Parameters :</h4>

This function does not need any additional parameters.

* <h4 style="color:#9155fd; font-weight: 800;">Return type :</h4>

An object containing the following properties:
name | Type | Description
------|------|------------
**status** | **string** | Status of the operation.
**data**   | **array**  | List of available vouchers.

<br>

## Voucher Details

The `getVoucherById` function retrieves details of a specific voucher by its ID. This includes the voucher code, discount details, usage limits, and more.

* <h4 style="color:#9155fd; font-weight: 800;">Example :</h4>

```js
const voucherID = "your_voucher_id";
const result = await liteApi.getVoucherById(voucherID);
```

* <h4 style="color:#9155fd; font-weight: 800;">Parameters :</h4>

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **voucherID** | **string**| The unique ID of the voucher.	| [required]

* <h4 style="color:#9155fd; font-weight: 800;">Return type :</h4>

An object containing the following properties:
name | Type | Description
------|------|------------
**status** | **string** | Status of the operation.
**data**   | **object**  | Details of the specific voucher.

## Create voucher 

Create a new voucher with the specified details, including the voucher code, discount type, value, and validity period. This voucher can then be used by customers.

* <h4 style="color:#9155fd; font-weight: 800;">Example :</h4>

```js
const result = await liteApi.CreateVoucher ({voucher_code: "em8d5d7l", 
                                             discount_type: "percentage", 
                                             discount_value: 12,
                                             minimum_spend: 60, 
                                             maximum_discount_amount: 20, 
                                             currency: "USD", 
                                             validity_start: "2024-06-03", 
                                             validity_end: "2024-07-30", 
                                             usages_limit: 10, 
                                             status: "active"});
```

* <h4 style="color:#9155fd; font-weight: 800;">Parameters :</h4>

Name                      | Type         | Description                                                                        | Notes
------------------------- | ------------ | ---------------------------------------------------------------------------------- | -------------
**voucherCode**           | **string**   | The unique code for the new voucher.	                                              | [required]
**discountType**          | **string**   | Type of discount, such as percentage.                                            	| [required]
**discountValue**         | **number**   | Value of the discount applied by the voucher.	                                    | [required]
**minimumSpend**          | **number**   | Minimum rate to apply the discount voucher in the voucher currency.              	| [required]
**maximumDiscountAmount** | **number**   | Maximum discount amount that can be applied using the voucher in voucher currency.	| [required]
**currency**              | **string**   | Currency in which the discount is offered.                                       	| [required]
**validityStart**         | **date**     | Date from which the voucher becomes valid.	                                        | [required]
**validityEnd**           | **date**     | Date until which the voucher remains valid.	                                      | [required]
**usagesLimit**           | **number**   | Maximum number of times the voucher can be redeemed.	                              | [required]
**Status**                | **string**   | The unique code for the new voucher.                                             	| [required]
* <h4 style="color:#9155fd; font-weight: 800;">Return type :</h4>

An object containing the following properties:
name        | Type       | Description
------------|------------|------------
**message** | **string** | Voucher created successfully.

<br>

## Update Voucher 

Update the details of an existing voucher, including the voucher code, discount value, validity period, and more.

* <h4 style="color:#9155fd; font-weight: 800;">Example :</h4>

```js
const result = await liteApi.UpdateVoucher('68',{voucher_code: "em8d5d7l", 
                                                 discount_type: "percentage", 
                                                 discount_value: 12,
                                                 minimum_spend: 60, 
                                                 maximum_discount_amount: 20, 
                                                 currency: "USD", 
                                                 validity_start: "2024-06-03", 
                                                 validity_end: "2024-07-30", 
                                                 usages_limit: 10, 
                                                 status: "active"});
```

* <h4 style="color:#9155fd; font-weight: 800;">Parameters :</h4>

Name                      | Type         | Description                                                                        | Notes
------------------------- | ------------ | ---------------------------------------------------------------------------------- | -------------
**id**                    | **number**   | Unique identifier of the voucher to update.	                                      | [required]
**voucherCode**           | **string**   | The unique code for the new voucher.	                                              | [required]
**discountType**          | **string**   | Type of discount, such as percentage.                                            	| [required]
**discountValue**         | **number**   | Value of the discount applied by the voucher.	                                    | [required]
**minimumSpend**          | **number**   | Minimum rate to apply the discount voucher in the voucher currency.              	| [required]
**maximumDiscountAmount** | **number**   | Maximum discount amount that can be applied using the voucher in voucher currency.	| [required]
**currency**              | **string**   | Currency of the discount.                                                        	| [required]
**validityStart**         | **date**     | Updated start date of the voucher's validity.	                                    | [required]
**validityEnd**           | **date**     | Updated end date of the voucher's validity.	                                      | [required]
**usagesLimit**           | **number**   | Updated usage limit for the voucher.                                               | [required]
**Status**                | **string**   | Updated status of the voucher (e.g., active, inactive).                           	| [required]
* <h4 style="color:#9155fd; font-weight: 800;">Return type :</h4>

An object containing the following properties:
name        | Type       | Description
------------|------------|------------
**message** | **string** | Voucher updated successfully.

<br>

## Update Voucher status 

Update the status of a voucher, typically to activate or deactivate it.


* <h4 style="color:#9155fd; font-weight: 800;">Example :</h4>

```js
const result = await liteApi.UpdateVoucherStatus('68', {status: "inactive"});
```

* <h4 style="color:#9155fd; font-weight: 800;">Parameters :</h4>

Name                      | Type         | Description                                                              | Notes
------------------------- | ------------ | ------------------------------------------------------------------------ | -------------
**id**                    | **number**   | Unique identifier of the voucher for which the status is being updated.  | [required]
**Status**                | **string**   | New status of the voucher.                                             	| [required]
* <h4 style="color:#9155fd; font-weight: 800;">Return type :</h4>

An object containing the following properties:
name        | Type       | Description
------------|------------|------------
**message** | **string** | Voucher status updated successfully.

<br>

# Loyalty

## Loyalty Program

The `getLoyalty` function retrieves information about current loyalty program settings, including status and cashback rates.


* <h4 style="color:#9155fd; font-weight: 800;">Example :</h4>
```js
const result = await liteApi.getLoyalty();
```
*  <h4 style="color:#9155fd; font-weight: 800;"> Parameters :</h4>

This function does not need any additional parameters.

* <h4 style="color:#9155fd; font-weight: 800;">Return type :</h4>

An object containing the following properties:
name | Type | Description
------|------|------------
**status** | **string** | Status of the operation.
**data**   | **object**  | Details of the loyalty program.

<br>

## Enable loyalty program

Once enable the loyalty program with specified status enabled/disabled and cashback rate (e.g. 0.03 = 3% cashback).

* <h4 style="color:#9155fd; font-weight: 800;">Example :</h4>

```js
const result = await liteApi.EnableLoyalty({status: "disabled", cashbackRate: 0.03 });
```

* <h4 style="color:#9155fd; font-weight: 800;">Parameters :</h4>

Name                      | Type         | Description                                                | Notes
------------------------- | ------------ | ---------------------------------------------------------- | -------------
**Status**                | **string**   | Loyalty program status, either enabled or disabled.       	| [required]
**cashbackRate**          | **float**    | Cashback rate in percentage, e.g. 0.1 = 10%              	| [required]

* <h4 style="color:#9155fd; font-weight: 800;">Return type :</h4>

An object containing the following properties:
name       | Type       | Description
-----------|------------|------------
**status** | **string** | Status of the operation.
**data**   | **object** | Details of the loyalty program.

<br>

## Update loyalty program

Updates the loyalty program settings, including status and cashback rates.


* <h4 style="color:#9155fd; font-weight: 800;">Example :</h4>

```js
const result = await liteApi.UpdateLoyalty({status: "disabled", cashbackRate: 0.03 });
```

* <h4 style="color:#9155fd; font-weight: 800;">Parameters :</h4>

Name                      | Type         | Description                                                | Notes
------------------------- | ------------ | ---------------------------------------------------------- | -------------
**Status**                | **string**   | Loyalty program status, either enabled or disabled.       	| [required]
**cashbackRate**          | **float**    | Cashback rate in percentage, e.g. 0.1 = 10%.             	| [required]

* <h4 style="color:#9155fd; font-weight: 800;">Return type :</h4>

An object containing the following properties:
name       | Type       | Description
-----------|------------|------------
**status** | **string** | Status of the operation.
**data**   | **object** | Details of the loyalty program.

<br>

## Fetch specific guest

Fetches detailed information about a guest, including personal data, loyalty points, and booking history.

* <h4 style="color:#9155fd; font-weight: 800;">Example :</h4>

```js
const result = await liteApi.getGuestsIds(8);
```

* <h4 style="color:#9155fd; font-weight: 800;">Parameters :</h4>

Name                      | Type         | Description                                                | Notes
------------------------- | ------------ | ---------------------------------------------------------- | -------------
**guestId**               | **number**   | Numeric ID of the guest to fetch.                        	| [required]

* <h4 style="color:#9155fd; font-weight: 800;">Return type :</h4>

An object containing the following properties:
name       | Type       | Description
-----------|------------|------------
**status** | **string** | Status of the operation.
**data**   | **object** | Details of specific guest.

<br>

## Fetch guest's bookings

Retrieves a list of all bookings associated with a specific guest, including details about the points earned and cashback applied for each booking.

* <h4 style="color:#9155fd; font-weight: 800;">Example :</h4>

```js
const result = await liteApi.getGuestsBokings(8);
```

* <h4 style="color:#9155fd; font-weight: 800;">Parameters :</h4>

Name                      | Type         | Description                                                | Notes
------------------------- | ------------ | ---------------------------------------------------------- | -------------
**guestId**               | **number**   | Numeric ID of the guest to fetch.                        	| [required]

* <h4 style="color:#9155fd; font-weight: 800;">Return type :</h4>

An object containing the following properties:
name       | Type       | Description
-----------|------------|------------
**status** | **string** | Status of the operation.
**data**   | **object** | Details of guest's bookings.

<br>

# Analytics

## Retrieve weekly analytics

Fetch weekly analytics data for the specified date range.


* <h4 style="color:#9155fd; font-weight: 800;">Example :</h4>

```js
const result = await liteApi.RetrieveWeeklyAanalytics( {from: "2024-01-01", to: "2024-01-07"});
```

* <h4 style="color:#9155fd; font-weight: 800;">Parameters :</h4>

Name         | Type       | Description                                                | Notes
------------ | ---------- | ---------------------------------------------------------- | -------------
**from**     | **date**   | Start date for the analytics data YYYY-MM-DD (ISO 8601).   | [required]
**to**       | **date**   | Start date for the analytics data YYYY-MM-DD (ISO 8601).   | [required]

* <h4 style="color:#9155fd; font-weight: 800;">Return type :</h4>

An object containing the following properties:
name       | Type       | Description
-----------|------------|------------
**status** | **string** | Status of the operation.
**data**   | **object** | Details of weekly analytics.

<br>

## Retrieve detailed analytics report

Fetch a detailed analytics report for the specified date range.



* <h4 style="color:#9155fd; font-weight: 800;">Example :</h4>

```js
const result = await liteApi.RetrieveAanalyticsReport( {from: "2024-01-01", to: "2024-01-07"});
```

* <h4 style="color:#9155fd; font-weight: 800;">Parameters :</h4>

Name         | Type       | Description                                                | Notes
------------ | ---------- | ---------------------------------------------------------- | -------------
**from**     | **date**   | Start date for the analytics data YYYY-MM-DD (ISO 8601).   | [required]
**to**       | **date**   | Start date for the analytics data YYYY-MM-DD (ISO 8601).   | [required]

* <h4 style="color:#9155fd; font-weight: 800;">Return type :</h4>

An object containing the following properties:
name       | Type       | Description
-----------|------------|------------
**status** | **string** | Status of the operation.
**data**   | **object** | Details of analytics report.

<br>

## Retrieve market analytics

Fetch market analytics data for the specified date range.


* <h4 style="color:#9155fd; font-weight: 800;">Example :</h4>

```js
const result = await liteApi.RetrieveMarketAanalytics ( {from: "2024-01-01", to: "2024-01-07"});
```

* <h4 style="color:#9155fd; font-weight: 800;">Parameters :</h4>

Name         | Type       | Description                                                | Notes
------------ | ---------- | ---------------------------------------------------------- | -------------
**from**     | **date**   | Start date for the analytics data YYYY-MM-DD (ISO 8601).   | [required]
**to**       | **date**   | Start date for the analytics data YYYY-MM-DD (ISO 8601).   | [required]

* <h4 style="color:#9155fd; font-weight: 800;">Return type :</h4>

An object containing the following properties:
name       | Type       | Description
-----------|------------|------------
**status** | **string** | Status of the operation.
**data**   | **object** | Details of market analytics.

<br>

## Most booked hotels

Fetch hotel analytics data for most booked hotels the specified date range.


* <h4 style="color:#9155fd; font-weight: 800;">Example :</h4>

```js
const result = await liteApi.RetrieveMostBookedHotels( {from: "2024-01-01", to: "2024-01-07"});
```

* <h4 style="color:#9155fd; font-weight: 800;">Parameters :</h4>

Name         | Type       | Description                                                | Notes
------------ | ---------- | ---------------------------------------------------------- | -------------
**from**     | **date**   | Start date for the analytics data YYYY-MM-DD (ISO 8601).   | [required]
**to**       | **date**   | Start date for the analytics data YYYY-MM-DD (ISO 8601).   | [required]

* <h4 style="color:#9155fd; font-weight: 800;">Return type :</h4>

An object containing the following properties:
name       | Type       | Description
-----------|------------|------------
**status** | **string** | Status of the operation.
**data**   | **object** | Details of Most booked hotels.

<br>
# Example Project
To see an example project demonstrating how to integrate the SDK, visit [liteAPI-nodejs-sdk-examples](https://github.com/liteapi-travel/nodejs-sdk-examples)
# lite-api-travel.SearchApi

All URIs are relative to *https://api.lite-api-travel.travel/v2.0*

Method | HTTP request | Description
------------- | ------------- | -------------
[**hotelsGet**](SearchApi.md#hotelsGet) | **GET** /hotels | hotel minimum rates availability
[**hotelsRatesGet**](SearchApi.md#hotelsRatesGet) | **GET** /hotels/rates | hotel full rates availability



## hotelsGet

> Object hotelsGet(hotelIds, checkin, checkout, currency, guestNationality, adults, opts)

hotel minimum rates availability

**Hotel Minimum Rates API** is to search and return the minimum room rates that are available for a list of hotel ID&#39;s on the specified search dates.  For each hotel ID, the minimum room rate that is available is returned.  The API also has a built in loyalty rewards system. The system rewards return users who have made prior bookings.  If the search is coming from a known guest ID, the guest level is also returned along with pricing has more discounts.  If it is a new user, the guest ID will be generated at the time of the first confirmed booking.   Example API key for test: sand_c0155ab8-c683-4f26-8f94-b5e92c5797b9

### Example

```javascript
import lite-api-travel from 'lite-api-travel';
let defaultClient = lite-api-travel.ApiClient.instance;
// Configure API key authorization: apikeyAuth
let apikeyAuth = defaultClient.authentications['apikeyAuth'];
apikeyAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//apikeyAuth.apiKeyPrefix = 'Token';

let apiInstance = new lite-api-travel.SearchApi();
let hotelIds = lp3803c,lp1f982,lp19b70,lp19e75; // Object | List of hotelIds
let checkin = 2023-11-15; // Object | Check in data in YYYY-MM-DD format
let checkout = 2023-11-16; // Object | Check out data in YYYY-MM-DD format
let currency = USD; // Object | Currency code - example (USD)
let guestNationality = US; // Object | Guest nationality ISO-2 code - example (SG)
let adults = 1; // Object | Number of adult guests staying
let opts = {
  'children': 12,9, // Object | Number of children staying if any
  'guestId': testtraveler1 // Object | Unique traveler ID if available
};
apiInstance.hotelsGet(hotelIds, checkin, checkout, currency, guestNationality, adults, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **hotelIds** | [**Object**](.md)| List of hotelIds | 
 **checkin** | [**Object**](.md)| Check in data in YYYY-MM-DD format | 
 **checkout** | [**Object**](.md)| Check out data in YYYY-MM-DD format | 
 **currency** | [**Object**](.md)| Currency code - example (USD) | 
 **guestNationality** | [**Object**](.md)| Guest nationality ISO-2 code - example (SG) | 
 **adults** | [**Object**](.md)| Number of adult guests staying | 
 **children** | [**Object**](.md)| Number of children staying if any | [optional] 
 **guestId** | [**Object**](.md)| Unique traveler ID if available | [optional] 

### Return type

**Object**

### Authorization

[apikeyAuth](../README.md#apikeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## hotelsRatesGet

> Object hotelsRatesGet(hotelIds, checkin, checkout, guestNationality, currency, adults, opts)

hotel full rates availability

The Full Rates  API is to search and return all available rooms along with its rates, cancellation policies for a list of hotel ID&#39;s based on the search dates.   For each hotel ID, all available room information is returned.   The API also has a built in loyalty rewards system. The system rewards return users who have made prior bookings.   If the search is coming from a known guest ID, the guest level is also returned along with the pricing that&#39;s appropriate for the guest level.  If it is a new user, the guest ID will be generated at the time of the first confirmed booking.   Example API key for test: sand_c0155ab8-c683-4f26-8f94-b5e92c5797b9

### Example

```javascript
import lite-api-travel from 'lite-api-travel';
let defaultClient = lite-api-travel.ApiClient.instance;
// Configure API key authorization: apikeyAuth
let apikeyAuth = defaultClient.authentications['apikeyAuth'];
apikeyAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//apikeyAuth.apiKeyPrefix = 'Token';

let apiInstance = new lite-api-travel.SearchApi();
let hotelIds = lp3803c,lp1f982,lp19b70,lp19e75; // Object | List of hotelIds
let checkin = 2023-11-15; // Object | Check in data in YYYY-MM-DD format
let checkout = 2023-11-16; // Object | Check out data in YYYY-MM-DD format
let guestNationality = US; // Object | Guest nationality ISO-2 code - example (SG)
let currency = USD; // Object | Currency code - example (USD)
let adults = 1; // Object | Number of adult guests staying
let opts = {
  'children': 12,9, // Object | Number of children staying if any
  'guestId': traveler1 // Object | Unique traveler ID if available
};
apiInstance.hotelsRatesGet(hotelIds, checkin, checkout, guestNationality, currency, adults, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **hotelIds** | [**Object**](.md)| List of hotelIds | 
 **checkin** | [**Object**](.md)| Check in data in YYYY-MM-DD format | 
 **checkout** | [**Object**](.md)| Check out data in YYYY-MM-DD format | 
 **guestNationality** | [**Object**](.md)| Guest nationality ISO-2 code - example (SG) | 
 **currency** | [**Object**](.md)| Currency code - example (USD) | 
 **adults** | [**Object**](.md)| Number of adult guests staying | 
 **children** | [**Object**](.md)| Number of children staying if any | [optional] 
 **guestId** | [**Object**](.md)| Unique traveler ID if available | [optional] 

### Return type

**Object**

### Authorization

[apikeyAuth](../README.md#apikeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


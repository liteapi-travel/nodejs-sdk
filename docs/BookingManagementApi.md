# LiteApi.BookingManagementApi

All URIs are relative to *https://api.liteapi.travel/v2.0*

Method | HTTP request | Description
------------- | ------------- | -------------
[**bookingsBookingIdGet**](BookingManagementApi.md#bookingsBookingIdGet) | **GET** /bookings/{bookingId} | Booking retrieve
[**bookingsBookingIdPut**](BookingManagementApi.md#bookingsBookingIdPut) | **PUT** /bookings/{bookingId} | Booking cancel
[**bookingsGet**](BookingManagementApi.md#bookingsGet) | **GET** /bookings | Booking list



## bookingsBookingIdGet

> Object bookingsBookingIdGet(bookingId)

Booking retrieve

The API returns the status and the details for the a specific booking Id.

### Example

```javascript
var LiteApi = require('liteapi-travel');
let defaultClient = LiteApi.ApiClient.instance;
// Configure API key authorization: apikeyAuth
let apikeyAuth = defaultClient.authentications['apikeyAuth'];
apikeyAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//apikeyAuth.apiKeyPrefix = 'Token';

let apiInstance = new LiteApi.BookingManagementApi();
let bookingId =  hSq2gVDrf; // Object | The Booking Id that needs to be retrieved
apiInstance.bookingsBookingIdGet(bookingId, (error, data, response) => {
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
 **bookingId** | [**Object**](.md)| The Booking Id that needs to be retrieved | 

### Return type

**Object**

### Authorization

[apikeyAuth](../README.md#apikeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## bookingsBookingIdPut

> Object bookingsBookingIdPut(bookingId)

Booking cancel

&lt;!-- theme: danger --&gt; This API is used to request a cancellation of an existing confirmed booking. Cancellation policies and conditions will be used to determine the success of the cancellation. For example a booking with non-refundable (NRFN) tag or a booking with a cancellation policy that was requested past the cancellation date will not be able to cancel the confirmed booking.

### Example

```javascript
var LiteApi = require('liteapi-travel');
let defaultClient = LiteApi.ApiClient.instance;
// Configure API key authorization: apikeyAuth
let apikeyAuth = defaultClient.authentications['apikeyAuth'];
apikeyAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//apikeyAuth.apiKeyPrefix = 'Token';

let apiInstance = new LiteApi.BookingManagementApi();
let bookingId = hSq2gVDrf; // Object | (Required) The unique identifier of the booking you would like to update.
apiInstance.bookingsBookingIdPut(bookingId, (error, data, response) => {
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
 **bookingId** | [**Object**](.md)| (Required) The unique identifier of the booking you would like to update. | 

### Return type

**Object**

### Authorization

[apikeyAuth](../README.md#apikeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## bookingsGet

> Object bookingsGet(guestId)

Booking list

The API returns the list of booking Id&#39;s for a given guest Id.

### Example

```javascript
var LiteApi = require('liteapi-travel');
let defaultClient = LiteApi.ApiClient.instance;
// Configure API key authorization: apikeyAuth
let apikeyAuth = defaultClient.authentications['apikeyAuth'];
apikeyAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//apikeyAuth.apiKeyPrefix = 'Token';

let apiInstance = new LiteApi.BookingManagementApi();
let guestId = FrT56hfty; // Object | The Guest Id of the user
apiInstance.bookingsGet(guestId, (error, data, response) => {
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
 **guestId** | [**Object**](.md)| The Guest Id of the user | 

### Return type

**Object**

### Authorization

[apikeyAuth](../README.md#apikeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


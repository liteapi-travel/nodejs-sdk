# LiteApi.GuestAndLoyaltyApi

All URIs are relative to *https://api.liteapi.travel/v2.0*

Method | HTTP request | Description
------------- | ------------- | -------------
[**guestsGet**](GuestAndLoyaltyApi.md#guestsGet) | **GET** /guests | guests



## guestsGet

> Object guestsGet(opts)

guests

The guests API returns the unique guest ID of a user based on the users email ID

### Example

```javascript
import LiteApi from 'lite-api-travel';
let defaultClient = LiteApi.ApiClient.instance;
// Configure API key authorization: apikeyAuth
let apikeyAuth = defaultClient.authentications['apikeyAuth'];
apikeyAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//apikeyAuth.apiKeyPrefix = 'Token';

let apiInstance = new LiteApi.GuestAndLoyaltyApi();
let opts = {
  'email': johndoe@nlite.ml // Object | Email ID of the guest
};
apiInstance.guestsGet(opts, (error, data, response) => {
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
 **email** | [**Object**](.md)| Email ID of the guest | [optional] 

### Return type

**Object**

### Authorization

[apikeyAuth](../README.md#apikeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


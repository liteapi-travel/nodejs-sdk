# lite-api-travel.BookApi

All URIs are relative to *https://api.lite-api-travel.travel/v2.0*

Method | HTTP request | Description
------------- | ------------- | -------------
[**ratesBookPost**](BookApi.md#ratesBookPost) | **POST** /rates/book | hotel rate book
[**ratesPrebookPost**](BookApi.md#ratesPrebookPost) | **POST** /rates/prebook | hotel rate prebook



## ratesBookPost

> Object ratesBookPost(opts)

hotel rate book

This API confirms a booking when the prebook Id and the rate Id from the pre book stage along with the guest and payment information are passed.  The guest information is an object that should include the guest first name, last name and email.  The payment information is an object that should include the name, credit card number, expiry and CVC number.  The response will confirm the booking along with a booking Id and a hotel confirmation code. It will also include the booking details including the dates, price and the cancellation policies.   Example API key for test: sand_c0155ab8-c683-4f26-8f94-b5e92c5797b9

### Example

```javascript
import lite-api-travel from 'lite-api-travel';
let defaultClient = lite-api-travel.ApiClient.instance;
// Configure API key authorization: apikeyAuth
let apikeyAuth = defaultClient.authentications['apikeyAuth'];
apikeyAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//apikeyAuth.apiKeyPrefix = 'Token';

let apiInstance = new lite-api-travel.BookApi();
let opts = {
  'ratesBookPostRequest': {"prebookId":"UwfMkUWH6","guestInfo":{"guestFirstName":"Kim","guestLastName":"James","guestEmail":"test@nlite.ml"},"payment":{"holderName":"Kim James","number":"4242424242424242","expireDate":"11/29","cvc":"456","method":"CREDIT_CARD"}} // RatesBookPostRequest | 
};
apiInstance.ratesBookPost(opts, (error, data, response) => {
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
 **ratesBookPostRequest** | [**RatesBookPostRequest**](RatesBookPostRequest.md)|  | [optional] 

### Return type

**Object**

### Authorization

[apikeyAuth](../README.md#apikeyAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## ratesPrebookPost

> Object ratesPrebookPost(opts)

hotel rate prebook

This API is used to confirm if the room and rates for the search criterion. The input to the endpoint is a specific rate Id coming from the **GET** hotel full rates availability API. In response, the API generates a prebook Id, a new rate Id and contains information if  price, cancellation policy or boarding information has changed. Example API key for test sand_c0155ab8-c683-4f26-8f94-b5e92c5797b9

### Example

```javascript
import lite-api-travel from 'lite-api-travel';
let defaultClient = lite-api-travel.ApiClient.instance;
// Configure API key authorization: apikeyAuth
let apikeyAuth = defaultClient.authentications['apikeyAuth'];
apikeyAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//apikeyAuth.apiKeyPrefix = 'Token';

let apiInstance = new lite-api-travel.BookApi();
let opts = {
  'body': {"rateId":"2_3P6L4TRYIFKLFM3DRKUQ4SBFCSO3QJBU27UQ76RU6HTAVUULOUZN3HLFLDS6HRUUQXXZNPELVXHLEXZF3J26PGYXGZEMZOPATZGAUBZLMB7BR6OL7QW4FIAIWTOCOLVHBIRGQFE7UJLTQP5RB6AXVPADIRT34YR56BBBSLSAWK2BMTRYBFRZCYG6HQKMULTSO6JIWWTEGVSBOHNFO7KTFXFMGCULXME2B4PZDCFWK62PT3EL4XUVOEB37V2EA7CWJKOZZU4OYDFB36YWUCID6LWVCCRMVU4PYZH2WBTJ6SLVVEGVZHTVGCVXA5GXEOCUE4ARMWXCIGRPASA5WBFI2T557GWUUZ6YMBZZMPUPCWI7DVO2OG6KY36WWASVBLEJRYFHJRRGQKDV5HY6INAD3YARYKVNFMITJ6BX5LVBVXNF33OZF34ZQDE5S74ND73FMHCYSSTZFOBCOBKYDHQ5BWGRYS7GALROITVAFG2OIFSXLUSKRT3MEURPJL7S3MHWEJMAYJFGGPMRZBEQZXAXDJI"} // Object | 
};
apiInstance.ratesPrebookPost(opts, (error, data, response) => {
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
 **body** | **Object**|  | [optional] 

### Return type

**Object**

### Authorization

[apikeyAuth](../README.md#apikeyAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


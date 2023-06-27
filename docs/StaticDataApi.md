# lite-api-travel.StaticDataApi

All URIs are relative to *https://api.lite-api-travel.travel/v2.0*

Method | HTTP request | Description
------------- | ------------- | -------------
[**dataCitiesGet**](StaticDataApi.md#dataCitiesGet) | **GET** /data/cities | City list
[**dataCountriesGet**](StaticDataApi.md#dataCountriesGet) | **GET** /data/countries | Country list
[**dataCurrenciesGet**](StaticDataApi.md#dataCurrenciesGet) | **GET** /data/currencies | Currency list
[**dataHotelGet**](StaticDataApi.md#dataHotelGet) | **GET** /data/hotel | Hotel details
[**dataHotelsGet**](StaticDataApi.md#dataHotelsGet) | **GET** /data/hotels | Hotel list
[**dataIataCodesGet**](StaticDataApi.md#dataIataCodesGet) | **GET** /data/iataCodes | IATA code list



## dataCitiesGet

> Object dataCitiesGet(countryCode)

City list

The API returns a list of city names from a specific country. The country codes needs be is in ISO-2 format. To get the country codes in ISO-2 for all countries please use the **GET** Country list endpoint

### Example

```javascript
import lite-api-travel from 'lite-api-travel';
let defaultClient = lite-api-travel.ApiClient.instance;
// Configure API key authorization: apikeyAuth
let apikeyAuth = defaultClient.authentications['apikeyAuth'];
apikeyAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//apikeyAuth.apiKeyPrefix = 'Token';

let apiInstance = new lite-api-travel.StaticDataApi();
let countryCode = SG; // Object | Country code in iso-2 format (example: SG)
apiInstance.dataCitiesGet(countryCode, (error, data, response) => {
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
 **countryCode** | [**Object**](.md)| Country code in iso-2 format (example: SG) | 

### Return type

**Object**

### Authorization

[apikeyAuth](../README.md#apikeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## dataCountriesGet

> Object dataCountriesGet()

Country list

The API returns the list of countries available along with its ISO-2 code.

### Example

```javascript
import lite-api-travel from 'lite-api-travel';
let defaultClient = lite-api-travel.ApiClient.instance;
// Configure API key authorization: apikeyAuth
let apikeyAuth = defaultClient.authentications['apikeyAuth'];
apikeyAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//apikeyAuth.apiKeyPrefix = 'Token';

let apiInstance = new lite-api-travel.StaticDataApi();
apiInstance.dataCountriesGet((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

**Object**

### Authorization

[apikeyAuth](../README.md#apikeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## dataCurrenciesGet

> Object dataCurrenciesGet()

Currency list

The API returns all available currency codes along with its name and the list of supported countries that the currency applies to.

### Example

```javascript
import lite-api-travel from 'lite-api-travel';
let defaultClient = lite-api-travel.ApiClient.instance;
// Configure API key authorization: apikeyAuth
let apikeyAuth = defaultClient.authentications['apikeyAuth'];
apikeyAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//apikeyAuth.apiKeyPrefix = 'Token';

let apiInstance = new lite-api-travel.StaticDataApi();
apiInstance.dataCurrenciesGet((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

**Object**

### Authorization

[apikeyAuth](../README.md#apikeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## dataHotelGet

> Object dataHotelGet(hotelId)

Hotel details

The hotel details API returns all the static contents details of a hotel or property if the hotel ID is provided. The static content include name, description, address, amenities, cancellation policies, images and more.

### Example

```javascript
import lite-api-travel from 'lite-api-travel';
let defaultClient = lite-api-travel.ApiClient.instance;
// Configure API key authorization: apikeyAuth
let apikeyAuth = defaultClient.authentications['apikeyAuth'];
apikeyAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//apikeyAuth.apiKeyPrefix = 'Token';

let apiInstance = new lite-api-travel.StaticDataApi();
let hotelId = 57871; // Object | Unique ID of a hotel
apiInstance.dataHotelGet(hotelId, (error, data, response) => {
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
 **hotelId** | [**Object**](.md)| Unique ID of a hotel | 

### Return type

**Object**

### Authorization

[apikeyAuth](../README.md#apikeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## dataHotelsGet

> Object dataHotelsGet(countryCode, cityName, opts)

Hotel list

The API returns a list of hotels available based on different search criterion. The minimum required information is the county code in ISO-2 format.

### Example

```javascript
import lite-api-travel from 'lite-api-travel';
let defaultClient = lite-api-travel.ApiClient.instance;
// Configure API key authorization: apikeyAuth
let apikeyAuth = defaultClient.authentications['apikeyAuth'];
apikeyAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//apikeyAuth.apiKeyPrefix = 'Token';

let apiInstance = new lite-api-travel.StaticDataApi();
let countryCode = SG; // Object | country code ISO-2 code - example (SG)
let cityName = Singapore; // Object | name of the city
let opts = {
  'offset': 0, // Object | specifies the number of rows to skip before starting to return rows
  'limit': 1000, // Object | limit number of results (max 1000)
  'longitude': -115.16988, // Object | longitude geo coordinates
  'latitude': 36.12510, // Object | latitude geo coordinates
  'distance': 1000 // Object | distance in meters (min 1000m)
};
apiInstance.dataHotelsGet(countryCode, cityName, opts, (error, data, response) => {
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
 **countryCode** | [**Object**](.md)| country code ISO-2 code - example (SG) | 
 **cityName** | [**Object**](.md)| name of the city | 
 **offset** | [**Object**](.md)| specifies the number of rows to skip before starting to return rows | [optional] 
 **limit** | [**Object**](.md)| limit number of results (max 1000) | [optional] 
 **longitude** | [**Object**](.md)| longitude geo coordinates | [optional] 
 **latitude** | [**Object**](.md)| latitude geo coordinates | [optional] 
 **distance** | [**Object**](.md)| distance in meters (min 1000m) | [optional] 

### Return type

**Object**

### Authorization

[apikeyAuth](../README.md#apikeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## dataIataCodesGet

> Object dataIataCodesGet()

IATA code list

The API returns the IATA  (International Air Transport Association) codes  for all available airports along with the name of the airport, geographical coordinates and country code in ISO-2 format.

### Example

```javascript
import lite-api-travel from 'lite-api-travel';
let defaultClient = lite-api-travel.ApiClient.instance;
// Configure API key authorization: apikeyAuth
let apikeyAuth = defaultClient.authentications['apikeyAuth'];
apikeyAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//apikeyAuth.apiKeyPrefix = 'Token';

let apiInstance = new lite-api-travel.StaticDataApi();
apiInstance.dataIataCodesGet((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

**Object**

### Authorization

[apikeyAuth](../README.md#apikeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


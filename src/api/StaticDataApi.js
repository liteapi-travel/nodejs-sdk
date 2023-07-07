/**
 * liteAPI
 * The **liteAPI** can be used to to do the following  Get room rates & availability for a set of hotels Select a specific hotel with room availability and make a booking Manage the bookings - retrieve and cancel existing bookings Get static content for hotels, search hotels by destination
 *
 *
 */


import ApiClient from "../ApiClient";

/**
* StaticData service.
* @module api/StaticDataApi
* @version 2.0.0
*/
export default class StaticDataApi {

    /**
    * Constructs a new StaticDataApi. 
    * @alias module:api/StaticDataApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the dataCitiesGet operation.
     * @callback module:api/StaticDataApi~dataCitiesGetCallback
     * @param {String} error Error message, if any.
     * @param {Object} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * City list
     * The API returns a list of city names from a specific country. The country codes needs be is in ISO-2 format. To get the country codes in ISO-2 for all countries please use the **GET** Country list endpoint
     * @param {Object} countryCode Country code in iso-2 format (example: SG)
     * @param {module:api/StaticDataApi~dataCitiesGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Object}
     */
    dataCitiesGet(countryCode, callback) {
      let postBody = null;
      // verify the required parameter 'countryCode' is set
      if (countryCode === undefined || countryCode === null) {
        throw new Error("Missing the required parameter 'countryCode' when calling dataCitiesGet");
      }

      let pathParams = {
      };
      let queryParams = {
        'countryCode': countryCode
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['apikeyAuth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = Object;
      return this.apiClient.callApi(
        '/data/cities', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the dataCountriesGet operation.
     * @callback module:api/StaticDataApi~dataCountriesGetCallback
     * @param {String} error Error message, if any.
     * @param {Object} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Country list
     * The API returns the list of countries available along with its ISO-2 code.
     * @param {module:api/StaticDataApi~dataCountriesGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Object}
     */
    dataCountriesGet(callback) {
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['apikeyAuth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = Object;
      return this.apiClient.callApi(
        '/data/countries', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the dataCurrenciesGet operation.
     * @callback module:api/StaticDataApi~dataCurrenciesGetCallback
     * @param {String} error Error message, if any.
     * @param {Object} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Currency list
     * The API returns all available currency codes along with its name and the list of supported countries that the currency applies to.
     * @param {module:api/StaticDataApi~dataCurrenciesGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Object}
     */
    dataCurrenciesGet(callback) {
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['apikeyAuth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = Object;
      return this.apiClient.callApi(
        '/data/currencies', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the dataHotelGet operation.
     * @callback module:api/StaticDataApi~dataHotelGetCallback
     * @param {String} error Error message, if any.
     * @param {Object} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Hotel details
     * The hotel details API returns all the static contents details of a hotel or property if the hotel ID is provided. The static content include name, description, address, amenities, cancellation policies, images and more.
     * @param {Object} hotelId Unique ID of a hotel
     * @param {module:api/StaticDataApi~dataHotelGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Object}
     */
    dataHotelGet(hotelId, callback) {
      let postBody = null;
      // verify the required parameter 'hotelId' is set
      if (hotelId === undefined || hotelId === null) {
        throw new Error("Missing the required parameter 'hotelId' when calling dataHotelGet");
      }

      let pathParams = {
      };
      let queryParams = {
        'hotelId': hotelId
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['apikeyAuth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = Object;
      return this.apiClient.callApi(
        '/data/hotel', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the dataHotelsGet operation.
     * @callback module:api/StaticDataApi~dataHotelsGetCallback
     * @param {String} error Error message, if any.
     * @param {Object} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Hotel list
     * The API returns a list of hotels available based on different search criterion. The minimum required information is the county code in ISO-2 format.
     * @param {Object} countryCode country code ISO-2 code - example (SG)
     * @param {Object} cityName name of the city
     * @param {Object} opts Optional parameters
     * @param {Object} [offset] specifies the number of rows to skip before starting to return rows
     * @param {Object} [limit] limit number of results (max 1000)
     * @param {Object} [longitude] longitude geo coordinates
     * @param {Object} [latitude] latitude geo coordinates
     * @param {Object} [distance] distance in meters (min 1000m)
     * @param {module:api/StaticDataApi~dataHotelsGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Object}
     */
    dataHotelsGet(countryCode, cityName, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'countryCode' is set
      if (countryCode === undefined || countryCode === null) {
        throw new Error("Missing the required parameter 'countryCode' when calling dataHotelsGet");
      }
      // verify the required parameter 'cityName' is set
      if (cityName === undefined || cityName === null) {
        throw new Error("Missing the required parameter 'cityName' when calling dataHotelsGet");
      }

      let pathParams = {
      };
      let queryParams = {
        'countryCode': countryCode,
        'cityName': cityName,
        'offset': opts['offset'],
        'limit': opts['limit'],
        'longitude': opts['longitude'],
        'latitude': opts['latitude'],
        'distance': opts['distance']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['apikeyAuth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = Object;
      return this.apiClient.callApi(
        '/data/hotels', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the dataIataCodesGet operation.
     * @callback module:api/StaticDataApi~dataIataCodesGetCallback
     * @param {String} error Error message, if any.
     * @param {Object} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * IATA code list
     * The API returns the IATA  (International Air Transport Association) codes  for all available airports along with the name of the airport, geographical coordinates and country code in ISO-2 format.
     * @param {module:api/StaticDataApi~dataIataCodesGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Object}
     */
    dataIataCodesGet(callback) {
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['apikeyAuth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = Object;
      return this.apiClient.callApi(
        '/data/iataCodes', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}

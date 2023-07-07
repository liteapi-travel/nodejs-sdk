/**
 * liteAPI
 * The **liteAPI** can be used to to do the following  Get room rates & availability for a set of hotels Select a specific hotel with room availability and make a booking Manage the bookings - retrieve and cancel existing bookings Get static content for hotels, search hotels by destination
 *
 *
 */


import ApiClient from "../ApiClient";

/**
* Search service.
* @module api/SearchApi
* @version 2.0.0
*/
export default class SearchApi {

    /**
    * Constructs a new SearchApi. 
    * @alias module:api/SearchApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the hotelsGet operation.
     * @callback module:api/SearchApi~hotelsGetCallback
     * @param {String} error Error message, if any.
     * @param {Object} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * hotel minimum rates availability
     * **Hotel Minimum Rates API** is to search and return the minimum room rates that are available for a list of hotel ID's on the specified search dates.  For each hotel ID, the minimum room rate that is available is returned.  The API also has a built in loyalty rewards system. The system rewards return users who have made prior bookings.  If the search is coming from a known guest ID, the guest level is also returned along with pricing has more discounts.  If it is a new user, the guest ID will be generated at the time of the first confirmed booking.   Example API key for test: sand_c0155ab8-c683-4f26-8f94-b5e92c5797b9
     * @param {Object} hotelIds List of hotelIds
     * @param {Object} checkin Check in data in YYYY-MM-DD format
     * @param {Object} checkout Check out data in YYYY-MM-DD format
     * @param {Object} currency Currency code - example (USD)
     * @param {Object} guestNationality Guest nationality ISO-2 code - example (SG)
     * @param {Object} adults Number of adult guests staying
     * @param {Object} opts Optional parameters
     * @param {Object} [children] Number of children staying if any
     * @param {Object} [guestId] Unique traveler ID if available
     * @param {module:api/SearchApi~hotelsGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Object}
     */
    hotelsGet(hotelIds, checkin, checkout, currency, guestNationality, adults, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'hotelIds' is set
      if (hotelIds === undefined || hotelIds === null) {
        throw new Error("Missing the required parameter 'hotelIds' when calling hotelsGet");
      }
      // verify the required parameter 'checkin' is set
      if (checkin === undefined || checkin === null) {
        throw new Error("Missing the required parameter 'checkin' when calling hotelsGet");
      }
      // verify the required parameter 'checkout' is set
      if (checkout === undefined || checkout === null) {
        throw new Error("Missing the required parameter 'checkout' when calling hotelsGet");
      }
      // verify the required parameter 'currency' is set
      if (currency === undefined || currency === null) {
        throw new Error("Missing the required parameter 'currency' when calling hotelsGet");
      }
      // verify the required parameter 'guestNationality' is set
      if (guestNationality === undefined || guestNationality === null) {
        throw new Error("Missing the required parameter 'guestNationality' when calling hotelsGet");
      }
      // verify the required parameter 'adults' is set
      if (adults === undefined || adults === null) {
        throw new Error("Missing the required parameter 'adults' when calling hotelsGet");
      }

      let pathParams = {
      };
      let queryParams = {
        'hotelIds': hotelIds,
        'checkin': checkin,
        'checkout': checkout,
        'currency': currency,
        'guestNationality': guestNationality,
        'adults': adults,
        'children': opts['children'],
        'guestId': opts['guestId']
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
        '/hotels', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the hotelsRatesGet operation.
     * @callback module:api/SearchApi~hotelsRatesGetCallback
     * @param {String} error Error message, if any.
     * @param {Object} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * hotel full rates availability
     * The Full Rates  API is to search and return all available rooms along with its rates, cancellation policies for a list of hotel ID's based on the search dates.   For each hotel ID, all available room information is returned.   The API also has a built in loyalty rewards system. The system rewards return users who have made prior bookings.   If the search is coming from a known guest ID, the guest level is also returned along with the pricing that's appropriate for the guest level.  If it is a new user, the guest ID will be generated at the time of the first confirmed booking.   Example API key for test: sand_c0155ab8-c683-4f26-8f94-b5e92c5797b9
     * @param {Object} hotelIds List of hotelIds
     * @param {Object} checkin Check in data in YYYY-MM-DD format
     * @param {Object} checkout Check out data in YYYY-MM-DD format
     * @param {Object} guestNationality Guest nationality ISO-2 code - example (SG)
     * @param {Object} currency Currency code - example (USD)
     * @param {Object} adults Number of adult guests staying
     * @param {Object} opts Optional parameters
     * @param {Object} [children] Number of children staying if any
     * @param {Object} [guestId] Unique traveler ID if available
     * @param {module:api/SearchApi~hotelsRatesGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Object}
     */
    hotelsRatesGet(hotelIds, checkin, checkout, guestNationality, currency, adults, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'hotelIds' is set
      if (hotelIds === undefined || hotelIds === null) {
        throw new Error("Missing the required parameter 'hotelIds' when calling hotelsRatesGet");
      }
      // verify the required parameter 'checkin' is set
      if (checkin === undefined || checkin === null) {
        throw new Error("Missing the required parameter 'checkin' when calling hotelsRatesGet");
      }
      // verify the required parameter 'checkout' is set
      if (checkout === undefined || checkout === null) {
        throw new Error("Missing the required parameter 'checkout' when calling hotelsRatesGet");
      }
      // verify the required parameter 'guestNationality' is set
      if (guestNationality === undefined || guestNationality === null) {
        throw new Error("Missing the required parameter 'guestNationality' when calling hotelsRatesGet");
      }
      // verify the required parameter 'currency' is set
      if (currency === undefined || currency === null) {
        throw new Error("Missing the required parameter 'currency' when calling hotelsRatesGet");
      }
      // verify the required parameter 'adults' is set
      if (adults === undefined || adults === null) {
        throw new Error("Missing the required parameter 'adults' when calling hotelsRatesGet");
      }

      let pathParams = {
      };
      let queryParams = {
        'hotelIds': hotelIds,
        'checkin': checkin,
        'checkout': checkout,
        'guestNationality': guestNationality,
        'currency': currency,
        'adults': adults,
        'children': opts['children'],
        'guestId': opts['guestId']
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
        '/hotels/rates', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}

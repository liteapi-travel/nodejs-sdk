class LiteApi {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.serviceURL = "https://api.liteapi.travel/v2.0";
    }
    /**
     * Hotel Minimum Rates API is to search and return the minimum room rates that are available for a list of hotel ID's on the specified search dates.
        For each hotel ID, the minimum room rate that is available is returned.
        The API also has a built in loyalty rewards system. The system rewards return users who have made prior bookings.
        If the search is coming from a known guest ID, the guest level is also returned along with the pricing that's appropriate for the guest level.
        If it is a new user, the guest ID will be generated at the time of the first confirmed booking.
     *
     * @param {string} checkin - Checkin date in YYYY-MM-DD format.
     * @param {string} checkout - Checkout date in YYYY-MM-DD format.
     * @param {string} currency - Ex: USD - EUR - MAD.
     * @param {string} guestNationality - Guest nationality should be an ISO2 country code : US - FR.
     * @param {array} hotelIdsList - An array of hotel IDs.
     * @param {number} adults - Number of adult guests staying.
     * @param {array} children - List of the ages of children staying Ex : [2,4] = 2 years old and 4 years old.
     * @param {string} travelerID - Unique traveler ID if available, this is optional.
     * @returns {object} - The result of the operation.
     */
    async getMinimumRates(checkin, checkout, currency, guestNationality, hotelIdsList, adults, children = "", travelerID = "") {
        let errors = [];
        let queryparams = {};
        if (checkin == "" || checkin === undefined) {
            errors.push("Checkin date is required");
        } else {
            queryparams["checkin"] = checkin;
        }
        if (checkout == "" || checkout === undefined) {
            errors.push("Checkout date is required");
        } else {
            queryparams["checkout"] = checkout;
        }
        if (adults == "" || adults === undefined) {
            errors.push("Number of adults is required");
        } else {
            if (isNaN(parseInt(adults)) || !isFinite(adults)) {
                errors.push("Adults must be a number");
            } else {
                queryparams["adults"] = adults;
            }
        }
        if (currency == "") {
            currency = "USD";
        }
        queryparams["currency"] = currency;

        if (guestNationality == "") {
            guestNationality = "US";
        }

        queryparams["guestNationality"] = guestNationality;

        if (!Array.isArray(hotelIdsList)) {
            errors.push("The hotel ids list must be an array");
        } else {
            queryparams["hotelIds"] = hotelIdsList.join("%2C");
        }

        if (children != "") {
            if (!Array.isArray(children)) {
                errors.push("Children must be an array of ages, ex: [2,8]");
            } else {
                queryparams["children"] = children.join("%2C");
            }
        }
        if (travelerID != "") {
            queryparams["guestId"] = travelerID;

        }
        if (errors.length > 0) {
            return {
                "status": "failed",
                "errors": errors
            }
        } else {
            const options = { method: 'GET', headers: { accept: 'application/json', 'X-API-Key': this.apiKey } }
            const query = decodeURIComponent(new URLSearchParams(queryparams).toString());
            const URL = this.serviceURL + `/hotels?${query}`;
            const response = await fetch(URL, options);
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
    }
    /**
     * The Full Rates API is to search and return all available rooms along with its rates, cancellation policies for a list of hotel ID's based on the search dates.
    For each hotel ID, all available room information is returned.
    The API also has a built in loyalty rewards system. The system rewards return users who have made prior bookings.
    If the search is coming from a known guest ID, the guest level is also returned along with the pricing that's appropriate for the guest level.
    If it is a new user, the guest ID will be generated at the time of the first confirmed booking.
     *
     * @param {string} checkin - Checkin date in YYYY-MM-DD format.
     * @param {string} checkout - Checkout date in YYYY-MM-DD format.
     * @param {string} currency - Ex: USD - EUR - MAD.
     * @param {string} guestNationality - Guest nationality should be an ISO2 country code : US - FR.
     * @param {array} hotelIdsList - An array of hotel IDs.
     * @param {number} adults - Number of adult guests staying.
     * @param {array} children - List of the ages of children staying Ex : [2,4] = 2 years old and 4 years old.
     * @param {string} travelerID - Unique traveler ID if available, this is optional.
     * @returns {object} - The result of the operation.
     */
    async getFullRates(checkin, checkout, currency, guestNationality, hotelIdsList, adults, children = "", travelerID = "") {
        let errors = [];
        let queryparams = {};
        if (checkin == "" || checkin === undefined) {
            errors.push("Checkin date is required");
        } else {
            queryparams["checkin"] = checkin;
        }
        if (checkout == "" || checkout === undefined) {
            errors.push("Checkout date is required");
        } else {
            queryparams["checkout"] = checkout;
        }
        if (adults == "" || adults === undefined) {
            errors.push("Number of adults is required");
        } else {
            if (isNaN(parseInt(adults)) || !isFinite(adults)) {
                errors.push("Adults must be a number");
            } else {
                queryparams["adults"] = adults;
            }
        }
        if (currency == "") {
            currency = "USD";
        }
        queryparams["currency"] = currency;

        if (guestNationality == "") {
            guestNationality = "US";
        }

        queryparams["guestNationality"] = guestNationality;

        if (!Array.isArray(hotelIdsList)) {
            errors.push("The hotel ids list must be an array");
        } else {
            queryparams["hotelIds"] = hotelIdsList.join("%2C");
        }

        if (children != "") {
            if (!Array.isArray(children)) {
                errors.push("Children must be an array of ages, ex: [2,8]");
            } else {
                queryparams["children"] = children.join("%2C");
            }
        }
        if (travelerID != "") {
            queryparams["guestId"] = travelerID;

        }
        if (errors.length > 0) {
            return {
                "status": "failed",
                "errors": errors
            }
        } else {
            const options = { method: 'GET', headers: { accept: 'application/json', 'X-API-Key': this.apiKey } }
            const query = decodeURIComponent(new URLSearchParams(queryparams).toString());
            const URL = this.serviceURL + `/hotels/rates?${query}`;
            const response = await fetch(URL, options);
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
    }
    /**
     * This API is used to confirm if the room and rates for the search criterion. The input to the endpoint is a specific rate Id coming from the GET hotel full rates availability API.
        In response, the API generates a prebook Id, a new rate Id and contains information if price, cancellation policy or boarding information has changed.
     *
     * @param {string} rateId - Rate id retrieved from rates response.
     * @returns {object} - The result of the operation.
     */
    async preBook(rateId) {
        let errors = [];
        if (rateId == "" || rateId === undefined) {
            errors.push("The rate ID is required");
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
            body: JSON.stringify({
                rateId: rateId
            })
        };
        const response = await fetch(this.serviceURL + '/rates/prebook', options)
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
     * This API confirms a booking when the prebook Id and the rate Id from the pre book stage along with the guest and payment information are passed.

    The guest information is an object that should include the guest first name, last name and email.

    The payment information is an object that should include the name, credit card number, expiry and CVC number.

    The response will confirm the booking along with a booking Id and a hotel confirmation code. It will also include the booking details including the dates, price and the cancellation policies.
     *
     * @param {string} prebookId - prebook id retrived from prebook response.
     * @param {object} guestInfo - Format : {guestFirstName: 'Kim', guestLastName: 'James', guestEmail: 'test@nlite.ml'}.
     * @param {string} paymentMethod - Should be STRIPE_TOKEN or CREDIT_CARD.
     * @param {string} holderName - The holder name
     * @param {object} paymentInfo - If STRIPE_TOKEN is selected then {"token":YOUR_STRIPE_TOKEN}, if CREDIT_CARD is select then {"card_number" : "4242424242424242","exp_month":11,exp_year:"23","cvc":123}
     * @returns {object} - The result of the operation.
     */
    async book(prebookId, guestInfo, paymentMethod, holderName, paymentInfo) {
        let errors = [];
        let payment = {};
        if (prebookId == "" || prebookId === undefined) {
            errors.push("The prebook ID is required");
        }
        if (guestInfo == "" || guestInfo === undefined || typeof guestInfo !== 'object') {
            errors.push("Invalid guestInfo, it should be in this format : {guestFirstName: 'Kim', guestLastName: 'James', guestEmail: 'test@nlite.ml'}");
        } else {
            if (!guestInfo.hasOwnProperty('guestFirstName') || !guestInfo.hasOwnProperty('guestLastName') || !guestInfo.hasOwnProperty('guestEmail')) {
                errors.push("Invalid guestInfo, it should be in this format : {guestFirstName: 'Kim', guestLastName: 'James', guestEmail: 'test@nlite.ml'}");
            }
        }
        if (paymentMethod == "" || paymentMethod === undefined) {
            errors.push("Payment Method is required");
        } else {
            if (!["CREDIT_CARD", "STRIPE_TOKEN"].includes(paymentMethod)) {
                errors.push("Available Payment Method are : CREDIT_CARD and STRIPE_TOKEN");
            } else {
                payment["method"] = paymentMethod;
            }
        }
        if (holderName == "" || holderName === undefined) {
            errors.push("Holder name is required");
        } else {
            payment["holderName"] = holderName;
        }
        if (paymentMethod == "CREDIT_CARD") {
            if (paymentInfo != "" && paymentInfo !== undefined && typeof paymentInfo === 'object') {
                if (!paymentInfo.hasOwnProperty('card_number') || !paymentInfo.hasOwnProperty('exp_month') || !paymentInfo.hasOwnProperty('exp_year') || !paymentInfo.hasOwnProperty('cvc')) {
                    errors.push('The paymentInfo object is invalid, it should be in this format: {"card_number" : "4242424242424242","exp_month":11,exp_year:"23","cvc":123}');
                } else {
                    payment["number"] = paymentInfo.card_number;
                    payment["expireDate"] = paymentInfo.exp_month + "/" + paymentInfo.exp_year;
                    payment["cvc"] = paymentInfo.cvc + "";
                }
            } else {
                errors.push('The paymentInfo object should in this format: {"card_number" : "4242424242424242","exp_month":11,exp_year:"23","cvc":123}');
            }
        } else if (paymentInfo == "STRIPE_TOKEN") {
            if (paymentInfo != "" && paymentInfo !== undefined && typeof paymentInfo === 'object') {
                if (!paymentInfo.hasOwnProperty('token')) {
                    errors.push('The paymentInfo object is invalid, it should be in this format:{"token":YOUR_STRIPE_TOKEN}');
                } else {
                    payment["token"] = paymentInfo.token;
                }
            } else {
                errors.push('The paymentInfo object should in this format: {"token":YOUR_STRIPE_TOKEN}');
            }
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
            body: JSON.stringify({
                prebookId: prebookId,
                guestInfo: guestInfo,
                payment: payment
            })
        };
        const response = await fetch(this.serviceURL + '/rates/book', options)
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
     * The API returns the list of booking Id's for a given guest Id.
     *
     * @param {string} guestId - The Guest Id of the user.
     * @returns {object} - The result of the operation.
     */
    async getBookingListByGuestId(guestId) {
        let errors = [];
        if (guestId == "" || guestId === undefined) {
            errors.push("The guest ID is required");
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
        const response = await fetch(this.serviceURL + '/bookings?guestId=' + guestId, options)
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
    async retrievedBooking(bookingId) {
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
        const response = await fetch(this.serviceURL + '/bookings/' + bookingId, options)
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
        const response = await fetch(this.serviceURL + '/bookings/' + bookingId, options)
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
    * The API returns all available currency codes along with its name and the list of supported countries that the currency applies to.
    * @returns {array} - The result of the operation.
    */
    async getCurrencies() {
        let errors = [];

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
    * The API returns a list of hotels available based on different search criterion. The minimum required information is the county code in ISO-2 format.
    * @param {string} countryCode - country code ISO-2 code - example (SG)
    * @param {string} cityName - name of the city
    * @param {number} offset - specifies the number of rows to skip before starting to return rows
    * @param {number} limit - limit number of results (max 1000)
    * @param {string} longitude - longitude geo coordinates
    * @param {string} latitude - latitude geo coordinates
    * @param {number} distance - in meters (min 1000m)
    * @returns {array} - The result of the operation.
    */
    async getHotels(countryCode, cityName, offset, limit, longitude, latitude, distance) {
        let errors = [];
        let paramQuery = {};
        if (countryCode == "" || countryCode === undefined) {
            errors.push("Country code is required");
        } else {
            paramQuery['countryCode'] = countryCode;
        }
        if (cityName == "" || cityName === undefined) {
            errors.push("City name is required");
        } else {
            paramQuery['cityName'] = cityName;
        }

        if (offset != "" && offset !== undefined) {
            paramQuery['offset'] = offset;
        }
        if (limit != "" && limit !== undefined) {
            paramQuery['limit'] = limit;
        }
        if (longitude != "" && longitude !== undefined) {
            paramQuery['longitude'] = longitude;
        }
        if (latitude != "" && latitude !== undefined) {
            paramQuery['latitude'] = latitude;
        }
        if (distance != "" && distance !== undefined) {
            paramQuery['distance'] = distance;
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
        const query = decodeURIComponent(new URLSearchParams(paramQuery).toString());
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
    * The API returns the list of countries available along with its ISO-2 code.
    * @returns {array} - The result of the operation.
    */
    async getCountries() {
        let errors = [];

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
        let errors = [];

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
    * @param {string} email - Guest email
    * @returns {array} - The result of the operation.
    */
    async getGuestsIds(email = "") {

        let paramQuery = {};

        if (email != "" && email !== undefined) {
            paramQuery['email'] = email;
        }

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-API-Key': this.apiKey
            },
        };
        const query = decodeURIComponent(new URLSearchParams(paramQuery).toString());
        const response = await fetch(this.serviceURL + '/guests?' + query, options)
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
}

function getInstance(APIKEY) {
    return new LiteApi(APIKEY);
}

module.exports = getInstance;
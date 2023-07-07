/**
 * liteAPI
 * The **liteAPI** can be used to to do the following  Get room rates & availability for a set of hotels Select a specific hotel with room availability and make a booking Manage the bookings - retrieve and cancel existing bookings Get static content for hotels, search hotels by destination
 *
 *
 */

import ApiClient from '../ApiClient';

/**
 * The RatesBookPostRequestPayment model module.
 * @module model/RatesBookPostRequestPayment
 * @version 2.0.0
 */
class RatesBookPostRequestPayment {
    /**
     * Constructs a new <code>RatesBookPostRequestPayment</code>.
     * @alias module:model/RatesBookPostRequestPayment
     * @param holderName {Object} 
     * @param method {module:model/RatesBookPostRequestPayment.MethodEnum} 
     */
    constructor(holderName, method) { 
        
        RatesBookPostRequestPayment.initialize(this, holderName, method);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, holderName, method) { 
        obj['holderName'] = holderName;
        obj['method'] = method;
    }

    /**
     * Constructs a <code>RatesBookPostRequestPayment</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/RatesBookPostRequestPayment} obj Optional instance to populate.
     * @return {module:model/RatesBookPostRequestPayment} The populated <code>RatesBookPostRequestPayment</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new RatesBookPostRequestPayment();

            if (data.hasOwnProperty('holderName')) {
                obj['holderName'] = ApiClient.convertToType(data['holderName'], Object);
            }
            if (data.hasOwnProperty('number')) {
                obj['number'] = ApiClient.convertToType(data['number'], Object);
            }
            if (data.hasOwnProperty('expireDate')) {
                obj['expireDate'] = ApiClient.convertToType(data['expireDate'], Object);
            }
            if (data.hasOwnProperty('cvc')) {
                obj['cvc'] = ApiClient.convertToType(data['cvc'], Object);
            }
            if (data.hasOwnProperty('method')) {
                obj['method'] = ApiClient.convertToType(data['method'], Object);
            }
            if (data.hasOwnProperty('token')) {
                obj['token'] = ApiClient.convertToType(data['token'], Object);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>RatesBookPostRequestPayment</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>RatesBookPostRequestPayment</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of RatesBookPostRequestPayment.RequiredProperties) {
            if (!data[property]) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }

        return true;
    }


}

RatesBookPostRequestPayment.RequiredProperties = ["holderName", "method"];

/**
 * @member {Object} holderName
 */
RatesBookPostRequestPayment.prototype['holderName'] = undefined;

/**
 * @member {Object} number
 */
RatesBookPostRequestPayment.prototype['number'] = undefined;

/**
 * @member {Object} expireDate
 */
RatesBookPostRequestPayment.prototype['expireDate'] = undefined;

/**
 * @member {Object} cvc
 */
RatesBookPostRequestPayment.prototype['cvc'] = undefined;

/**
 * @member {module:model/RatesBookPostRequestPayment.MethodEnum} method
 */
RatesBookPostRequestPayment.prototype['method'] = undefined;

/**
 * @member {Object} token
 */
RatesBookPostRequestPayment.prototype['token'] = undefined;





/**
 * Allowed values for the <code>method</code> property.
 * @enum {Object}
 * @readonly
 */
RatesBookPostRequestPayment['MethodEnum'] = {

    /**
     * value: "CREDIT_CARD"
     * @const
     */
    "CREDIT_CARD": "CREDIT_CARD",

    /**
     * value: "STRIPE_TOKEN"
     * @const
     */
    "STRIPE_TOKEN": "STRIPE_TOKEN"
};



export default RatesBookPostRequestPayment;


/**
 * liteAPI
 * The **liteAPI** can be used to to do the following  Get room rates & availability for a set of hotels Select a specific hotel with room availability and make a booking Manage the bookings - retrieve and cancel existing bookings Get static content for hotels, search hotels by destination
 *
 *
 */

import ApiClient from '../ApiClient';
import RatesBookPostRequestGuestInfo from './RatesBookPostRequestGuestInfo';
import RatesBookPostRequestPayment from './RatesBookPostRequestPayment';

/**
 * The RatesBookPostRequest model module.
 * @module model/RatesBookPostRequest
 * @version 2.0.0
 */
class RatesBookPostRequest {
    /**
     * Constructs a new <code>RatesBookPostRequest</code>.
     * @alias module:model/RatesBookPostRequest
     * @param prebookId {Object} prebook id retrived from prebook response
     * @param guestInfo {module:model/RatesBookPostRequestGuestInfo} 
     */
    constructor(prebookId, guestInfo) { 
        
        RatesBookPostRequest.initialize(this, prebookId, guestInfo);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, prebookId, guestInfo) { 
        obj['prebookId'] = prebookId;
        obj['guestInfo'] = guestInfo;
    }

    /**
     * Constructs a <code>RatesBookPostRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/RatesBookPostRequest} obj Optional instance to populate.
     * @return {module:model/RatesBookPostRequest} The populated <code>RatesBookPostRequest</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new RatesBookPostRequest();

            if (data.hasOwnProperty('prebookId')) {
                obj['prebookId'] = ApiClient.convertToType(data['prebookId'], Object);
            }
            if (data.hasOwnProperty('guestInfo')) {
                obj['guestInfo'] = RatesBookPostRequestGuestInfo.constructFromObject(data['guestInfo']);
            }
            if (data.hasOwnProperty('payment')) {
                obj['payment'] = RatesBookPostRequestPayment.constructFromObject(data['payment']);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>RatesBookPostRequest</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>RatesBookPostRequest</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of RatesBookPostRequest.RequiredProperties) {
            if (!data[property]) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // validate the optional field `guestInfo`
        if (data['guestInfo']) { // data not null
          RatesBookPostRequestGuestInfo.validateJSON(data['guestInfo']);
        }
        // validate the optional field `payment`
        if (data['payment']) { // data not null
          RatesBookPostRequestPayment.validateJSON(data['payment']);
        }

        return true;
    }


}

RatesBookPostRequest.RequiredProperties = ["prebookId", "guestInfo"];

/**
 * prebook id retrived from prebook response
 * @member {Object} prebookId
 */
RatesBookPostRequest.prototype['prebookId'] = undefined;

/**
 * @member {module:model/RatesBookPostRequestGuestInfo} guestInfo
 */
RatesBookPostRequest.prototype['guestInfo'] = undefined;

/**
 * @member {module:model/RatesBookPostRequestPayment} payment
 */
RatesBookPostRequest.prototype['payment'] = undefined;






export default RatesBookPostRequest;


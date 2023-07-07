/**
 * liteAPI
 * The **liteAPI** can be used to to do the following  Get room rates & availability for a set of hotels Select a specific hotel with room availability and make a booking Manage the bookings - retrieve and cancel existing bookings Get static content for hotels, search hotels by destination
 *
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD.
    define(['expect.js', process.cwd()+'/src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require(process.cwd()+'/src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.LiteApi);
  }
}(this, function(expect, LiteApi) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new LiteApi.RatesBookPostRequestGuestInfo();
  });

  var getProperty = function(object, getter, property) {
    // Use getter method if present; otherwise, get the property directly.
    if (typeof object[getter] === 'function')
      return object[getter]();
    else
      return object[property];
  }

  var setProperty = function(object, setter, property, value) {
    // Use setter method if present; otherwise, set the property directly.
    if (typeof object[setter] === 'function')
      object[setter](value);
    else
      object[property] = value;
  }

  describe('RatesBookPostRequestGuestInfo', function() {
    it('should create an instance of RatesBookPostRequestGuestInfo', function() {
      // uncomment below and update the code to test RatesBookPostRequestGuestInfo
      //var instance = new LiteApi.RatesBookPostRequestGuestInfo();
      //expect(instance).to.be.a(LiteApi.RatesBookPostRequestGuestInfo);
    });

    it('should have the property guestFirstName (base name: "guestFirstName")', function() {
      // uncomment below and update the code to test the property guestFirstName
      //var instance = new LiteApi.RatesBookPostRequestGuestInfo();
      //expect(instance).to.be();
    });

    it('should have the property guestLastName (base name: "guestLastName")', function() {
      // uncomment below and update the code to test the property guestLastName
      //var instance = new LiteApi.RatesBookPostRequestGuestInfo();
      //expect(instance).to.be();
    });

    it('should have the property guestEmail (base name: "guestEmail")', function() {
      // uncomment below and update the code to test the property guestEmail
      //var instance = new LiteApi.RatesBookPostRequestGuestInfo();
      //expect(instance).to.be();
    });

  });

}));
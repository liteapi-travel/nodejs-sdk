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
    instance = new LiteApi.RatesBookPostRequest();
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

  describe('RatesBookPostRequest', function() {
    it('should create an instance of RatesBookPostRequest', function() {
      // uncomment below and update the code to test RatesBookPostRequest
      //var instance = new LiteApi.RatesBookPostRequest();
      //expect(instance).to.be.a(LiteApi.RatesBookPostRequest);
    });

    it('should have the property prebookId (base name: "prebookId")', function() {
      // uncomment below and update the code to test the property prebookId
      //var instance = new LiteApi.RatesBookPostRequest();
      //expect(instance).to.be();
    });

    it('should have the property guestInfo (base name: "guestInfo")', function() {
      // uncomment below and update the code to test the property guestInfo
      //var instance = new LiteApi.RatesBookPostRequest();
      //expect(instance).to.be();
    });

    it('should have the property payment (base name: "payment")', function() {
      // uncomment below and update the code to test the property payment
      //var instance = new LiteApi.RatesBookPostRequest();
      //expect(instance).to.be();
    });

  });

}));

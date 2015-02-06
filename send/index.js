"use strict";

var dispatcher = require("../");
var assign     = require("object-assign");

/** send
 *
 * Send a payload into the dispatcher
 *
 * @params {string} actionType
 * @params {?object} data
 * @params {?string} source
 */

module.exports = function(actionType, data, source) {
  var _data   = data   || {};
  var _source = source || "VIEW_ACTION";

  dispatcher.dispatch({
    source : _source,
    action : assign({actionType: actionType}, _data)
  })
}

"use strict";

var dispatcher   = require("../");
var EventEmitter = require("events").EventEmitter;
var assign       = require("object-assign");

function Projection(NS) {
  this.NS = NS || "GLOBAL";
}

Projection.prototype = assign({}, EventEmitter.prototype, {

  broadcast   : function()   { this.emit(this.NS); },
  subscribe   : function(fn) { this.on(this.NS, fn); },
  unsubscribe : function(fn) { this.removeListener(this.NS, fn); },

  register : function(NS, fn) {
    var _this = this;
    dispatcher.register(function(payload) {
      if (payload.action.actionType !== NS) return;
      if (fn && typeof fn === "function") fn(payload);
      _this.broadcast();
    });
  },

  derive : function(store, fn) {
    var _this = this;
    if (store.subscribe !== undefined) return;
    store.subscribe(function() {
      if (fn && typeof fn === "function") fn();
      _this.broadcast();
    });
  }

});

module.exports = Projection;

"use strict";

module.exports = function(state, stores) {
  if (stores.length === undefined) stores = [stores];

  return {

    getInitialState : state,

    update: function() {
      this.setState(state());
    },

    componentWillMount: function() {
      stores.forEach(function(d) {
        d.subscribe(this.update);
      }, this);
    },

    componentWillUnmount: function() {
      stores.forEach(function(d) {
        d.unsubscribe(this.update);
      }, this);
    }

  };
}

jest.dontMock("../");

describe("subscribe", function() {
  var state, store1, store2, subscribe, subscription;


  beforeEach(function() {
    subscribe = require("../");
    state     = jest.genMockFn();

    store1 = {
      subscribe   : jest.genMockFn(),
      unsubscribe : jest.genMockFn()
    };

    store2 = {
      subscribe   : jest.genMockFn(),
      unsubscribe : jest.genMockFn()
    };

  });

  it("can subscribe to a single store", function() {
    var subscription = subscribe(state, store1);

    subscription.componentWillMount();
    expect(store1.subscribe.mock.calls.length).toBe(1);
    expect(store2.subscribe.mock.calls.length).toBe(0);

    subscription.componentWillUnmount();
    expect(store1.unsubscribe.mock.calls.length).toBe(1);
    expect(store2.unsubscribe.mock.calls.length).toBe(0);
  });

  it("can subscribe to multiple stores", function() {
    var subscription = subscribe(state, [store1, store2]);

    subscription.componentWillMount();
    expect(store1.subscribe.mock.calls.length).toBe(1);
    expect(store2.subscribe.mock.calls.length).toBe(1);

    subscription.componentWillUnmount();
    expect(store1.unsubscribe.mock.calls.length).toBe(1);
    expect(store2.unsubscribe.mock.calls.length).toBe(1);
  });
});

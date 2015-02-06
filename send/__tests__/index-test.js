jest.dontMock("../");
jest.dontMock("object-assign");

describe("send", function() {
  var dispatcher, send;

  beforeEach(function() {
    send       = require("../");
    dispatcher = require("../../");
  })

  it("has proper default with only actionType", function() {
    var actionType = "Bob";
    var data       = {};
    var source     = "VIEW_ACTION";

    send(actionType);
    var payload = dispatcher.dispatch.mock.calls[0][0];

    expect(payload.source).toBe(source);
    expect(payload.action.actionType).toBe(actionType);
  });

  it("accepts some data as well as the actionType", function() {
    var actionType = "Bob";
    var data       = {uuid: "qwerty"};
    var source     = "VIEW_ACTION";

    send(actionType, data);
    var payload = dispatcher.dispatch.mock.calls[0][0];

    expect(payload.source).toBe(source);
    expect(payload.action.actionType).toBe(actionType);
    expect(payload.action.uuid).toBe(data.uuid);
  });

  it("accepts a source as well as an action type and some data", function() {
    var actionType = "Bob";
    var data       = {uuid: "qwerty"};
    var source     = "SERVER_ACTION";

    send(actionType, data, source);
    var payload = dispatcher.dispatch.mock.calls[0][0];

    expect(payload.source).toBe(source);
    expect(payload.action.actionType).toBe(actionType);
    expect(payload.action.uuid).toBe(data.uuid);
  });

});

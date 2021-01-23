const { VectorMessage } = require("./VectorMessage");
const { VectorEvent } = require("./VectorEvent.js");

function VectorNode(id) {
  this.id = id;
  this.events = [new VectorEvent()];
}

VectorNode.prototype.getEvents = function () {
  return this.events;
};

VectorNode.prototype.getLastEvent = function () {
  const events = this.getEvents();
  return events[events.length - 1];
};

VectorNode.prototype.act = function () {
  const events = this.getEvents();
  const lastEvent = this.getLastEvent();
  events.push(lastEvent.incrementValue(this.id));
};

VectorNode.prototype.receiveMessage = function (vectorMessage) {
  this.events.push(this.getLastEvent().reconcile(this.id, vectorMessage.getEvent()));
};
VectorNode.prototype.createMessage = function (message) {
  const event = this.getLastEvent().incrementValue(this.id);
  this.events.push(event);
  return new VectorMessage(event, message);
};

module.exports = { VectorNode };

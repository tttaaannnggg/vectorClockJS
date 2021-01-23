function VectorMessage(vectorEvent, message) {
  this.message = message;
  this.event = vectorEvent;
}

VectorMessage.prototype.getEvent = function () {
  return this.event;
};

module.exports = {VectorMessage}

const { VectorNode } = require("./VectorNode");

function VectorClock() {
  this.nodes = [];
}

VectorClock.prototype.addNode = function () {
  const nodes = this.getNodes();
  return nodes.push(new VectorNode(nodes.length));
};

VectorClock.prototype.getNodes = function () {
  return this.nodes;
};

VectorClock.prototype.act = function (nodeID) {
  const nodes = this.getNodes();
  return nodeID && nodes[nodeID] && nodes[nodeID].act();
};

VectorClock.prototype.getNode = function (nodeID) {
  const nodes = this.getNodes();
  if (!nodes[nodeID]) {
    nodes[nodeID] = new VectorNode();
  }
  return nodes[nodeID];
};

VectorClock.prototype.sendMessage = function (senderID, recipientID, message) {
  const sender = this.getNode(senderID);
  const recipient = this.getNode(recipientID);
  const package = sender.createMessage(message);
  recipient.receiveMessage(package);
};

module.exports = { VectorClock };

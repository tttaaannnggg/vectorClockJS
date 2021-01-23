function VectorEvent(sourceVector = [0, 0, 0]) {
  this.values = [...sourceVector];
}

VectorEvent.prototype.getValues = function () {
  return this.values;
};

VectorEvent.prototype.getValue = function (nodeID) {
  return this.values[nodeID] || 0;
};

VectorEvent.prototype.incrementValue = function (nodeID) {
  const values = this.getValues();
  const resultingEvent = new VectorEvent(values);
  resultingEvent.getValues()[nodeID] = this.getValue(nodeID) + 1;
  return resultingEvent;
};

VectorEvent.prototype.reconcile = function (nodeID, otherEvent) {
  const theseValues = this.getValues();
  const otherValues = otherEvent.getValues();
  const reconciledValues = mergeValues(theseValues, otherValues);
  const reconciledEvent = new VectorEvent(reconciledValues);
  return reconciledEvent.incrementValue(nodeID);
};

const mergeValues = (valuesA, valuesB) => {
  const mergedValues = [];
  for (let i = 0; i < Math.max(valuesA.length, valuesB.length); i++) {
    mergedValues.push(Math.max(valuesA[i] || 0, valuesB[i] || 0));
  }
  return mergedValues;
};
module.exports = { VectorEvent };

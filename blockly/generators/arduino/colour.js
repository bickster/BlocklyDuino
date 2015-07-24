goog.provide('Blockly.Arduino.colour');

goog.require('Blockly.Arduino');

Blockly.Arduino['colour_picker'] = function(block) {
  // Colour picker.
  var code = '\'' + block.getFieldValue('COLOUR') + '\'';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

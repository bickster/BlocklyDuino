/*
goog.provide('Blockly.Blocks.custom');

goog.require('Blockly.Blocks');

Blockly.Blocks['base_delay_example'] = {
  helpUrl: 'http://arduino.cc/en/Reference/delay',
  init: function() {
    
this.appendValueInput("color")
        .appendField("Color");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
*/

goog.provide('Blockly.Blocks.neopixels');

goog.require('Blockly.Blocks');

Blockly.Blocks['neopixel'] = {
  init: function() {
    this.appendValueInput("COLOR")
        .appendField("NeoPixel")
        .appendField(new Blockly.FieldImage("https://learn.adafruit.com/system/assets/assets/000/010/668/medium800/leds_neo-closeup.jpg?1377729545", 30, 30, "*"))
        .appendField("color");
    this.appendValueInput("INDEX")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("index");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['sequential_animation'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Sequential Animation");
    this.appendValueInput("COLOR")
        .appendField("Color");
    this.appendValueInput("START_INDEX")
        .setCheck("Number")
        .appendField("Start Position");
    this.appendValueInput("END_INDEX")
        .setCheck("Number")
        .appendField("End Position");
    this.appendValueInput("DELAY")
        .setCheck("Number")
        .appendField("Delay");
    this.appendDummyInput()
        .appendField(new Blockly.FieldCheckbox("TRUE"), "LIGHTS_TRAIL")
        .appendField("Lights Trail");
    this.appendDummyInput()
        .appendField(new Blockly.FieldCheckbox("TRUE"), "CLEAR_WHEN_DONE")
        .appendField("Clear When Done");
    this.setInputsInline(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(0);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['neopixels'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("NeoPixels");
    this.appendValueInput("NUMBER_OF_PIXELS")
        .setCheck("Number")
        .appendField("# of Pixels");
    this.appendValueInput("PIN_NUMBER")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("PIN#");
    this.appendStatementInput("NeoPixelStatement");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

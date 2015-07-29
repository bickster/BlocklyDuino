/*
goog.provide('Blockly.Arduino.custom');

goog.require('Blockly.Arduino');


Blockly.Arduino.base_delay_example = function() {
   Blockly.Arduino.definitions_['define_neo'] = '#include <Adafruit_NeoPixel.h>\n';
   Blockly.Arduino.setups_['setup_neo'] =   
'// This is for Trinket 5V 16MHz, you can remove these three lines if you are not using a Trinket\n #if defined (__AVR_ATtiny85__)\n if (F_CPU == 16000000)\n clock_prescale_set(clock_div_1);\n #endif\n // End of trinket special code\n\n pixels.begin();\n // This initializes the NeoPixel library.;\n'

   var value_color = Blockly.Arduino.valueToCode(this, 'color', Blockly.Arduino.ORDER_ATOMIC) || '#000000';
  //var delay_time = Blockly.Arduino.valueToCode(this, 'color', Blockly.Arduino.ORDER_ATOMIC) || '1000'
  var code = 'delay(' + value_color + ');\n';
  return code;
};
*/
goog.provide('Blockly.Arduino.neopixels');

goog.require('Blockly.Arduino');

function hexToRgb(hex) {
    hex = hex.replace(/[^0-9A-F]/gi, '');
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return r + "," + g + "," + b;
}

Blockly.Arduino['neopixel'] = function(block) {
  var value_color = Blockly.Arduino.valueToCode(block, 'COLOR', Blockly.Arduino.ORDER_ATOMIC) || '#000000';
  //alert(value_color); 
  var value_index = Blockly.Arduino.valueToCode(block, 'INDEX', Blockly.Arduino.ORDER_ATOMIC); 
  var code = '// pixels.Color takes RGB values, from 0,0,0 up to 255,255,255\n';
  code += 'pixels.setPixelColor('+value_index+', pixels.Color('+hexToRgb(value_color)+'));\n';
  code += 'pixels.show(); // This sends the updated pixel color to the hardware.\n'; 
  
  return code;
};

Blockly.Arduino['sequential_animation'] = function(block) {
  var value_color = Blockly.Arduino.valueToCode(block, 'COLOR', Blockly.Arduino.ORDER_ATOMIC);
  var value_start_index = Blockly.Arduino.valueToCode(block, 'START_INDEX', Blockly.Arduino.ORDER_ATOMIC);
  var value_end_index = Blockly.Arduino.valueToCode(block, 'END_INDEX', Blockly.Arduino.ORDER_ATOMIC);
  var value_delay = Blockly.Arduino.valueToCode(block, 'DELAY', Blockly.Arduino.ORDER_ATOMIC);
  var checkbox_lights_trail = block.getFieldValue('LIGHTS_TRAIL') == 'TRUE'; 
  var checkbox_clear_when_done = block.getFieldValue('CLEAR_WHEN_DONE') == 'TRUE';

  var code ='';
  if (value_start_index < value_end_index)   
    code +=  'for (int cv='+value_start_index+';cv <= '+value_end_index+';cv++) {\n';
  else
    code +=  'for (int cv='+value_start_index+';cv >= '+value_end_index+';cv--) {\n'; 
  code +=    '  pixels.setPixelColor(cv, pixels.Color('+hexToRgb(value_color)+'));\n';
  code +=    '  pixels.show(); // This sends the updated pixel color to the hardware.\n';
  code +=    '  delay('+value_delay+');\n';
  if (checkbox_lights_trail == false) {
    code +=  '  pixels.setPixelColor(cv, pixels.Color(0,0,0));\n';
    code +=  '  pixels.show(); // This sends the updated pixel color to the hardware.\n';
  }
  code +=    '}\n';

  if (checkbox_clear_when_done == true) {
    if (value_start_index < value_end_index)
      code +=  'for (int cv='+value_start_index+';cv <= '+value_end_index+';cv++) {\n';
    else
      code +=  'for (int cv='+value_start_index+';cv >= '+value_end_index+';cv--) {\n';
    code +=  '  pixels.setPixelColor(cv, pixels.Color(0,0,0));\n';
    code +=  '  pixels.show(); // This sends the updated pixel color to the hardware.\n';
    code +=  '}\n';  
  }

  return code;
};

Blockly.Arduino['neopixels'] = function(block) {
  Blockly.Arduino.definitions_['define_neo'] = '#include <Adafruit_NeoPixel.h>\n';
  var value_number_of_pixels = Blockly.Arduino.valueToCode(block, 'NUMBER_OF_PIXELS', Blockly.Arduino.ORDER_ATOMIC); 
  var value_pin_number = Blockly.Arduino.valueToCode(block, 'PIN_NUMBER', Blockly.Arduino.ORDER_ATOMIC); 
  Blockly.Arduino.setups_['setup_neo'] =
'// This is for Trinket 5V 16MHz, you can remove these three lines if you are not using a Trinket\n #if defined (__AVR_ATtiny85__)\n if (F_CPU == 16000000)\n clock_prescale_set(clock_div_1);\n #endif\n // End of trinket special code\n\n pixels.begin(); // This initializes the NeoPixel library.;\n pixels.setPin('+value_pin_number+');\n pixels.updateLength('+value_number_of_pixels+');\n'
  Blockly.Arduino.definitions_['var_neopixel'] = 'Adafruit_NeoPixel pixels = Adafruit_NeoPixel(0);\n';
  
  var statements_neopixelstatement = Blockly.Arduino.statementToCode(block, 'NeoPixelStatement');
 
  var code = statements_neopixelstatement; //value_number_of_pixels;  
  return code;
};

Blockly.Arduino['split_wave_animation'] = function(block) {
  var value_color = Blockly.Arduino.valueToCode(block, 'COLOR', Blockly.Arduino.ORDER_ATOMIC);
  var value_start_index = Blockly.Arduino.valueToCode(block, 'START_INDEX', Blockly.Arduino.ORDER_ATOMIC);
  var value_end_index = Blockly.Arduino.valueToCode(block, 'END_INDEX', Blockly.Arduino.ORDER_ATOMIC);
  var value_delay = Blockly.Arduino.valueToCode(block, 'DELAY', Blockly.Arduino.ORDER_ATOMIC);
  var value_number_of_splits = Blockly.Arduino.valueToCode(block, 'NUMBER_OF_SPLITS', Blockly.Arduino.ORDER_ATOMIC);
  var checkbox_lights_trail = block.getFieldValue('LIGHTS_TRAIL') == 'TRUE';
  var checkbox_clear_when_done = block.getFieldValue('CLEAR_WHEN_DONE') == 'TRUE';

  var length = value_end_index - value_start_index;  
  var splits = length / value_number_of_splits; 
  var code ='';

  code +=    'for (int cv=0;cv < '+splits+';'+'cv++) {\n';
  code +=    '  for (int i=0; i < '+value_number_of_splits+';i++) {\n';
  code +=    '    pixels.setPixelColor((i*'+splits+')+cv, pixels.Color('+hexToRgb(value_color)+'));\n';
  code +=    '    pixels.show(); // This sends the updated pixel color to the hardware.\n';
  code +=    '  }\n';
  code +=    '  delay('+value_delay+');\n'; 
  if (checkbox_lights_trail == false) {
    code +=  '  for (int i=0; i < '+value_number_of_splits+';i++) {\n';
    code +=  '    pixels.setPixelColor((i*'+splits+')+cv, pixels.Color(0,0,0));\n';
    code +=  '    pixels.show(); // This sends the updated pixel color to the hardware.\n';
    code +=  '  }\n';  
  }
  code +=    '}\n';
  if (checkbox_clear_when_done == true) {
    code +=  'for (int cv='+value_start_index+';cv < '+value_end_index+';cv++) {\n';
    code +=  '  pixels.setPixelColor(cv, pixels.Color(0,0,0));\n';
    code +=  '  pixels.show(); // This sends the updated pixel color to the hardware.\n';
    code +=  '}\n';
  }
  return code;
};

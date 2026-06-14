import type { Product } from '../context/CartContext';
import breadboard400 from '../../imports/Products/Products/400 holes Breadboard.png';
import breadboard830 from '../../imports/Products/Products/830 Holes Breadboard.png';
import timer555 from '../../imports/Products/Products/555 Timer.png';
import sevenSegment from '../../imports/Products/Products/7 Segment.png';
import logicIc from '../../imports/Products/Products/Logic IC.png';
import arduinoNano from '../../imports/Products/Products/Arduino Nano.png';
import arduinoUno from '../../imports/Products/Products/Arduino Uno.png';
import arduinoUnoR3 from '../../imports/Products/Products/Arduino Uno r3.png';
import esp32 from '../../imports/Products/Products/Esp32 38pins.png';
import esp8266 from '../../imports/Products/Products/ESP8266.png';
import esp8266Expansion from '../../imports/Products/Products/ESP8266 Expansion.png';
import gsm800 from '../../imports/Products/Products/GSM SIM800L.png';
import gsm900 from '../../imports/Products/Products/GSM Sim900A.png';
import irSensor from '../../imports/Products/Products/IR Sensor.png';
import lineTracking from '../../imports/Products/Products/Line tracking sensor.png';
import mq2 from '../../imports/Products/Products/MQ 2 Smoke Detector.png';
import mq5 from '../../imports/Products/Products/MQ 5 Gas detector.png';
import rainSensor from '../../imports/Products/Products/Rain Drop Sensor.png';
import bluetoothModule from '../../imports/Products/Products/JDY-31 Bluetooth Module.png';
import rfidModule from '../../imports/Products/Products/RFID Module.png';
import motorDriver from '../../imports/Products/Products/Motor Driver Controller.png';
import oled from '../../imports/Products/Products/OLED 0.96.png';
import lcd from '../../imports/Products/Products/LCD 1602.png';
import buzzer from '../../imports/Products/Products/Buzzer.png';
import diodes from '../../imports/Products/Products/Diodes.png';
import electronicKit from '../../imports/Products/Products/Electronic Kit.png';
import keypad from '../../imports/Products/Products/Keypad.png';
import led from '../../imports/Products/Products/LED.png';

const productImageMap: Record<string, string> = {
  '400 holes breadboard': breadboard400,
  '830 holes breadboard': breadboard830,
  'breadboard 830': breadboard830,
  'breadboard': breadboard830,
  '555 timer': timer555,
  '7 segment': sevenSegment,
  'logic ic': logicIc,
  'arduino nano': arduinoNano,
  'arduino uno r3': arduinoUnoR3,
  'arduino uno': arduinoUno,
  'esp32': esp32,
  'esp8266 expansion': esp8266Expansion,
  'esp8266': esp8266,
  'nodemcu': esp8266,
  'gsm sim800l': gsm800,
  'gsm sim900a': gsm900,
  'ir sensor': irSensor,
  'line tracking sensor': lineTracking,
  'mq 2 smoke detector': mq2,
  'mq-2 smoke': mq2,
  'mq 5 gas detector': mq5,
  'mq-5 gas': mq5,
  'rain drop sensor': rainSensor,
  'raindrop': rainSensor,
  'jdy-31 bluetooth module': bluetoothModule,
  'bluetooth module': bluetoothModule,
  'rfid module': rfidModule,
  'rfid': rfidModule,
  'motor driver controller': motorDriver,
  'l298n': motorDriver,
  'oled': oled,
  'lcd': lcd,
  'buzzer': buzzer,
  'diodes': diodes,
  'diode': diodes,
  'electronic kit': electronicKit,
  'starter kit': electronicKit,
  'keypad': keypad,
  'led': led,
  'resistor': led,
  'capacitor': diodes,
  'transistor': logicIc,
  'jumper': breadboard400,
  'ultrasonic': irSensor,
  'dht': irSensor,
  'bmp280': irSensor,
  'mpu6050': irSensor,
  'servo': motorDriver,
  'relay': motorDriver,
  'battery': motorDriver,
  'buck converter': motorDriver,
};

export function resolveProductImage(product: Pick<Product, 'name' | 'category' | 'image'>): string {
  const key = product.name.toLowerCase().trim();
  for (const [mapKey, image] of Object.entries(productImageMap)) {
    if (key.includes(mapKey)) return image;
  }

  if (product.image && !product.image.startsWith('/src/')) {
    return product.image;
  }

  if (product.category === 'Microcontrollers') return esp32;
  if (product.category === 'Sensors') return irSensor;
  if (product.category === 'Displays') return oled;
  if (product.category === 'Power') return motorDriver;
  if (product.category === 'Connectors') return breadboard400;
  if (product.category === 'Motor Control' || product.category === 'Motors') return motorDriver;
  if (product.category === 'Tools') return electronicKit;
  if (product.category === 'Passive Components') return diodes;
  if (product.category === 'Optoelectronics') return led;
  if (product.category === 'Wireless') return bluetoothModule;
  if (product.category === 'Components') return led;

  return electronicKit;
}

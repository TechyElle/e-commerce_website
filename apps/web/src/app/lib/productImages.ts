import type { Product } from '../context/CartContext';
import breadboard400 from '../../assets/products/400 holes Breadboard.png';
import breadboard830 from '../../assets/products/830 Holes Breadboard.png';
import timer555 from '../../assets/products/555 Timer.png';
import sevenSegment from '../../assets/products/7 Segment.png';
import logicIc from '../../assets/products/Logic IC.png';
import arduinoNano from '../../assets/products/Arduino Nano.png';
import arduinoUno from '../../assets/products/Arduino Uno.png';
import arduinoUnoR3 from '../../assets/products/Arduino Uno r3.png';
import esp32 from '../../assets/products/Esp32 38pins.png';
import esp8266 from '../../assets/products/ESP8266.png';
import esp8266Expansion from '../../assets/products/ESP8266 Expansion.png';
import gsm800 from '../../assets/products/GSM SIM800L.png';
import gsm900 from '../../assets/products/GSM Sim900A.png';
import irSensor from '../../assets/products/IR Sensor.png';
import lineTracking from '../../assets/products/Line tracking sensor.png';
import mq2 from '../../assets/products/MQ 2 Smoke Detector.png';
import mq5 from '../../assets/products/MQ 5 Gas detector.png';
import rainSensor from '../../assets/products/Rain Drop Sensor.png';
import bluetoothModule from '../../assets/products/JDY-31 Bluetooth Module.png';
import rfidModule from '../../assets/products/RFID Module.png';
import motorDriver from '../../assets/products/Motor Driver Controller.png';
import oled from '../../assets/products/OLED 0.96.png';
import lcd from '../../assets/products/LCD 1602.png';
import buzzer from '../../assets/products/Buzzer.png';
import diodes from '../../assets/products/Diodes.png';
import electronicKit from '../../assets/products/Electronic Kit.png';
import keypad from '../../assets/products/Keypad.png';
import led from '../../assets/products/LED.png';

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
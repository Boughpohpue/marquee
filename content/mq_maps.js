import { MqSpeed, MqDelay } from './mq_enums.js';


export class MqMaps {
  static #speedMap = new Map([
    [MqSpeed.FAST, 3],
    [MqSpeed.NORMAL, 9],
    [MqSpeed.SLOW, 12]
  ]);
  static #delayMap = new Map([
    [MqDelay.NONE, 0],
    [MqDelay.SHORT, 1],
    [MqDelay.LONG, 3]
  ]);

  static getSpeed(speed, deflt = MqSpeed.NORMAL) {
    return this.#speedMap.has(speed)
      ? this.#speedMap.get(speed)
      : typeof speed !== "number"
        ? this.#speedMap.get(deflt)
        : speed;
  }
  static getDelay(delay, deflt = MqDelay.NONE) {
    return this.#delayMap.has(delay)
      ? this.#delayMap.get(delay)
      : typeof delay !== "number"
        ? this.#delayMap.get(deflt)
        : delay;
  }
}

export default MqMaps;

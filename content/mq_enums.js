class Enum {
  #value = undefined;
  get value() { return this.#value; }
  get valueType() { return typeof this.#value; }

  constructor(value = undefined) {
    const _ctor = this.constructor;
    if (_ctor._sealed)
      throw new Error("An Enum instance can be created only inside the enum class!");
    if (value === null || value === undefined) return;
    for (const [name, instance] of Object.entries(_ctor)) {
      if (!(instance instanceof _ctor)) continue;
      if (instance.value === value)
        throw new Error("An Enum instance with the same value already exists!");
      if (instance.valueType && instance.valueType !== typeof value)
        throw new Error("An Enum value type must be consistent across the enum class!");
    }
    this.#value = value;
    Object.freeze(this);
  }

  static parse(e) {
    if (e === undefined || e === null) return;
    let valuesType = undefined;
    const upper = typeof e === "string" ? e.toUpperCase() : undefined;
    for (const [name, instance] of Object.entries(this)) {
      if (!(instance instanceof this)) continue;
      if (upper === name.toUpperCase()) return instance;
      if (instance.value === e) return instance;
      if (!valuesType && instance.valueType) valuesType = instance.valueType;
    }
    if (valuesType === typeof e) return e;
  }
  static ensure(e) {
    if (e === undefined || e === null) return;
    if (e instanceof this) return e;
    return this.parse(e);
  }
  static getValue(e, fallback = undefined) {
    const ensured = this.ensure(e) ?? this.ensure(fallback);
    return ensured instanceof this
      ? ensured.value
      : ensured;
  }
  static seal() {
    this._sealed = true;
    Object.freeze(this);
    Object.freeze(this.prototype);
  }
}

export class MqSpeed extends Enum {
  static NORMAL   = new MqSpeed(96);
  static FAST     = new MqSpeed(144);
  static SLOW     = new MqSpeed(69);
  static { this.seal(); }
}

export class MqDelay extends Enum {
  static NONE   = new MqDelay(0);
  static SHORT  = new MqDelay(1);
  static LONG   = new MqDelay(3);
  static { this.seal(); }
}

export class MqRange extends Enum {
  static INNER   = new MqRange();
  static OUTER   = new MqRange();
  static { this.seal(); }
}

export class MqHover extends Enum {
  static NONE   = new MqHover();
  static PLAY   = new MqHover();
  static PAUSE  = new MqHover();
  static { this.seal(); }
}

export class MqPlayback extends Enum {
  static SINGLE   = new MqPlayback();
  static REPEAT   = new MqPlayback();
  static BOUNCE   = new MqPlayback();
  static { this.seal(); }
}

export class MqDirection extends Enum {
  static UP     = new MqDirection();
  static DOWN   = new MqDirection();
  static LEFT   = new MqDirection();
  static RIGHT  = new MqDirection();
  static { this.seal(); }

  get isVertical() { return this === MqDirection.UP || this === MqDirection.DOWN; }
  get isHorizontal() { return this === MqDirection.LEFT || this === MqDirection.RIGHT; }
}

export class MqAxis extends Enum {
  static VERTICAL   = new MqAxis();
  static HORIZONTAL = new MqAxis();
  static { this.seal(); }
  get defaultDirection() {
    return this === MqAxis.VERTICAL
      ? MqDirection.UP
      : MqDirection.LEFT;
  }
}

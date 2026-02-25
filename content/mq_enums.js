class Enum {
  constructor() {
    if (this.constructor._sealed)
      throw new Error(`Can't construct Enum instance from outside an enum!`);
  }
  static seal() {
    this._sealed = true;
    Object.freeze(this);
    Object.freeze(this.prototype);
  }
}

export class MqSpeed extends Enum {
  static FAST     = new MqSpeed();
  static SLOW     = new MqSpeed();
  static NORMAL   = new MqSpeed();
  static { this.seal(); }
}

export class MqDelay extends Enum {
  static NONE   = new MqDelay();
  static LONG   = new MqDelay();
  static SHORT  = new MqDelay();
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

export class MqBehavior extends Enum {
  static SLIDE      = new MqBehavior();
  static SCROLL     = new MqBehavior();
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

# Marquee.js

A lightweight, dependency-free JavaScript marquee engine with configurable behavior, direction, range, speed, and hover interaction.

No <marquee> tag.  
No CSS hacks.  
Fully programmatic.  

---

## ✨ Features

- Two axes animation:
  - HORIZONTAL (scroll)
  - VERTICAL (slide)
- Multiple playback modes:
  - SINGLE
  - REPEAT
  - BOUNCE
  - ITERATIONS
- Inner / outer range modes
- Enum-based configuration (type-safe pattern)
- Dynamic duration based on content size
- Multiline text handling
- innerHTML support (option)
- Hover play / pause control
- Zero dependencies
- Modern ES2022+ (private fields, static blocks)

---

## 📦 Installation

Link css stylesheet:

```html
<link rel="stylesheet" href="https://boughpohpue.github.io/artifactory/js/marquee/1.0.1/marquee.css">
```

Include as a classic script:

```html
<script src="https://boughpohpue.github.io/artifactory/js/marquee/1.0.1/marquee.js"></script>
```

Include as a JS module:

```html
<script type="module" src="https://boughpohpue.github.io/artifactory/js/marquee/1.0.1/marquee.mod.js"></script>
```

Import into your JS module:

```js
import { Marquee } from "https://boughpohpue.github.io/artifactory/js/marquee/1.0.1/marquee.mod.js";
```

---

## 🚀 Parameters

Marquee.create params:

```js
// text: string
// targetElement: HTMLElement
// marqueeElementId: string (optional)
// marqueeElementStyle: string (optional)
// configOptions: object (optional)

Marquee.create(text, targetElement, marqueeElementId, marqueeElementStyle, configOptions);
```

## 🚀 Basic Usage

Simplest:

```js
Marquee.create("Hello World!");
```

Append to a specific container:

```js
Marquee.create("Scrolling text", document.getElementById("my-container"));
```

With custom styling:

```js
Marquee.create(
  "Styled marquee",
  document.body,
  "my-marquee",
  "width: 300px; height: 40px; background-color: #111; color: white;"
);
```

---

## ⚙️ Configuration Options

Configurable properties:

```js
// name: type (default)
// --------------------------
// range: MqRange (MqRange.OUTER)
// hover: MqHover (MqHover.PAUSE)
// axis: MqAxis (MqAxis.HORIZONTAL)
// direction: MqDirection (MqDirection.LEFT)
// delay: MqDelay | number [s] (MqDelay.NONE)
// speed: MqSpeed | number [px/s] (MqSpeed.NORMAL)
// playback: MqPlayback | number [times] (MqPlayback.REPEAT)
// allowHtml: boolean (false)
```

Pass options as the 5th argument:

```js
Marquee.create("Custom", document.body, null, "", {
  speed: MqSpeed.FAST,
  delay: MqDelay.SHORT,
  hover: MqHover.PAUSE,
  range: MqRange.OUTER,
  axis: MqAxis.VERTICAL,
  playback: MqPlayback.REPEAT,
  direction: MqDirection.DOWN,
  allowHtml: true,
});
```

---

## 🧭 Axis

### MqAxis.VERTICAL
Text animated vertically
- DOWN to UP (MqDirection.UP)
- UP to DOWN (MqDirection.DOWN)

### MqAxis.HORIZONTAL
Text animated horizontally
- RIGHT to LEFT (MqDirection.LEFT)
- LEFT to RIGHT (MqDirection.RIGHT)

---

## 🎬 Playback

### MqPlayback.SINGLE
Stops animation after one iteration.

### MqPlayback.REPEAT
Repeats animation from start position.

### MqPlayback.BOUNCE
Alternates between start and end positions.

### Custom iterations count
You can also provide custom number of iterations

---

## ➡️ Direction

| Direction           | Axis       | Description   |
|---------------------|------------|---------------|
| MqDirection.LEFT    | Horizontal | Right to left |
| MqDirection.RIGHT   | Horizontal | Left to right |
| MqDirection.UP      | Vertical   | Down to up    |
| MqDirection.DOWN    | Vertical   | Up to down    |

Note: Direction is automatically fixed when its axis doesn't match provided MqAxis param.

---

## 🎚 Speed

Predefined speeds:
- MqSpeed.FAST
- MqSpeed.NORMAL
- MqSpeed.SLOW

### Custom speed
You can also provide a custom value (pixels per second)


Note: Speed automatically scales based on content distance.

---

## ⏱ Delay

- MqDelay.NONE
- MqDelay.SHORT
- MqDelay.LONG

### Custom delay
You can also provide a custom value (seconds)

---

## 🎯 Range

### MqRange.INNER
Animation stays within container bounds.

### MqRange.OUTER
Animation travels fully outside container bounds.

---

## 🖱 Hover Action

- MqHover.NONE
- MqHover.PLAY
- MqHover.PAUSE

---

## 🧠 How Speed Calculation Works

Animation duration scales proportionally to travel distance:

```js
    distance = config.range === MqRange.INNER
      ? Math.max(containerDimension, textDimension)
      : containerDimension + (textDimension * 2);

    duration = distance / config.speed;
```

This keeps perceived speed consistent regardless of content length.

---

## 🧩 Design Notes

- Enum system prevents invalid configuration
- All DOM measurements are calculated after layout via 'requestAnimationFrame'
- Animation is CSS-driven, JS-controlled
- No global state

---

## 📌 Example

```js
Marquee.create(
  "Breaking News — Something awesome happened!",
  document.body,
  "news-ticker",
  "width: 100%; height: 40px; background-color: black; color: white;",
  {
    axis: MqAxis.HORIZONTAL,
    playback: MqPlayback.BOUNCE,
    direction: MqDirection.LEFT,
    speed: MqSpeed.NORMAL,
    hover: MqHover.PAUSE,
    range: MqRange.INNER,
    delay: 5,
    allowHtml: false
  }
);
```

---

## 🔬 DEMO

Follow links below and see **Marquee** in action...

Simple demo:

https://boughpohpue.github.io/marquee/tests/compiled/test.html


Interactive demo:

https://boughpohpue.github.io/marquee/tests/compiled/test_interactive.html

---

## 💡 Future Ideas

- ResizeObserver support
- IntersectionObserver auto pause
- Web Component wrapper
- prefers-reduced-motion support
- CSS-only fallback mode

---

## 📄 License

MIT

---

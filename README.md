# Marquee.js

A lightweight, dependency-free JavaScript marquee engine with configurable behavior, direction, range, speed, and hover interaction.

No <marquee> tag.  
No CSS hacks.  
Fully programmatic.  

---

## ✨ Features

- Both axes behaviors:
  - SLIDE (vertical)
  - SCROLL (horizontal)
- Multiple playback modes:
  - SINGLE
  - REPEAT
  - BOUNCE
- Inner / outer range modes
- Enum-based configuration (type-safe pattern)
- Dynamic duration based on content size
- Text as textContent or innerHTML
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
// marqueeElementId: string
// marqueeElementStyle: string
// configOptions: object

Marquee.create(text, targetElement, marqueeElementId, marqueeElementStyle, configOptions);
```

## 🚀 Basic Usage

Simplest:

```js
Marquee.create("Hello World!");
```

Append to a specific container:

```js
const container = document.getElementById("my-container");

Marquee.create("Scrolling text", container);
```

With custom styling:

```js
Marquee.create(
  "Styled marquee",
  document.body,
  "my-marquee",
  "width: 300px; height: 40px; background: #111; color: white;"
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
// behavior: MqBehavior (MqBehavior.SCROLL)
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
  behavior: MqBehavior.SLIDE,
  playback: MqPlayback.REPEAT,
  direction: MqDirection.DOWN,
  allowHtml: true,
});
```

---

## 🧭 Behavior

### MqBehavior.SLIDE
Text animated vertically.

### MqBehavior.SCROLL
Text animated horizontally.

---

## 🎬 Playback

### MqPlayback.SINGLE
Stops animation after one iteration.

### MqPlayback.REPEAT
Repeats animation from start position.

### MqPlayback.BOUNCE
Alternates between start and end positions.


Or provide a custom number (repeat times):

```js
playback: 3
```

---

## ➡️ Direction

| Direction           | Axis       | Description   |
|---------------------|------------|---------------|
| MqDirection.LEFT    | Horizontal | Right to left |
| MqDirection.RIGHT   | Horizontal | Left to right |
| MqDirection.UP      | Vertical   | Down to up    |
| MqDirection.DOWN    | Vertical   | Up to down    |

Note: Direction is automatically fixed when its axis doesn't match Behavior's.

---

## 🎚 Speed

Predefined speeds:

- MqSpeed.FAST
- MqSpeed.NORMAL
- MqSpeed.SLOW


Or provide a custom number (pixels per second):

```js
speed: 169
```

Speed automatically scales based on content distance.

---

## ⏱ Delay

- MqDelay.NONE
- MqDelay.SHORT
- MqDelay.LONG
- Or a numeric value in seconds

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
duration = (distance / containerSize) * baseSpeed
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
  "width: 100%; height: 40px; background: black; color: white;",
  {
    behavior: MqBehavior.SCROLL,
	playback: MqPlayback.BOUNCE,
    direction: MqDirection.LEFT,
    speed: MqSpeed.NORMAL,
    hover: MqHover.PAUSE,
    range: MqRange.INNER,
	allowHtml: true
  }
);
```

---

## 🔬 DEMO

Follow the link below and see it in action:

https://boughpohpue.github.io/marquee/tests/compiled/test.html

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

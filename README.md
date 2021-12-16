# stick-element

## Installation

`$ npm install stick-element`

## Usage

Notice: The target element (sticker/container) must have its position property defined.

### Basic
```js
import stickElement from "stick-element"

stickElement(sticker, container, {
    limits: { top: 50, left: 50 }
})
```
# stick-element

## Installation

`$ npm install stick-element`

## Usage

Notice: The target element (sticker/container) must have its position property defined.

### Basic
```js
import stickElement from "stick-element"

stickElement(sticker, container, {
    movement: { top: 50, left: 50 }
})
```

## API

```ts
function stickElement(
    container: HTMLElement,
    sticker: HTMLElement|null,
    options?:
    {
        movement?:
        {
            relative_to?: 'self'|'container',
            top?: number,
            left?: number,
        },
        destroy?: boolean,
        override?: boolean,
    },
): void
```

- `container`

    The container element. Container defines for which element's scroll, the sticker will respond to.

- `sticker`

    The sticker element. The element that is to be sticky.  
    When null, clear all sticky relations on passed container.

- `options`

    Other options.

    - `movement`
    
        Movement constraint.

        - `relative_to`
        
            The sticker will move with respect to the container or itself.
        
        - `top`, `left`
        
            When relative to container: max top/left margin.  
            When relative to self: max top/left offset.

    - `destroy`
    
        When true, from target container remove the sticky relation with target sticker.
    
    - `override`

        When true, remove the passed container-sticker relation.
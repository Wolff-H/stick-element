# stick-element

## install

### npm
$ npm install stick-element

### &lt;script&gt; // as a module

&lt;script src="somepath/stick-element.js"&gt;&lt;/script&gt;

### &lt;script&gt; // plain js

&lt;script src="somepath/stick-element.js"&gt;&lt;/script&gt;  
// delete the export sentence

## usage

Notice: the target element must have a position defined

### basic
    import stickElement from './stick-element'

    stickElement({
        element: target_element,
        container: target_container,
        offset_limits: {top: 50, left: 50},
    })
# fade-on-scroll

Minimal library for synced fade on scroll, on multiple elements, with a few important options.

- It uses one scroll event listener for all instances.
- It's **dependency-free** - no JQuery.
- Options can be set inside a JavaScript file or inside a html element.
- It uses *requestAnimationFrame* with polyfill.

Demo: [Codepen](http://codepen.io/webpraktikos/pen/ZWZJBm)

## Purpose of Existence

The only solutions I've found at the time:

- huge multipurpose libraries,
- too limiting scripts.

Not so great.

## Usage

**1.** Include it in HTML document.

```javascript
<script src="/path/to/fade-on-scroll.js"></script>
```

**2.** Initiate by passing the container selector as a function argument.

```javascript
var someIdentifier = FadeOnScroll( 'window' );
```

**3.** Specify which element/s to manipulate and how.

  **a.** Inside JavaScript (or refer to **b.** for html option).

  Single element.

```javascript
var services = someIdentifier( '.promo-boxes__prgf', {
  waypoint: '33%',
  direction: 'bottom'
})
```

  Multiple elements.

```javascript
var services = someIdentifier([
  [
    '.promo-boxes__prgf',
      {
        waypoint: '33%',
        direction: 'bottom'
      }
  ], [
    '.main-header',
    {
      waypoint: 'self',
      direction: 'top'
    }
  ]
])
```

  **b.** Inside HTML. Special class name `fade-on-scroll` has to be used.

```javascript
<header class="main-header fade-on-scroll" data-fos-options='{ "waypoint": "self", "direction": "top" }'>
```

**Important Note:** Options set in the HTML must be valid JSON. Keys need to be quoted, for example `"itemSelector"`:. Attribute `data-fos-options` is set with a single quote `'`, but JSON entities use double-quotes `"`.

### Options

- `direction` - To which direction to fade-in or fade-out.
  + `top` - Fade-out (into window top) when scrolling down.
  + `bottom` - Fade-in (from window bottom) when scrolling down.
  + `both` - Fade-out (into window top) and fade-in (from window bottom) when scrolling down.
- `waypoint` - From which distance to fade-in or fade-out, relative to the `direction` option (top, bottom or both).
  + `self` - Top or bottom position of an element.
  + in `px` - Distance in pixels (e.g. 60px).
  + in `%` - Distance in percentage (e.g. 30%).

## Licence

The MIT License (MIT)

©&nbsp;2017 WebPraktikos <hi@webpraktikos.com> [@webpraktikos](https://twitter.com/webpraktikos).

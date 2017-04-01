# Tooltip Javascript

**Tooltip Javascript** is a fast, micro size (1kb) to identify an element when they contain brief helper text about its function. [Demo][1]

## Installing from Bower

```shell
$ bower install tooltip-javascript --save
```

## Documentation

* Distribution file is in the `dist/` directory.
* See more: [online demo and document][1]

## Usage

```javascript
var tooltips = new tooltip(elements [array], options [object]);
```
Example
```javascript
var tooltips = new tooltip( document.querySelectorAll('[data-tooltip]'), {
  once: true
});
```
... you may replace `document.querySelectorAll('selector')` with a jQuery object like `$('selector')`.

## Options
|Option|Type|Defualt|Description|
|---|---|---|---|
|**attribute**|*String*|`data-tooltip`|The attribute that contains the content.|
|**delay**|*Number*|`150`|Sets delay time before the tooltip appears. (expect milliseconds)|
|**duration**|*Number*|`2500`|Sets how long the tooltip stays on the screen. (expect milliseconds)|
|**offsetTop**|*Number*|`0`|The offset from the top viewport uses when element is close to very top then the tooltip appears under the element instead. (calculates as pixels)|
|**once**|*Boolean*|`false`|When its true, identical content will not be shown more than once even if they are belong to different elements.|
|**display**|*Number*|`1`|Sets how many times a tooltip can be shown.|

## Callbacks
|Option|Type|Defualt|Description|
|---|---|---|---|
|**onpop**|*function*|`null`|Triggers after tooltip popped up.|
|**ondrop**|*function*|`null`|Triggers after tooltip dropped.|

## Running the test

```shell
$ npm start
```
... and then open a browser and go to `http://localhost:8080`

## How to build

```shell
$ npm run build
```

## Building details

* Autoprefixer: `gulp-autoprefixer`
* Concat: `gulp-concat`
* Rename: `gulp-rename`
* Js Minified and mangled: `gulp-uglify`
* CSS Minified and mangled: `gulp-uglifycss`
* Preserve license comments: `uglify-save-license`

## License MIT
Copyright (c) 2017 Hesam Bayat http://pixudio.com

[1]: https://hesambayat.github.io/tooltip-javascript "See more"

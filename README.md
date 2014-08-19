#Bixie UI-kit Slideshow

A simple slideshow for the awesome [UI-kit](https://github.com/uikit/uikit) framework

Watch the [demo](http://www.bixie.nl/slideshow/).

Usage:
```
<div data-bix-slideshow>
	<div>...</div>
	<div>...</div>
	<div>...</div>
</div>
```
Options:
```
delay: 	delay for slideshow. Default 5000
nav:	show dotnav navigation in bottom left corner. Default true
```

The previous slides will fade out, new slides are shown immediatly. For animations in the slide, use `uk-animation-*` and/or `uk-scrollspy-*` classes. Add the `data-uk-observe` attribute to trigger them after slide-changes.
```
<div data-bix-slideshow="{delay:7000}" data-uk-observe>
	<div>...</div>
	<div>...</div>
	<div>...</div>
</div>
```

Questions, remarks, additions in the [issues](https://github.com/Bixie/uikit-slideshow/issues).

# Mylib Slideshow Plugin

A simple slideshow plugin for MyLib js library.

### How?

you must have mylib.js and mylib-slideshow linked to your HTML document
	<pre><code>
	&lt;script type="text/javascript" src="mylib.js"&gt;&lt;/script&gt;
	&lt;script type="text/javascript" src="mylib-slideshow"&gt;&lt;/script&gt;
	</code></pre>
	
call myLibSlideshow function passing the parameters you want using elements ids:
	<pre><code>
	var slideshowOptions = 
    {
        slideshowContainer: "slideshow-container",
        slideshowList: "li"
    };
    myLibSlideshow(slideshowOptions);
	</code></pre>

or using the instantiated elements:
	<pre><code>
	var slideshowContainer = API.getEBI("slideshow-container");
	var slideshowList = API.getEBTN("li", slideshowContainer);
	var slideshowOptions = 
    {
        slideshowContainer: slideshowContainer,
        slideshowList: slideshowList
    };
    myLibSlideshow(slideshowOptions);
	</code></pre>
	
you can pass the navigation too:
	<pre><code>
	var slideshowOptions = 
    {
        slideshowContainer: "slideshow-container",
        slideshowList: "li",
        slideshowNavContainer: "slideshow-nav",
        slideshowNavList: "a"
    };
    myLibSlideshow(slideshowOptions);
	</code></pre>

you can setup many other options to configure the plugin:
	<pre><code>
	opt = 
    {
         slideshowContainer: [html obj or element id - REQUIRED],
         slideshowList: [html obj colection or tag name of items elements - REQUIRED],
         slideshowTransitionDuration: [the transition duration in ms - OPTIONAL],
         slideshowWaitingDuration: [the waiting between 1 item and the nex item - OPTIONAL],
         slideshowStartOn: [int - the position of the active item - OPTIONAL],
         slideshowNavContainer: [html obj or element id - OPTIONAL],
         slideshowNavList:[html obj colection or tag name of items elements - REQUIRED if the slideshowNavContainer is set]
    };
	</code></pre>
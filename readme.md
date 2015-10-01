# Construct.js

Construct.js is a framework  focused around WebGL apps that uses popular open source libraries as dependencies. It's aim is to enhance rapid development, while being a lightweight wrapper that preserves all the set conventions of the dependency libraries.

It's architecture is module based, inspired by node.js and specifically express. This is the main constructor library. Other add-on libraries are available in their own repos at [Construct.js on Github](http://github.com/constructjs)


## Features

* Web standards compliant
* Modular architecture
* Sinatra-like syntax
* WebGL / Canvas rendering
* Dependency loader


## Dependencies

Construct can act as a dependency injection framework, assisting the app and setting the ground work so all the necessary libs are available. Main dependencies are:

* [Backbone APP](http://github.com/makesites/backbone-app)
* [jQuery Three](http://github.com/makesites/jquery-three)
* [Handlebars.js](http://github.com/wycats/handlebars.js)
* [Require.js](https://github.com/jrburke/requirejs)


## Usage

As a dependency injection framework, it is assumed that only one instance of the construct is required for any web page, and instantiation construct as a class is (currently) considered out of scope. When ready, initialize construct as follows:
```
construct( options, callback );
```

As a custom element it extends a regular div:
```
<div is="construct-3d"></div>
```


## Options

On initialization you may include the following options...

* **require** : a require.js config object, that will override the default config
* **router** : the path of a Backbone.js router, to be loaded after all other dependencies


## Methods

Apart from initialization there are a number of methods exposed under the ```construct``` namespace to be used for different actions.

* **config** : Returns the full object used in require.config
* **configure** : Sets logic that will run in initialization
* **register** : Connects objects with the update trigger
* **lang** : Extends language support (used for localization)


## Plugins

With its modular architecture the framework is extensible through plugins. Features like gamepad support, physics and touchscreen inputs can be included on demand by using one of the available extensions from http://github.com/constructjs



## Credits

Created by:
* Makis Tracend ( [@tracend](http://github.com/tracend) )
* Lyndel Thomas ( [@ryndel](http://github.com/ryndel) )

[Complete list of contributors](https://github.com/constructjs/construct/graphs/contributors)


Distributed through [Makesites.org](http://makesites.org)

### License

Construct.js is free & open source software, dual-licensed under the MPL & AGPL

* Mozilla Public License: http://www.mozilla.org/MPL/2.0/
* Affero General Public License: http://www.gnu.org/licenses/agpl.html

For more information, visit: https://raw.github.com/constructjs/construct/master/LICENSE

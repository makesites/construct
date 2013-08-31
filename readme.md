## Construct.js

Construct.js is a framework  focused around WebGL apps that uses popular open source libraries as dependencies. It's aim is to enhance rapid development, while being a lightweight wrapper that preserves all the set conventions of the dependency libraries.

It's architecture is module based, inspired by node.js and specifically express. This is the main constructor library. Other add-on libraries are available in their own repos at [Construct.js on Github](http://github.com/constructjs)


## Features

* Modular architecture
* Sinatra-like syntax
* WebGL rendering
* Gamepad / Touchscreen inputs


## Dependencies

Construct acts more as a Dependency Injection framework, assisting the app and setting the ground work so all the needed classes are available for instantiation.

* Backbone.js
* Three.js
* jQuery

## Usage

As a dependency injection framework, it is assumed that only one instance of the construct is required for any web page, and instantiation construct as a class is (currently) considered out of scope.
```
construct.init();

```




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

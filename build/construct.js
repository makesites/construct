/*
 * Construct.js : Constructor
 *
 * @author Makis Tracend
 * @cc_on Copyright © 2013 Makesites.org
 *
 * @license Dual-licensed under the MPL and AGPL:
 * https://github.com/makesites/construct/blob/master/LICENSE
 */


(function(){

// Utils

// - Internal promise method...
var Promise = function(obj) {
	var args = null;
	var callbacks = [];
	var resolved = false;

	this.add = function(callback) {
		if (resolved) {
			callback.apply(obj, args);
		} else {
			callbacks.push(callback);
		}
	};

	this.resolve = function() {
		if (!resolved) {
			args = arguments;
			resolved = true;

			var callback = callbacks.shift();
			while (callback) {
				callback.apply(obj, arguments);
				callback = callbacks.shift();
			}

			callbacks = null;
		}
	};
};

// - Object extend
Object.extend = function(destination, source) {
	for (var property in source) {
		if (source[property] && source[property].constructor && source[property].constructor === Object) {
			destination[property] = destination[property] || {};
			arguments.callee(destination[property], source[property]);
		} else {
			destination[property] = source[property];
		}
	}
	return destination;
};

/* Language file */

var locale = {
	"en-US": {
		"error": {
			"no-backbone": "Backbone is not available: http://backbonejs.org/",
			"no-jquery": "jQuery is not available: http://jquery.com/",
			"no-jquery-three": "jQuery Three is required: http://github.com/makesites/jquery-three",
			"no-backbone-app": "This function requires Backbone APP: http://github.com/makesites/backbone-app"
		}
	}
};
// main lib

construct = function( options, callback ){

	// extend default config with supplied config
	//if( options.deps ) construct.config = $.extend( true, options.deps, construct.config);
	if( options.deps ) Object.extend(construct.config, options.deps);

	if( callback ) construct.callback = callback;

	// execute any config options passed in the init()
	construct.promise.resolve();
	// set the initi method
	//construct.config.init = construct.init;

	//require.config( construct.config );

	//require( construct.config.deps, construct.init);
	construct.init();

};

construct.init = function(){
	// execute when construct is initialized
	//console.log("init");

	// initialize APP
	var app = new APP();
	window.app = app;
	// start backbone history
	Backbone.history.start();

	if( construct.callback ) construct.callback( app );
	//return app;

};


// stack middleware to be used
construct.register = function( fn ){

	//fn();
	// add things in the loop (if necessary)
	if(fn && fn.update){
		construct.loop.push( fn.update );
	}

};

// initial setup
construct.configure = function( fn ){

	// validate function?
	construct.promise.add( fn );

};

// extend language support
construct.lang = function( language ){
	// check language structure first...
	Object.extend(locale, language);
};

/* Helper methods */
/* consider prefixing with _  ? */


construct.loop = [];

// simple batch processor of all update events
construct.update = function( fn ){
	// stack middleware


};

// output status messages
// inspired by the l10n handlebars helper: https://gist.github.com/tracend/3261055
construct.log = function( type, key ){
	//prerequisites
	if(!type || !key) return;
	// find language
	// make this a config option? (to avoid repeat lookups)
	var lang = (navigator.language) ? navigator.language : navigator.userLanguage;

	// pick the right dictionary - rever to the passed type/key
	var string = locale[lang][type][key] || locale['en-US'][type][key] || type +": "+ key;

	// check if console.log exists first?

	//output
	console.log(string);

};


construct.promise = new Promise();


// Dependencies
construct.config = {
	"paths": {
		"jquery": [
			"//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.2/jquery.min"
		],
		"json2": [
			"//cdnjs.cloudflare.com/ajax/libs/json2/20121008/json2.min"
		],
		"underscore": [
			"//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min"
		],
		"handlebars": [
			"//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.0/handlebars.min"
		],
		"backbone": [
			"//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min"
		],
		"three.js": [
			"//cdnjs.cloudflare.com/ajax/libs/three.js/r58/three.min"
		],
		"backbone.app": [
			"//rawgithub.com/makesites/backbone-app/0.9.0/build/backbone.app-min"
		],
		"jquery.three": [
			"//rawgithub.com/makesites/jquery-three/master/build/jquery.three"
		]
	},
	"shim": {
		"jquery": {
			"deps": [
				"json2"
			]
		},
		"underscore": {
			"exports": "_"
		},
		"backbone": {
			"deps": [
				"underscore",
				"jquery"
			],
			"exports": "Backbone"
		},
		"backbone.app": {
			"deps": [
				"backbone",
				"underscore",
				"jquery"
			]
		},
		"jquery.three": {
			"deps": [
				"jquery",
				"three.js"
			]
		},
		"construct.input": {
			"deps": [
				"construct"
			]
		},
		"construct.editor": {
			"deps": [
				"construct"
			]
		}
	},
	"deps": []
};


// Add models after dependencies are laoded
construct.promise.add(function(){
	require(["backbone.app"], function(){
	
		APP.Models.User = APP.Model.extend({
			defaults: {
				admin : true
			}
		});
	
		APP.Models.Asset = APP.Model.extend({
			defaults: {
				x : 0,
				y : 0,
				editable : true
			}
		});
	
		APP.Collections.Users = APP.Collection.extend({
		});
	
		APP.Collections.Assets = APP.Collection.extend({
		});
	
	});
});


// Add models after dependencies are laoded
construct.promise.add(function(){

require(["backbone.app", "jquery.three"], function(){

	// extend APP namespace
	APP.Meshes = {};
	APP.Sprites = {};
	APP.Actors = {};


	APP.Mesh = Backbone.View.extend({

		preRender: function(){

		},
		render: function(){

		},
		postRender: function(){

		},
		update: function(){
			// executed on every tick

		}

	});

	/* extending Mesh */
	APP.Meshes.Static = APP.Mesh.extend({
	});

	APP.Meshes.Dynamic = APP.Meshes.Static.extend({

	});


	APP.Meshes.Avatar = APP.Meshes.Dynamic.extend({
	});


	/* extending Avatar */
	APP.Meshes.NPC = APP.Meshes.Avatar.extend({
	});


	APP.Meshes.Player = APP.Meshes.Avatar.extend({
	});


	APP.Sprite = Backbone.View.extend({
	});


	/* extending Sprite */
	APP.Sprites.Static = APP.Sprite.extend({
	});

	APP.Sprites.Animated = APP.Sprite.extend({
	});


	APP.Views.Asset = APP.View.extend({

		// user jquery-three for rendering
		// attach dat.gui view if editable & user has admin rights
	});


});

});

//require(["backbone.app", "jquery.three"], function(){ 
	
	
	/*
	APP.Routers.User = APP.Router.extend({
		initialize: function(){
		
		}
	});
	*/
	
//});


})();
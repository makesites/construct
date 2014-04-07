/**
 * @name construct
 * Construct.js : Constructor
 *
 * Version: 0.3.0 (Mon, 07 Apr 2014 02:00:19 GMT)
 * Homepage: https://github.com/makesites/construct
 *
 * @author makesites
 * Created by: Makis Tracend (@tracend)
 *
 * @cc_on Copyright © Makesites.org
 * @license Dual-licensed: Mozilla Public License v2.0, GNU Affero General Public License v3.0
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

var utils = {
	uuid: function(){
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
	}
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
	// fallback
	options = options || {};
	// extend default config with supplied config
	//if( options.require ) construct.config = $.extend( true, construct.config, options.require );
	if( options.require ) Object.extend(construct.config, options.require);

	if( callback ) construct.callback = callback;

	if(typeof require != "undefined"){
		require.config( construct.config );
		require( construct.config.deps, construct.init);
		// set the init method
		//construct.config.init = construct.init;
	} else {
		// #9 proceeed if Require.js is not available...
		// prerequisites
		if( typeof Backbone == "undefined" ) return construct.log("error", "no-backbone");
		if( typeof jQuery == "undefined" ) return construct.log("error", "no-jquery");
		if( typeof jQuery.fn.three == "undefined" ) return construct.log("error", "no-jquery-three");
		// initiate
		construct.init();
	}
	// save options
	Object.extend(construct.options, options);
};

construct.init = function(){
	// execute when construct is initialized
	//console.log("init");
	// execute any config options passed in the init()
	// #10 resolving promises with construct options as an argument
	construct.promise.resolve( construct.options );

	// initialize APP
	if( construct.options.router ){
		// async init
		new APP({ require : construct.options.router }, function( app ){
			window.app = app; // optional?
			// start backbone history
			Backbone.history.start();
			if( construct.callback ) construct.callback( app );
		});

	} else {
		// linear init
		var app = new APP();
		window.app = app; // optional?
		// start backbone history
		Backbone.history.start();
		if( construct.callback ) construct.callback( app );
	}

	return this;

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

// options passed in construct through initialization or plugins
construct.options = {};
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
			"//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery"
		],
		"json3": [
			"//cdnjs.cloudflare.com/ajax/libs/json3/3.2.4/json3.min"
		],
		"underscore": [
			"//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore"
		],
		"handlebars": [
			"//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.1.2/handlebars"
		],
		"backbone": [
			"//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone"
		],
		"three-js": [
			"//cdnjs.cloudflare.com/ajax/libs/three.js/r61/three"
		],
		"backbone.app": [
			"//rawgithub.com/makesites/backbone-app/0.9.4/build/backbone.app"
		],
		"jquery.three": [
			"//rawgithub.com/makesites/jquery-three/master/build/jquery.three"
		]
	},
	"shim": {
		"jquery": {
			"deps": [
				"json3"
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
			],
			"exports": "APP"
		},
		"three-js": {
			"exports": "THREE"
		},
		"jquery.three": {
			"deps": [
				"jquery",
				"three-js"
			]
		}
	},
	"deps": ["backbone.app", "jquery.three", "handlebars"]
};


// Add models after dependencies are laoded
construct.promise.add(function(){
	//require(["backbone.app"], function(){

	// reference in the APP namespace
	if( typeof APP == "undefined" ) window.APP = {};
	// fallbacks
	var Model = APP.Model || Backbone.Model;
	var Collection = APP.Collection || Backbone.Collection;

	APP.Models.User = Model.extend({
		defaults: {
			admin : true
		}
	});

	APP.Models.Asset = Model.extend({
		defaults: {
			x : 0,
			y : 0,
			editable : true
		}
	});

	APP.Models.Mesh = Model.extend({
		defaults: {
			position : [0,0,0],
			rotation : [0,0,0],
			scale : [1,1,1]
		}
	});


	APP.Collections.Users = Collection.extend({
	});

	APP.Collections.Assets = Collection.extend({
	});

	APP.Collections.Objects = Backbone.Model.extend({

		initialize: function( options ){
			this.length = 0;
			return Backbone.Model.prototype.initialize.call(this, options);
		},

		set: function( objects, val, options ){
			options = options || {};
			if( options.unset ){
				// removing object
				this.length--;
			} else {
				// set event listeners
				for( var i in objects ){
					objects[i]._name = i;
					this.length++;
					this._setupObject( objects[i] );
				}
			}
			return Backbone.Model.prototype.set.apply(this, arguments);
		},

		// this is like 'set', with an automatic assignment of a key
		add: function( object ){
			var objects = {};
			// loop for array?
			var id = utils.uuid();
			objects[id] = object;
			this.set( objects );
		},

		_setupObject: function( object ){
			var self = this;

			if( object.state.rendered ){
				this.trigger("find", object);
				this.trigger("parent", object);
			}
			// for all future requests
			object.on("parent", function(){
				self.trigger("parent", object);
			});
			object.on("render", function(){
				self.trigger("find", object);
			});
			object.on("find", function( e ){
				self.trigger("find", e);
			});
			object.on("remove", _.bind(this._removed, this));

		},

		_removed: function( e ){
			this.unset( e._name );
		}

	});


	APP.Models.Layers = Backbone.Model.extend({

		set: function( objects ){
			var self = this;
			// bubble up events
			for( var i in objects ){
				var object = objects[i];
				object.on("find", _.bind(this.bubble, this) );
			}
			return Backbone.Model.prototype.set.apply(this, arguments);
		},
		bubble: function( e ){
			this.trigger("find", e);
		}
	});

	//});
});


// Add models after dependencies are loaded
construct.promise.add(function(){

//require(["backbone.app", "jquery.three"], function(){

	// reference in the APP namespace
	if( typeof APP == "undefined" ) window.APP = {};
	// fallbacks
	var Model = APP.Model || Backbone.Model;
	var Collection = APP.Collection || Backbone.Collection;
	var View = APP.View || Backbone.View;
	var Layout = APP.Layout || Backbone.Layout;

	// extend APP namespace
	APP.Layers = {};
	APP.Meshes = {};
	APP.Sprites = {};
	APP.Actors = {};


	APP.Views.Main3D = APP.View.extend({

		el: ".main",

		options: {
			renderTarget: "shadow-root"
		},

		initialize: function( options ){
			//_.bindAll(this, "");
			// main container(s)
			this.objects = new APP.Collections.Objects();

			this.layers = new APP.Models.Layers();

			// create the 3D environment (watch for live updates)
			if( typeof this.el !== "undefined" )
				this.$3d = $(this.el).three({ watch: true }, _.bind(this._start, this) );

			// events
			$("body").on("update", this.el, _.bind(this._update, this) );
			this.objects.on("find", _.bind(this._find, this) );
			this.layers.on("find", _.bind(this._find, this) );

			return APP.View.prototype.initialize.call( this, options );
		},

		// when the 3D environement is ready
		start: function( $3d ){

		},

		// trigger on every frame
		update: function(){

		},

		// Internal
		_start: function( $3d ){
			// automatic startup
			// - save Three.js instance
			this.$3d = $3d;
			this.$3d.clock = new THREE.Clock(), // one clock for all $3d?

			// user-defined startup
			this.start( $3d );
		},

		_update: function( e ){
			// only update if the event is of the container
			if( this.el !== e.target.el) return;
			// automatic updates
			// - broadcast updates to objects
			for( var i in this.objects.attributes ){
				this.objects.get(i).trigger("update", e);
			}
			for( var j in this.layers.attributes ){
				this.layers.get(j).trigger("update", e);
			}
			// user-defined updates
			this.update( e );
		},

		_find: function( e ){
			// where is the data id located in relation to this.el
			var id = (  $(e.el).find("[data-id]").length > 0 ) ? $(e.el).find("[data-id]").attr("data-id") : $(e.el).attr("data-id");

			if( !_.isUndefined(id) ){
				var object = this.$3d.get(id);
				// save a reference to that object
				e.object = object;
				// trigger start event
				e.trigger("start");
			}
		},

		//onMouseMove
		mousemove: function( e ){
			// broadcast updates to player
			var player = this.objects.get("player");
			if( player && player.onMouseMove ) player.onMouseMove( e );
		}

	});


	// in case APP.Mesh has already been defined by a plugin
	var Mesh = APP.Mesh || View;

	// move speed, collission to dynamic mesh...
	APP.Mesh = Mesh.extend({
		options: {
			speed: false,
			bind: "sync"
		},

		state: {
			rendered: false
		},
/*
		attributes: function(){
			return this.data.toJSON();
		},
*/
		initialize: function( options ){
			options = options || {};
			// FIX: reject collections
			if (options.models ) return;
			// data
			this.data = this.data || options.data || this.model || new APP.Models.Mesh();
			// find the parent
			this.trigger("parent");
			// events
			this.on("update", _.bind(this._update, this));
			this.on("start", _.bind(this._start, this));

			var self = this;
			// HACK!!! wait till the parent arrives...
			setTimeout(function(){
				return View.prototype.initialize.call(self, options);
			}, 100);
		},

		start: function(){

		},

		// set the initial attributes (once)
		_start: function(){
			// lookup attributes
			// - position
			var position = this.data.get("position");
			var defaultPosition = APP.Models.Mesh.prototype.defaults.position;
			if( position !== defaultPosition ){
				this.object.position.set( position[0], position[1], position[2] );
			}
			// - rotation
			var rotation = this.data.get("rotation");
			var defaultRotation = APP.Models.Mesh.prototype.defaults.rotation;
			if( rotation !== defaultRotation ){
				this.object.rotation.set( rotation[0], rotation[1], rotation[2] );
			}
			// - scale
			var scale = this.data.get("scale");
			var defaultScale = APP.Models.Mesh.prototype.defaults.scale;
			if( scale !== defaultScale ){
				this.object.scale.set( scale[0], scale[1], scale[2] );
			}
			// user defined actions
			this.start();
		},
		/*
		preRender: function(){

		},
		render: function(){

		}
		,*/
		_postRender: function(){
			// set state
			this.state.rendered = true;
			this.trigger("render");

			return View.prototype._postRender.call(this);
		},

		_update: function( e ){
			var self = this;
			// FIX: if there's no reference to the object yet, request it again
			// (and stop further processing)
			if( _.isUndefined(this.object) ){
				//console.log("render", this);
				return this.trigger("render");
			}

			// set the speed of the object
			if( this.options.speed && this.object ){
				// variables
				var speed = this.options.speed;
				var position = this.object.position;
				if(speed.x) position.x += speed.x;
				if(speed.y) position.y += speed.y;
				if(speed.z) position.z += speed.z;
				// check if position has changed first
				this.object.position.set( position.x, position.y, position.z );
			}
			if( this.objects ){
				// - broadcast updates to objects
				for( var i in this.objects.attributes ){
					this.objects.get(i).trigger("update", e);
				}
			}
			// user-defined updates
			this.update( e );
		},

		update: function( e ){
			// executed on every tick

		},

		remove: function(){
			//console.log("remove", View.prototype.remove );
			this.trigger("remove", this);
			// remove object from scene
			// (should this be automated by removing the tags?)
			var scene = this.object.parent;
			if (scene) scene.remove( this.object );
			// also remove from $3d.objects list (not implemented yet)

			// unbind events
			this.undelegateEvents();
			this.$el.removeData().unbind();

			//Remove view from DOM
			return View.prototype.remove.call(this);
		},

		// Internal
		// - validate is required in backbone models
		_validate: function(){
			return true;
		}

	});

	/* extending Mesh */
	// a static mesh cannot be updated after init
	APP.Meshes.Static = APP.Mesh.extend({

	});

	// a dynamic mesh can be updated after init
	APP.Meshes.Dynamic = APP.Meshes.Static.extend({

		options: {
			moveStep: 3, // a 0-10 setting
			rotateStep: 0.5 // 1-0 settting
		},

		state: {
			// moving conventions as set by THREE.FlyControls
			move: {
				left: 0,
				right: 0,
				up: 0,
				down: 0,
				forward: 0,
				back: 0,
				pitchDown: 0,
				pitchUp: 0,
				yawRight: 0,
				yawLeft: 0,
				rollRight: 0,
				rollLeft: 0
			}
		},

		initialize: function( options ){

			// containers
			this.objects = new APP.Collections.Objects();
			// events
			this.objects.on("find", _.bind(this._find, this) );
			this.objects.on("parent", _.bind(this._self, this) );

			return APP.Meshes.Static.prototype.initialize.call( this, options );
		},

		_find: function( e ){
			this.trigger("find", e);
		},

		_self: function( e ){
			e.parent = (this.object) ? this.object : null;
		},

		tmpQuaternion: new THREE.Quaternion(),
		moveVector: new THREE.Vector3( 0, 0, 0 ),
		rotationVector: new THREE.Vector3( 0, 0, 0 ),

		updateMovementVector: function() {

			this.moveVector.x = ( -this.state.move.left    + this.state.move.right );
			this.moveVector.y = ( -this.state.move.down    + this.state.move.up );
			this.moveVector.z = ( -this.state.move.forward + this.state.move.back );

			//console.log( 'move:', [ this.moveVector.x, this.moveVector.y, this.moveVector.z ] );

		},

		updateRotationVector: function() {

			this.rotationVector.x = ( -this.state.move.pitchDown + this.state.move.pitchUp );
			this.rotationVector.y = ( -this.state.move.yawRight  + this.state.move.yawLeft );
			this.rotationVector.z = ( -this.state.move.rollRight + this.state.move.rollLeft );

			//console.log( 'rotate:', [ this.rotationVector.x, this.rotationVector.y, this.rotationVector.z ] );

		}

	});

	// an avatar has "entity" qualities
	APP.Meshes.Avatar = APP.Meshes.Dynamic.extend({

	});


	/* extending Avatar */
	// a non-playable character
	APP.Meshes.NPC = APP.Meshes.Avatar.extend({
	});

	// a playable character
	APP.Meshes.Player = APP.Meshes.Avatar.extend({

	});


	APP.Sprite = View.extend({
		initialize: function( options ){
			options = options || {};
			// FIX: reject collections
			if (options.models ) return;
			// data
			this.data = this.data || options.data || this.model || new APP.Model();
			this.object = options.object;

			// events
			this.on("update", _.bind(this._update, this));
			//this.on("start", _.bind(this._start, this));
			if( this._start ) this._start();
			//return View.prototype.initialize.call(self, options);
		},

		_start: function(){

		},

		_update: function(){

		}
	});


	/* extending Sprite */
	APP.Sprites.Static = APP.Sprite.extend({
	});

	// based on : http://stemkoski.github.io/Three.js/Texture-Animation.html
	APP.Sprites.Animated = APP.Sprite.extend({
		options: {
			timeElapsed: 0
		},

		_start: function(){
			var texture = this.object.children[0].material.map;
			// put all these variables in this.options or this.state...
			var tiles = this.model.get("tiles");
			this.tilesHorizontal = tiles[0];
			this.tilesVertical = tiles[1];
			// how many images does this spritesheet contain?
			//  usually equals tilesHoriz * tilesVert, but not necessarily,
			//  if there at blank tiles at the bottom of the spritesheet.
			this.numberOfTiles = this.model.get("total");
			texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
			texture.repeat.set( 1 / this.tilesHorizontal, 1 / this.tilesVertical );

			// how long should each image be displayed?
			this.tileDisplayDuration = this.model.get("timeout");

			// how long has the current image been displayed?
			this.currentDisplayTime = 0;

			// which image is currently being displayed?
			this.currentTile = 0;
			this.options.lastTime = (new Date()).getTime();
			return APP.Sprite.prototype._start.call(this);
		},

		_update: function( e ){
			var now = (new Date()).getTime(),
				timeElapsed = now - this.options.lastTime;
			//this.currentDisplayTime += timeElapsed;
			var texture = this.object.children[0].material.map;

			if (timeElapsed > this.tileDisplayDuration)
			{
				//this.currentDisplayTime -= this.tileDisplayDuration;
				this.options.lastTime = now;
				this.currentTile++;
				if (this.currentTile == this.numberOfTiles)
					this.currentTile = 0;
				var currentColumn = this.currentTile % this.tilesHorizontal;
				texture.offset.x = currentColumn / this.tilesHorizontal;
				var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
				texture.offset.y = 1 - currentRow / this.tilesVertical;
			}
			return APP.Sprite.prototype._update.call(this, e);
		}
	});


	APP.Views.Asset = View.extend({

		// user jquery-three for rendering
		// attach dat.gui view if editable & user has admin rights
	});


	// Layers
	// - Main layer construct
	APP.Layer = Backbone.Collection.extend({
		/*
		options: {
			append: true
		},
		*/
		initialize: function( models, options ){
			//
			// base objects
			this.el = this.el || options.el || null;
			this.objects = new APP.Collections.Objects();
			//var models = models || [];

			// events


			//if( options.collection ){
			//	models = options.collection;
			//	delete options.collection;
			for(var i = 0; i < models.length ; i++){
				var model = models.get(i) || {};
				this.add( model );
			}
			//}

			// events
			this.on("update", _.bind(this._update, this) );
			this.objects.on("find", _.bind(this._find, this) );
			this.objects.on("change", _.bind(this._refresh, this) );

			//this.object = options.object || this.options.object || this.object || APP.Mesh;

			return APP.Collection.prototype.initialize.call(this, null, options);
		},

		add: function( model ){
			model = model || {};
			// create new object from blueprint
			var object = new this.model({
				parentEl: this.el,
				renderTarget: this.el,
				//model: model,
				append: true
			});
			this.objects.add( object );

		},

		update: function( e ){

		},

		refresh: function( e ){

		},

		// Internal
		_update: function( e ){
			// automatic updates
			// - broadcast updates to objects
			for( var i in this.objects.attributes ){
				this.objects.get(i).trigger("update", e);
			}
			// user-defined updates
			this.update( e );
		},
		// when the objects collection has changed:
		_refresh: function( e ){
			// user defined
			this.refresh( e );
		},

		_find: function( e ){
			this.trigger("find", e);
		}

	});

//});

});


// Add models after dependencies are laoded
construct.promise.add(function(){
	//require(["backbone.app"], function(){

	// reference in the APP namespace
	if( typeof APP == "undefined" ) window.APP = {};
	// fallbacks
	var Router = APP.Router || Backbone.Router;

	// default router - feel free to overwrite
	APP.Routers.Default = APP.Routers.Default || Router.extend({
		initialize: function( options ){
			_.bindAll(this, "index");
			this.data = new Backbone.Model();
			console.log("init", "APP.Routers.Default");
			return Router.prototype.initialize.call(this, options);
		},
		routes: {
			"" : "index"
		},
		index: function(){
			console.log( "Construct.js is running..." );
			if( !_.isUndefined( APP.Main ) ){
				this.main = new APP.Main({ data : this.data });
			}
			//this.layout = new APP.Layouts.Default({ data : this.data });
		}
	});

	//});
});


})();
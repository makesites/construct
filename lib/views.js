
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

	// common objects
	var params1 = new APP.Models.Params();
	var state1 = View.prototype.state || new Backbone.Model();
	// defaults
	state1.set({
		paused: false
	});

	APP.Views.Main3D = View.extend({

		el: ".main",

		options: {
			renderTarget: "shadow-root",
			autoRender: false
		},

		state: state1,

		initialize: function( options ){
			//
			_.bindAll(this, "setup");
			// main container(s)
			this.objects = new APP.Collections.Objects();
			this.layers = new APP.Models.Layers();

			if( typeof this.el !== "undefined" ){
				// initiate $3d with some latency to let the DOM "rest"
				setTimeout(this.setup, 100);
			}

			// events
			this.objects.on("find", _.bind(this._find, this) );
			this.layers.on("find", _.bind(this._find, this) );
			this.objects.on("lod", _.bind(this._updateLOD, this) );
			this.layers.on("lod", _.bind(this._updateLOD, this) );
			this.objects.on("pause", _.bind(this.togglePause, this) );
			this.on("pause", _.bind(this.togglePause, this) );

			return View.prototype.initialize.call( this, options );
		},

		// create the 3D environment (watch for live updates)
		setup: function(){
			this.$3d = $(this.el).three({ watch: true }, _.bind(this._start, this) );
			$("body").on("update", this.el, _.bind(this._update, this) );
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
			this.$3d.clock = new THREE.Clock(); // one clock for all $3d?

			// now start the rendering
			this.render();

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

		_updateLOD: function( object ){
			if( !this.$3d.active.camera ) return;
			object.update( this.$3d.active.camera );
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

		togglePause: function( e ){
			this.state.set('paused', !this.state.get('paused') ); // toggle
			// update 3d
			this.$3d.options.paused = this.state.get('paused');
		},

		_unPause: function(){
			this.state.set('paused', false); // toggle
			// update 3d
			this.$3d.options.paused = false;
			// event
			this.trigger("unpause");
		}

	});


	// Meshes

	// in case APP.Mesh has already been defined by a plugin
	var Mesh = APP.Mesh || View;
	// extend existing params is available....
	var params2 = ( Mesh.prototype.params ) ? Mesh.prototype.params : new APP.Models.Params();
	var state2 = Mesh.prototype.state || new Backbone.Model();
	// defaults
	state2.set({
		rendered: false
	});
	// move speed, collission to dynamic mesh...
	APP.Mesh = Mesh.extend({
		options: {
			speed: false,
			bind: "sync"
		},

		state: state2,

		events: {
 			//"css-filter": "_customFilter"
		},

		params: params2,

		initialize: function( options ){
			options = options || {};
			// FIX: reject collections
			if (options.models ) return; // should this be option.collection?
			// data
			this.data = this.data || options.data || this.model || new APP.Models.Mesh();
			if (options.params ) this.params.set( options.params );
			// find the parent
			this.trigger("parent");
			// events
			this.on("update", _.bind(this._update, this));
			this.on("start", _.bind(this._start, this));

			// bind class methods
			_.bindAll(this, '_updateLOD');

			this._setupEvents(); // events object isn't working...

			var self = this;
			// HACK!!! wait till the parent arrives...
			setTimeout(function(){
				return View.prototype.initialize.call(self, options);
			}, 100);
		},

		start: function(){

		},

		toJSON: function(){
			var json = {};
			//
			json.data = this._toJSON();
			json.params = this.params.toJSON();
			// #43 - adding options to the template data
			if( this.options.inRender ) json.options = this.options;
			//
			return json;
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
			this.state.set('rendered', true);
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
			// update level of detail
			if(this.object.objects ){
				this._updateLOD( this.object );
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

		// trigger with debounce!
		_updateLOD: function(){
			this.trigger("lod", this.object);
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

		// Placeholders
		customFilter: function(){

		},

		// Internal
		// - validate is required in backbone models
		_validate: function(){
			return true;
		},

		// setup events
		_setupEvents: function(){
			// events
			$(this.el).on('css-filter',_.bind(this._customFilter, this) );
			//this.el.addEventListener('css-filter', function(){ console.log("dodododod"); }, false);
		},

		_customFilter: function(){
			// user actions
			this.customFilter();
		}

	});

	/* extending Mesh */
	// a static mesh cannot be updated after init
	APP.Meshes.Static = APP.Mesh.extend({

	});

	var params3 = ( APP.Meshes.Static.prototype.params ) ? APP.Meshes.Static.prototype.params : new APP.Models.Params();
	// defaults
	params3.set({
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
	});

	// a dynamic mesh can be updated after init
	APP.Meshes.Dynamic = APP.Meshes.Static.extend({

		options: {
			moveStep: 3, // a 0-10 setting
			rotateStep: 0.5 // 1-0 settting
		},

		params: params3,

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
			var move = this.params.get('move');

			this.moveVector.x = ( -move.left    + move.right );
			this.moveVector.y = ( -move.down    + move.up );
			this.moveVector.z = ( -move.forward + move.back );

			//console.log( 'move:', [ this.moveVector.x, this.moveVector.y, this.moveVector.z ] );

		},

		updateRotationVector: function() {
			var move = this.params.get('move');

			this.rotationVector.x = ( -move.pitchDown + move.pitchUp );
			this.rotationVector.y = ( -move.yawRight  + move.yawLeft );
			this.rotationVector.z = ( -move.rollRight + move.rollLeft );

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


	// Sprites

	APP.Sprite = View.extend({

		// extend existing params is available....
		params: ( View.prototype.params ) ? View.prototype.params.set( params.toJSON() ) : params,

		initialize: function( options ){
			options = options || {};
			// FIX: reject collections
			if (options.models ) return;
			// data
			this.data = this.data || options.data || this.model || new APP.Models.Sprite();
			if (options.params ) this.params.set( options.params );
			this.object = options.object;

			// events
			this.on("update", _.bind(this._update, this));
			//this.on("start", _.bind(this._start, this));
			if( this._start ) this._start();

			var self = this;
			// HACK!!! wait till the parent arrives...
			setTimeout(function(){
				return View.prototype.initialize.call(self, options);
			}, 100);
		},

		_start: function(){

		},

		_update: function(){

		},

		// merge with APP.Mesh.toJSON ?
		toJSON: function(){
			var json = {};
			//
			json.data = this._toJSON();
			json.params = this.params.toJSON();
			// #43 - adding options to the template data
			if( this.options.inRender ) json.options = this.options;
			//
			return json;
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
			this.objects.on("lod", _.bind(this._bubbleLOD, this) );
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
		},

		_bubbleLOD: function( e ){
			this.trigger("lod", e);
		}

	});

//});

});


// Add models after dependencies are laoded
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
			// user-defined startup
			this.start( $3d );
		},

		_update: function( e ){
			// automatic updates
			// - broadcast updates to objects
			for( var i in this.objects.attributes ){
				this.objects.get(i).trigger("update");
			}
			for( var j in this.layers.attributes ){
				this.layers.get(j).trigger("update");
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
		}

	});


	APP.Mesh = View.extend({
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
					this.objects.get(i).trigger("update");
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
	APP.Meshes.Static = APP.Mesh.extend({

	});

	APP.Meshes.Dynamic = APP.Meshes.Static.extend({
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
		}

	});


	APP.Meshes.Avatar = APP.Meshes.Dynamic.extend({
	});


	/* extending Avatar */
	APP.Meshes.NPC = APP.Meshes.Avatar.extend({
	});


	APP.Meshes.Player = APP.Meshes.Avatar.extend({
	});


	APP.Sprite = View.extend({
	});


	/* extending Sprite */
	APP.Sprites.Static = APP.Sprite.extend({
	});

	APP.Sprites.Animated = APP.Sprite.extend({
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
				this.objects.get(i).trigger("update");
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

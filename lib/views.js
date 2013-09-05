
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
			}
		}

	});


	APP.Mesh = View.extend({
		options: {
			speed: false
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
			// data
			this.data = this.data || options.data || this.model || new APP.Models.Mesh();
			// events
			this.on("update", _.bind(this._update, this));

			return View.prototype.initialize.apply(this, arguments);
		},

		start: _.once(function(){
			console.log(this.data.get(position) );
			//this.object.position.set( position.x, position.y, position.z );
		}),
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
			// set the initial attributes (once)
			//this.start();

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

			// user-defined updates
			this.update( e );
		},

		update: function( e ){
			// executed on every tick

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
			this.objects = [];
			//var models = models || [];

			//if( options.collection ){
			//	models = options.collection;
			//	delete options.collection;
			for(var i = 0; i < models.length ; i++){
				var model = models.get(i) || {};
				var object = new this.model({
					parentEl: this.el,
					renderTarget: this.el,
					//model: model,
					append: true
				});
				this._setupObject( object );
				this.objects.push( object );
				// add event listeners
			}
			//}

			// Event listeners
			this.on("update", _.bind(this._update, this) );

			//this.object = options.object || this.options.object || this.object || APP.Mesh;

			//return APP.Collection.prototype.initialize.call(this, models, options);
		},

		update: function( e ){

		},

		// Internal
		_update: function( e ){
			// automatic updates
			// - broadcast updates to objects
			for( var i in this.objects ){
				this.objects[i].trigger("update");
			}
			// user-defined updates
			this.update( e );
		},

		_setupObject: function( object ){
			var self = this;

			if( object.state.rendered ){

				this.trigger("find", object);
			}
			// for future events
			object.on("render", function(){
				self.trigger("find", object);
			});

		}

	});

//});

});

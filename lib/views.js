
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

			// create the 3D environment (watch for live updates)
			this.$3d = $(this.el).three({ watch: true }, _.bind(this._start, this) );

			// events
			$("body").on("update", this.el, _.bind(this._update, this) );
			this.objects.on("find", _.bind(this._find, this) );

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
			// user-defined updates
			this.update( e );
		},

		_find: function( e ){
			var id = $(e.el).find("[data-id]").attr("data-id");
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

		initialize: function(){
			// events
			this.on("update", _.bind(this._update, this));

			return View.prototype.initialize.apply(this, arguments);
		},
		/*
		preRender: function(){

		},
		render: function(){

		}
		,*/
		postRender: function(){
			// set state
			this.state.rendered = true;
			this.trigger("render");
		},

		_update: function( e ){
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


//});

});

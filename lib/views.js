
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


	APP.Mesh = View.extend({

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

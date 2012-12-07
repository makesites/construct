//require(["backbone.app", "jquery.three"], function(){ 


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
	
	
	
//});

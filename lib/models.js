
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

	APP.Collections.Users = Collection.extend({
	});

	APP.Collections.Assets = Collection.extend({
	});

	APP.Collections.Objects = Backbone.Model.extend({

		set: function( objects ){
			// set event listeners
			for( var i in objects ){
				this._setupObject( objects[i] );
			}
			return Backbone.Model.prototype.set.apply(this, arguments);
		},

		_setupObject: function( object ){
			var self = this;

			if( object.state.rendered ){
				this.trigger("find", object);
			} else {
				object.on("render", function(){
					self.trigger("find", object);
				});
			}
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

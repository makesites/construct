
// Add models after dependencies are laoded
construct.promise.add(function(){
	//require(["backbone.app"], function(){

	// reference in the APP namespace
	if( typeof APP == "undefined" ) window.APP = {};
	// fallbacks
	var Model = APP.Model || Backbone.Model;
	var Collection = APP.Collection || Backbone.Collection;

	/* construct-specific params */
	APP.Models.Params = Backbone.Model.extend({
		defaults: {
		}
	});

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

	APP.Models.Sprite = Model.extend({
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
			object.on("lod", function( e ){
				self.trigger("lod", e);
			});
			object.on("pause", function( e ){
				self.trigger("pause", e);
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
				object.on("find", _.bind(this._bubbleFind, this) );
				object.on("lod", _.bind(this._bubbleLOD, this) );
			}
			return Backbone.Model.prototype.set.apply(this, arguments);
		},

		_bubbleFind: function( e ){
			this.trigger("find", e);
		},

		_bubbleLOD: function( e ){
			this.trigger("lod", e);
		}

	});

	//});
});

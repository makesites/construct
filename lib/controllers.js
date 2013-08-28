
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
			//this.layout = new APP.Layouts.Default({ data : this.data });
		}
	});

	//});
});

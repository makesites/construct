
// Add models after dependencies are laoded
construct.promise.add(function(){
	//require(["backbone.app"], function(){

	// reference in the APP namespace
	if( typeof APP == "undefined" ) window.APP = {};
	// fallbacks
	var Router = APP.Router || Backbone.Router;

	APP.Routers.User = Router.extend({
		initialize: function(){

		}
	});

	//});
});

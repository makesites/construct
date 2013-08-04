
// Add models after dependencies are laoded
construct.promise.add(function(){
	require(["backbone.app"], function(){
	
		APP.Models.User = APP.Model.extend({
			defaults: {
				admin : true
			}
		});
	
		APP.Models.Asset = APP.Model.extend({
			defaults: {
				x : 0,
				y : 0,
				editable : true
			}
		});
	
		APP.Collections.Users = APP.Collection.extend({
		});
	
		APP.Collections.Assets = APP.Collection.extend({
		});
	
	});
});

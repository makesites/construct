// Utils

// - Internal promise method...
var Promise = function(obj) {
	var args = null;
	var callbacks = [];
	var resolved = false;

	this.add = function(callback) {
		if (resolved) {
			callback.apply(obj, args);
		} else {
			callbacks.push(callback);
		}
	};

	this.resolve = function() {
		if (!resolved) {
			args = arguments;
			resolved = true;

			var callback = callbacks.shift();
			while (callback) {
				callback.apply(obj, arguments);
				callback = callbacks.shift();
			}

			callbacks = null;
		}
	};
};

var utils = {
	uuid: function(){
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
	},

	// Common.js extend method: https://github.com/commons/common.js
	extend: function(){
		var objects = Array.prototype.slice.call( arguments ); // to array?
		var destination = {};
		for( var obj in objects ){
			var source = objects[obj];
			for (var property in source){
				if (source[property] && source[property].constructor && source[property].constructor === Object) {
					destination[property] = destination[property] || {};
					destination[property] = arguments.callee(destination[property], source[property]);
				} else {
					destination[property] = source[property];
				}
			}
		}
		return destination;
	}

};

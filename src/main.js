(function() {
	// Creates an object based in the HTML Element prototype
	var el = Object.create(HTMLElement.prototype);
	var $3d;

	// Fires when an instance of the element is created
	el.createdCallback = function() {

		// gather options
		var options = {};
		// ...
		options.el = this;
		// init
		$( this ).three(function( context ){
			// save 3d context
			$3d = context;
			// create ShadowDOM
			// ...
		});

	};

	// Fires when an instance was inserted into the document
	el.attachedCallback = function() {};

	// Fires when an instance was removed from the document
	el.detachedCallback = function() {
		view.destroy();
	};

	// Fires when an attribute was added, removed, or updated
	el.attributeChangedCallback = function(attr, oldVal, newVal) {};

	document.registerElement('construct-3d', {
		prototype: el
	});

}());

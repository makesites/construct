!function(){var t=function(t){var e=null,i=[],n=!1;this.add=function(s){n?s.apply(t,e):i.push(s)},this.resolve=function(){if(!n){e=arguments,n=!0;for(var s=i.shift();s;)s.apply(t,arguments),s=i.shift();i=null}}};Object.extend=function(t,e){for(var i in e)e[i]&&e[i].constructor&&e[i].constructor===Object?(t[i]=t[i]||{},arguments.callee(t[i],e[i])):t[i]=e[i];return t};var e={uuid:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=0|16*Math.random(),i="x"==t?e:8|3&e;return i.toString(16)})}},i={"en-US":{error:{"no-backbone":"Backbone is not available: http://backbonejs.org/","no-jquery":"jQuery is not available: http://jquery.com/","no-jquery-three":"jQuery Three is required: http://github.com/makesites/jquery-three","no-backbone-app":"This function requires Backbone APP: http://github.com/makesites/backbone-app"}}};construct=function(t,e){t.libs&&Object.extend(construct.config,t.libs),e&&(construct.callback=e),require.config(construct.config),require(construct.config.deps,construct.init)},construct.init=function(){construct.promise.resolve();var t=new APP;window.app=t,Backbone.history.start(),construct.callback&&construct.callback(t)},construct.register=function(t){t&&t.update&&construct.loop.push(t.update)},construct.configure=function(t){construct.promise.add(t)},construct.lang=function(t){Object.extend(i,t)},construct.loop=[],construct.update=function(){},construct.log=function(t,e){if(t&&e){var n=navigator.language?navigator.language:navigator.userLanguage,s=i[n][t][e]||i["en-US"][t][e]||t+": "+e;console.log(s)}},construct.promise=new t,construct.config={paths:{jquery:["//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min"],json3:["//cdnjs.cloudflare.com/ajax/libs/json3/3.2.4/json3.min"],underscore:["//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min"],handlebars:["//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.0/handlebars.min"],backbone:["//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min"],"three-js":["//cdnjs.cloudflare.com/ajax/libs/three.js/r58/three.min"],"backbone.app":["//rawgithub.com/makesites/backbone-app/master/build/backbone.app"],"jquery.three":["//rawgithub.com/makesites/jquery-three/master/build/jquery.three"]},shim:{jquery:{deps:["json3"]},underscore:{exports:"_"},backbone:{deps:["underscore","jquery"],exports:"Backbone"},"backbone.app":{deps:["backbone","underscore","jquery"]},"jquery.three":{deps:["jquery","three-js"]}},deps:["backbone.app","jquery.three","handlebars"]},construct.promise.add(function(){"undefined"==typeof APP&&(window.APP={});var t=APP.Model||Backbone.Model,i=APP.Collection||Backbone.Collection;APP.Models.User=t.extend({defaults:{admin:!0}}),APP.Models.Asset=t.extend({defaults:{x:0,y:0,editable:!0}}),APP.Models.Mesh=t.extend({defaults:{position:[0,0,0],rotation:[0,0,0],scale:[1,1,1]}}),APP.Collections.Users=i.extend({}),APP.Collections.Assets=i.extend({}),APP.Collections.Objects=Backbone.Model.extend({initialize:function(t){return this.length=0,Backbone.Model.prototype.initialize.call(this,t)},set:function(t,e,i){if(i=i||{},i.unset)this.length--;else for(var n in t)t[n]._name=n,this.length++,this._setupObject(t[n]);return Backbone.Model.prototype.set.apply(this,arguments)},add:function(t){var i={},n=e.uuid();i[n]=t,this.set(i)},_setupObject:function(t){var e=this;t.state.rendered&&(this.trigger("find",t),this.trigger("parent",t)),t.on("parent",function(){e.trigger("parent",t)}),t.on("render",function(){e.trigger("find",t)}),t.on("find",function(t){e.trigger("find",t)}),t.on("remove",_.bind(this._removed,this))},_removed:function(t){this.unset(t._name)}}),APP.Models.Layers=Backbone.Model.extend({set:function(t){for(var e in t){var i=t[e];i.on("find",_.bind(this.bubble,this))}return Backbone.Model.prototype.set.apply(this,arguments)},bubble:function(t){this.trigger("find",t)}})}),construct.promise.add(function(){"undefined"==typeof APP&&(window.APP={}),APP.Model||Backbone.Model,APP.Collection||Backbone.Collection;var t=APP.View||Backbone.View;APP.Layout||Backbone.Layout,APP.Layers={},APP.Meshes={},APP.Sprites={},APP.Actors={},APP.Views.Main3D=APP.View.extend({el:".main",options:{renderTarget:"shadow-root"},initialize:function(t){return this.objects=new APP.Collections.Objects,this.layers=new APP.Models.Layers,this.$3d=$(this.el).three({watch:!0},_.bind(this._start,this)),$("body").on("update",this.el,_.bind(this._update,this)),this.objects.on("find",_.bind(this._find,this)),this.layers.on("find",_.bind(this._find,this)),APP.View.prototype.initialize.call(this,t)},start:function(){},update:function(){},_start:function(t){this.$3d=t,this.start(t)},_update:function(t){for(var e in this.objects.attributes)this.objects.get(e).trigger("update");for(var i in this.layers.attributes)this.layers.get(i).trigger("update");this.update(t)},_find:function(t){var e=$(t.el).find("[data-id]").length>0?$(t.el).find("[data-id]").attr("data-id"):$(t.el).attr("data-id");if(!_.isUndefined(e)){var i=this.$3d.get(e);t.object=i,t.trigger("start")}}}),APP.Mesh=t.extend({options:{speed:!1,bind:"sync"},state:{rendered:!1},initialize:function(e){if(e=e||{},!e.models){this.data=this.data||e.data||this.model||new APP.Models.Mesh,this.trigger("parent"),this.on("update",_.bind(this._update,this)),this.on("start",_.bind(this._start,this));var i=this;setTimeout(function(){return t.prototype.initialize.call(i,e)},100)}},start:function(){},_start:function(){var t=this.data.get("position"),e=APP.Models.Mesh.prototype.defaults.position;t!==e&&this.object.position.set(t[0],t[1],t[2]);var i=this.data.get("rotation"),n=APP.Models.Mesh.prototype.defaults.rotation;i!==n&&this.object.rotation.set(i[0],i[1],i[2]);var s=this.data.get("scale"),o=APP.Models.Mesh.prototype.defaults.scale;s!==o&&this.object.scale.set(s[0],s[1],s[2]),this.start()},_postRender:function(){return this.state.rendered=!0,this.trigger("render"),t.prototype._postRender.call(this)},_update:function(t){if(_.isUndefined(this.object))return this.trigger("render");if(this.options.speed&&this.object){var e=this.options.speed,i=this.object.position;e.x&&(i.x+=e.x),e.y&&(i.y+=e.y),e.z&&(i.z+=e.z),this.object.position.set(i.x,i.y,i.z)}if(this.objects)for(var n in this.objects.attributes)this.objects.get(n).trigger("update");this.update(t)},update:function(){},remove:function(){this.trigger("remove",this);var e=this.object.parent;return e&&e.remove(this.object),this.undelegateEvents(),this.$el.removeData().unbind(),t.prototype.remove.call(this)},_validate:function(){return!0}}),APP.Meshes.Static=APP.Mesh.extend({}),APP.Meshes.Dynamic=APP.Meshes.Static.extend({initialize:function(t){return this.objects=new APP.Collections.Objects,this.objects.on("find",_.bind(this._find,this)),this.objects.on("parent",_.bind(this._self,this)),APP.Meshes.Static.prototype.initialize.call(this,t)},_find:function(t){this.trigger("find",t)},_self:function(t){t.parent=this.object?this.object:null}}),APP.Meshes.Avatar=APP.Meshes.Dynamic.extend({}),APP.Meshes.NPC=APP.Meshes.Avatar.extend({}),APP.Meshes.Player=APP.Meshes.Avatar.extend({}),APP.Sprite=t.extend({}),APP.Sprites.Static=APP.Sprite.extend({}),APP.Sprites.Animated=APP.Sprite.extend({}),APP.Views.Asset=t.extend({}),APP.Layer=Backbone.Collection.extend({initialize:function(t,e){this.el=this.el||e.el||null,this.objects=new APP.Collections.Objects;for(var i=0;i<t.length;i++){var n=t.get(i)||{};this.add(n)}return this.on("update",_.bind(this._update,this)),this.objects.on("find",_.bind(this._find,this)),this.objects.on("change",_.bind(this._refresh,this)),APP.Collection.prototype.initialize.call(this,null,e)},add:function(t){t=t||{};var e=new this.model({parentEl:this.el,renderTarget:this.el,append:!0});this.objects.add(e)},update:function(){},refresh:function(){},_update:function(t){for(var e in this.objects.attributes)this.objects.get(e).trigger("update");this.update(t)},_refresh:function(t){this.refresh(t)},_find:function(t){this.trigger("find",t)}})}),construct.promise.add(function(){"undefined"==typeof APP&&(window.APP={});var t=APP.Router||Backbone.Router;APP.Routers.Default=APP.Routers.Default||t.extend({initialize:function(e){return _.bindAll(this,"index"),this.data=new Backbone.Model,console.log("init","APP.Routers.Default"),t.prototype.initialize.call(this,e)},routes:{"":"index"},index:function(){console.log("Construct.js is running..."),_.isUndefined(APP.Main)||(this.main=new APP.Main({data:this.data}))}})})}();
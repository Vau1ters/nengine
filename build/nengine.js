// Generated by Haxe 4.0.0-preview.5+7eb789f
(function () { "use strict";
var HxOverrides = function() { };
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var ecs_Component = function() { };
var nengine_components_Transformable = function() { };
var nengine_components_Transform2 = function(position,x,y) {
	this.parent = null;
	this.name = "Transform2";
	if(position != null) {
		this.local = position;
	} else {
		var this1 = new nengine_math_Vec2Data(x != null ? x : 0,y != null ? y : 0);
		this.local = this1;
	}
};
nengine_components_Transform2.__interfaces__ = [nengine_components_Transformable,ecs_Component];
nengine_components_Transform2.prototype = {
	get_global: function() {
		if(this.parent != null) {
			var v1 = this.local;
			var v2 = this.parent.get_global();
			var this1 = new nengine_math_Vec2Data(v1.x + v2.x,v1.y + v2.y);
			return this1;
		} else {
			return this.local;
		}
	}
	,set_global: function(position) {
		var tmp;
		if(this.parent != null) {
			var v1 = this.local;
			var v2 = this.parent.get_global();
			var this1 = new nengine_math_Vec2Data(v1.x - v2.x,v1.y - v2.y);
			tmp = this1;
		} else {
			tmp = position;
		}
		return this.global = tmp;
	}
};
var nengine_math__$Vec2_Vec2_$Impl_$ = {};
nengine_math__$Vec2_Vec2_$Impl_$._new = function(x,y) {
	var this1 = new nengine_math_Vec2Data(x,y);
	return this1;
};
nengine_math__$Vec2_Vec2_$Impl_$.$length = function(this1) {
	return Math.sqrt(this1.x * this1.x + this1.y * this1.y);
};
nengine_math__$Vec2_Vec2_$Impl_$.normalize = function(this1) {
	var l = Math.sqrt(this1.x * this1.x + this1.y * this1.y);
	var this2 = new nengine_math_Vec2Data(this1.x / l,this1.y / l);
	return this2;
};
nengine_math__$Vec2_Vec2_$Impl_$.minus = function(v) {
	var this1 = new nengine_math_Vec2Data(-v.x,-v.y);
	return this1;
};
nengine_math__$Vec2_Vec2_$Impl_$.add = function(v1,v2) {
	var this1 = new nengine_math_Vec2Data(v1.x + v2.x,v1.y + v2.y);
	return this1;
};
nengine_math__$Vec2_Vec2_$Impl_$.sub = function(v1,v2) {
	var this1 = new nengine_math_Vec2Data(v1.x - v2.x,v1.y - v2.y);
	return this1;
};
nengine_math__$Vec2_Vec2_$Impl_$.equals = function(v1,v2) {
	if(v1.x == v2.x) {
		return v1.y == v2.y;
	} else {
		return false;
	}
};
nengine_math__$Vec2_Vec2_$Impl_$.dot = function(this1,v) {
	return this1.x * v.x + this1.y * v.y;
};
nengine_math__$Vec2_Vec2_$Impl_$.cross = function(this1,v) {
	return this1.x * v.y - this1.y * v.x;
};
var nengine_math_Vec2Data = function(x,y) {
	this.x = x;
	this.y = y;
};
nengine_math_Vec2Data.prototype = {
	iterator: function() {
		return HxOverrides.iter([this.x,this.y]);
	}
};
})();

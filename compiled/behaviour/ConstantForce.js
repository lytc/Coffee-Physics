/* Constant Force Behaviour
*/
var ConstantForce,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

ConstantForce = (function(_super) {

  __extends(ConstantForce, _super);

  function ConstantForce(force) {
    this.force = force != null ? force : new Vector();
    ConstantForce.__super__.constructor.apply(this, arguments);
  }

  ConstantForce.prototype.apply = function(p, dt, index) {
    return p.acc.add(this.force);
  };

  return ConstantForce;

})(Behaviour);
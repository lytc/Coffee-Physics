// Generated by CoffeeScript 1.4.0
/* Quadtree
*/

var Quadtree;

Quadtree = (function() {
  var Node;
  Node = (function() {

    function Node(maxDepth, maxItems, depth) {
      this.maxDepth = maxDepth != null ? maxDepth : 4;
      this.maxItems = maxItems != null ? maxItems : 4;
      this.depth = depth != null ? depth : 0;
      this.hasChildren = this.depth < this.maxDepth;
      this.hasDivided = false;
      this.items = [];
      if (this.hasChildren) {
        this.q1 = new Node(this.maxDepth, this.maxItems, this.depth + 1);
        this.q2 = new Node(this.maxDepth, this.maxItems, this.depth + 1);
        this.q3 = new Node(this.maxDepth, this.maxItems, this.depth + 1);
        this.q4 = new Node(this.maxDepth, this.maxItems, this.depth + 1);
      }
    }

    Node.prototype.resize = function(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.hw = this.w / 2;
      this.hh = this.h / 2;
      this.cx = this.x + this.hw;
      this.cy = this.y + this.hh;
      if (this.hasChildren) {
        this.q1.resize(this.x, this.y, this.hw, this.hh);
        this.q2.resize(this.cx, this.y, this.hw, this.hh);
        this.q3.resize(this.cx, this.cy, this.hw, this.hh);
        return this.q4.resize(this.x, this.cy, this.hw, this.hh);
      }
    };

    Node.prototype.insert = function(item) {
      var i, quad, _i, _ref, _results;
      if (this.hasDivided) {
        if (item.pos.y + item.radius < this.cy) {
          if (item.pos.x + item.radius < this.cx) {
            quad = this.q1;
          }
        } else if (item.pos.x - item.radius > this.cx) {
          quad = this.q2;
        }
        if (item.pos.y - item.radius > this.cy) {
          if (item.pos.x - item.radius > this.cx) {
            quad = this.q3;
          }
        } else if (item.pos.x + item.radius < this.cx) {
          quad = this.q4;
        }
        if (quad) {
          quad.insert(item);
          return;
        }
      }
      this.items.push(item);
      if (this.items.length >= this.maxItems && this.depth < this.maxDepth) {
        this.hasDivided = true;
        _results = [];
        for (i = _i = _ref = this.items.length - 1; _i >= 0; i = _i += -1) {
          item = this.items[i];
          quad = null;
          if (item.pos.y + item.radius < this.cy) {
            if (item.pos.x + item.radius < this.cx) {
              quad = this.q1;
            }
          } else if (item.pos.x - item.radius > this.cx) {
            quad = this.q2;
          }
          if (item.pos.y1 > this.cy) {
            if (item.pos.x - item.radius > this.cx) {
              quad = this.q3;
            }
          } else if (item.pos.x + item.radius < this.cx) {
            quad = this.q4;
          }
          if (quad) {
            this.items.splice(i, 1);
            _results.push(quad.insert(item));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    };

    Node.prototype.update = function(particles) {
      var particle, _i, _len, _results;
      this.clear();
      _results = [];
      for (_i = 0, _len = particles.length; _i < _len; _i++) {
        particle = particles[_i];
        _results.push(this.insert(particle));
      }
      return _results;
    };

    Node.prototype.search = function(item, buffer) {
      var quad, _i, _len, _ref;
      if (buffer == null) {
        buffer = [];
      }
      buffer = buffer || [];
      if (item.pos.y + item.radius < this.cy) {
        if (item.pos.x + item.radius < this.cx) {
          quad = this.q1;
        }
      } else if (item.pos.x - item.radius > this.cx) {
        quad = this.q2;
      }
      if (item.pos.y - item.radius > this.cy) {
        if (item.pos.x - item.radius > this.cx) {
          quad = this.q3;
        }
      } else if (item.pos.x + item.radius < this.cx) {
        quad = this.q4;
      }
      if (quad && this.hasDivided) {
        quad.search(item, buffer);
      }
      _ref = this.items;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        buffer.push(item);
      }
      return buffer;
    };

    Node.prototype.clear = function() {
      this.hasDivided = false;
      this.items.length = 0;
      if (this.hasChildren) {
        this.q1.clear();
        this.q2.clear();
        this.q3.clear();
        return this.q4.clear();
      }
    };

    Node.prototype.draw = function(ctx) {
      ctx.strokeStyle = 'rgba(255,0,255,0.25)';
      ctx.lineWidth = 1;
      ctx.strokeRect(this.x, this.y, this.w, this.h);
      if (this.hasChildren && this.hasDivided) {
        this.q1.draw(ctx);
        this.q2.draw(ctx);
        this.q3.draw(ctx);
        return this.q4.draw(ctx);
      }
    };

    return Node;

  })();
  return Node;
})();
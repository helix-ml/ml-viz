'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var d3Selection = require('d3-selection');
var d3Scale = require('d3-scale');
var d3Hierarchy = require('d3-hierarchy');
var d3Transition = require('d3-transition');
var d3Interpolate = require('d3-interpolate');
var zoomable = _interopDefault(require('d3-zoomable'));
var Kapsule = _interopDefault(require('kapsule'));
var tinycolor = _interopDefault(require('tinycolor2'));
var accessorFn = _interopDefault(require('accessor-fn'));

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') {
    return;
  }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".icicle-viz {\n  cursor: move;\n}\n\n.icicle-viz rect {\n  cursor: pointer;\n  transition: opacity .4s;\n}\n\n.icicle-viz rect:hover {\n  opacity: 0.85;\n  transition: opacity .05s;\n}\n\n.icicle-viz text {\n  font-family: sans-serif;\n  font-size: 12px;\n  dominant-baseline: middle;\n  pointer-events: none;\n  fill: #404041;\n}\n\n.icicle-viz text.light {\n  fill: #F7F7F7;\n}\n\n.icicle-tooltip {\n  display: none;\n  position: absolute;\n  max-width: 320px;\n  white-space: nowrap;\n  padding: 5px;\n  border-radius: 3px;\n  font: 12px sans-serif;\n  color: #eee;\n  background: rgba(0,0,0,0.65);\n  pointer-events: none;\n}\n\n.icicle-tooltip .tooltip-title {\n  font-weight: bold;\n  text-align: center;\n  margin-bottom: 5px;\n}";
styleInject(css_248z);

var LABELS_WIDTH_OPACITY_SCALE = d3Scale.scaleLinear().domain([4, 8]).clamp(true); // px per char

var LABELS_HEIGHT_OPACITY_SCALE = d3Scale.scaleLinear().domain([15, 40]).clamp(true); // available height in px

var TRANSITION_DURATION = 800;
var icicle = Kapsule({
  props: {
    width: {
      "default": window.innerWidth,
      onChange: function onChange(_, state) {
        state.needsReparse = true;
      }
    },
    height: {
      "default": window.innerHeight,
      onChange: function onChange(_, state) {
        state.needsReparse = true;
      }
    },
    orientation: {
      "default": 'lr',
      // td, bu, lr, rl
      onChange: function onChange(_, state) {
        this.zoomReset();
        state.needsReparse = true;
      }
    },
    data: {
      onChange: function onChange() {
        this._parseData();
      }
    },
    children: {
      "default": 'children',
      onChange: function onChange(_, state) {
        state.needsReparse = true;
      }
    },
    sort: {
      onChange: function onChange(_, state) {
        state.needsReparse = true;
      }
    },
    label: {
      "default": function _default(d) {
        return d.name;
      }
    },
    size: {
      "default": 'value',
      onChange: function onChange(_, state) {
        this.zoomReset();
        state.needsReparse = true;
      }
    },
    color: {
      "default": function _default(d) {
        return 'lightgrey';
      }
    },
    minSegmentWidth: {
      "default": .8
    },
    excludeRoot: {
      "default": false,
      onChange: function onChange(_, state) {
        state.needsReparse = true;
      }
    },
    showLabels: {
      "default": true
    },
    showTooltip: {
      "default": function _default(d) {
        return true;
      },
      triggerUpdate: false
    },
    tooltipTitle: {
      "default": null,
      triggerUpdate: false
    },
    tooltipContent: {
      "default": function _default(d) {
        return '';
      },
      triggerUpdate: false
    },
    onClick: {
      triggerUpdate: false
    },
    onHover: {
      triggerUpdate: false
    }
  },
  methods: {
    zoomBy: function zoomBy(state, k) {
      state.zoom.zoomBy(k, TRANSITION_DURATION);
      return this;
    },
    zoomReset: function zoomReset(state) {
      state.zoom.zoomReset(TRANSITION_DURATION);
      return this;
    },
    zoomToNode: function zoomToNode(state) {
      var d = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var node = d.__dataNode;

      if (node) {
        var horiz = state.orientation === 'lr' || state.orientation === 'rl';
        var scale = state[horiz ? 'height' : 'width'] / (node.x1 - node.x0);
        var tr = -node.x0;
        state.zoom.zoomTo({
          x: horiz ? 0 : tr,
          y: horiz ? tr : 0,
          k: scale
        }, TRANSITION_DURATION);
      }

      return this;
    },
    _parseData: function _parseData(state) {
      if (state.data) {
        var hierData = d3Hierarchy.hierarchy(state.data, accessorFn(state.children)).sum(accessorFn(state.size));

        if (state.sort) {
          hierData.sort(state.sort);
        }

        var horiz = state.orientation === 'lr' || state.orientation === 'rl';
        var size = [state.width, state.height];
        horiz && size.reverse();
        d3Hierarchy.partition() //.padding(1)
        //.round(true)
        .size(size)(hierData);
        hierData.descendants().forEach(function (d, i) {
          d.id = i; // Mark each node with a unique ID

          d.data.__dataNode = d; // Dual-link data nodes
        });

        if (state.excludeRoot) {
          // re-scale y values if excluding root
          var yScale = d3Scale.scaleLinear().domain([hierData.y1 - hierData.y0, size[1]]).range([0, size[1]]);
          hierData.descendants().forEach(function (d) {
            d.y0 = yScale(d.y0);
            d.y1 = yScale(d.y1);
          });
        }

        state.layoutData = hierData.descendants().filter(function (d) {
          return d.y0 >= 0;
        });
      }
    }
  },
  stateInit: function stateInit() {
    return {
      zoom: zoomable()
    };
  },
  init: function init(domNode, state) {
    var _this = this;

    var el = d3Selection.select(domNode).append('div').attr('class', 'icicle-viz');
    state.svg = el.append('svg');
    state.canvas = state.svg.append('g'); // tooltips

    state.tooltip = d3Selection.select('body').append('div').attr('class', 'chart-tooltip icicle-tooltip'); // tooltip cleanup on unmount

    domNode.addEventListener('DOMNodeRemoved', function (e) {
      if (e.target === this) {
        state.tooltip.remove();
      }
    });
    state.canvas.on('mousemove', function () {
      state.tooltip.style('left', d3Selection.event.pageX + 'px').style('top', d3Selection.event.pageY + 'px').style('transform', "translate(-".concat(d3Selection.event.offsetX / state.width * 100, "%, 21px)")); // adjust horizontal position to not exceed canvas boundaries
    }); // zoom/pan

    state.zoom(state.svg).svgEl(state.canvas).onChange(function (tr, prevTr, duration) {
      if (state.showLabels && !duration) {
        // Scale labels immediately if not animating
        var horiz = state.orientation === 'lr' || state.orientation === 'rl';
        var scale = 1 / tr.k;
        state.canvas.selectAll('text').attr('transform', horiz ? "scale(1, ".concat(scale, ")") : "scale(".concat(scale, ",1)"));
      } // Prevent using transitions when using mouse wheel to zoom


      state.skipTransitionsOnce = !duration;

      state._rerender();
    });
    state.svg.on('click', function () {
      return (state.onClick || _this.zoomReset)(null);
    }) // By default reset zoom when clicking on canvas
    .on('mouseover', function () {
      return state.onHover && state.onHover(null);
    });
  },
  update: function update(state) {
    var _this2 = this;

    if (state.needsReparse) {
      this._parseData();

      state.needsReparse = false;
    }

    state.svg.style('width', state.width + 'px').style('height', state.height + 'px');
    var horiz = state.orientation === 'lr' || state.orientation === 'rl';
    state.zoom.translateExtent([[0, 0], [state.width, state.height]]).enableX(!horiz).enableY(horiz);
    if (!state.layoutData) return;
    var zoomTr = state.zoom.current();
    var cell = state.canvas.selectAll('.node').data(state.layoutData.filter(function (d) {
      return (// Show only segments in scene that are wider than the threshold
        d.x1 >= -zoomTr[horiz ? 'y' : 'x'] / zoomTr.k && d.x0 <= (horiz ? state.height - zoomTr.y : state.width - zoomTr.x) / zoomTr.k && d.x1 - d.x0 >= state.minSegmentWidth / zoomTr.k
      );
    }), function (d) {
      return d.id;
    });
    var nameOf = accessorFn(state.label);
    var colorOf = accessorFn(state.color);
    var animate = !state.skipTransitionsOnce;
    state.skipTransitionsOnce = false;
    var transition = d3Transition.transition().duration(animate ? TRANSITION_DURATION : 0);
    var x0 = {
      td: function td(d) {
        return d.x0;
      },
      bu: function bu(d) {
        return d.x0;
      },
      lr: function lr(d) {
        return d.y0;
      },
      rl: function rl(d) {
        return state.width - d.y1;
      }
    }[state.orientation];
    var x1 = {
      td: function td(d) {
        return d.x1;
      },
      bu: function bu(d) {
        return d.x1;
      },
      lr: function lr(d) {
        return d.y1;
      },
      rl: function rl(d) {
        return state.width - d.y0;
      }
    }[state.orientation];
    var y0 = {
      td: function td(d) {
        return d.y0;
      },
      bu: function bu(d) {
        return state.height - d.y1;
      },
      lr: function lr(d) {
        return d.x0;
      },
      rl: function rl(d) {
        return d.x0;
      }
    }[state.orientation];
    var y1 = {
      td: function td(d) {
        return d.y1;
      },
      bu: function bu(d) {
        return state.height - d.y0;
      },
      lr: function lr(d) {
        return d.x1;
      },
      rl: function rl(d) {
        return d.x1;
      }
    }[state.orientation]; // Exiting

    cell.exit().transition(transition).remove(); // Entering

    var newCell = cell.enter().append('g').attr('class', 'node').attr('transform', function (d) {
      return "translate(\n        ".concat(x0(d) + (x1(d) - x0(d)) * (horiz ? 0 : 0.5), ",\n        ").concat(y0(d) + (y1(d) - y0(d)) * (horiz ? 0.5 : 0), "\n      )");
    });
    newCell.append('rect').attr('id', function (d) {
      return "rect-".concat(d.id);
    }).attr('width', function (d) {
      return horiz ? "".concat(x1(d) - x0(d) - 1) : 0;
    }).attr('height', function (d) {
      return horiz ? 0 : "".concat(y1(d) - y0(d) - 1);
    }).on('click', function (d) {
      d3Selection.event.stopPropagation();

      (state.onClick || _this2.zoomToNode)(d.data);
    }).on('mouseover', function (d) {
      d3Selection.event.stopPropagation();
      state.onHover && state.onHover(d.data);
      state.tooltip.style('display', state.showTooltip(d.data, d) ? 'inline' : 'none');
      state.tooltip.html("\n          <div class=\"tooltip-title\">\n            ".concat(state.tooltipTitle ? state.tooltipTitle(d.data, d) : getNodeStack(d).slice(state.excludeRoot ? 1 : 0).map(function (d) {
        return nameOf(d.data);
      }).join(' &rarr; '), "\n          </div>\n          ").concat(state.tooltipContent(d.data, d), "\n        "));
    }).on('mouseout', function () {
      state.tooltip.style('display', 'none');
    });
    newCell.append('clipPath').attr('id', function (d) {
      return "clip-".concat(d.id);
    }).append('use').attr('xlink:href', function (d) {
      return "#rect-".concat(d.id);
    });
    newCell.append('g').attr('clip-path', function (d) {
      return "url(#clip-".concat(d.id, ")");
    }).append('g').attr('class', 'label-container').attr('transform', function (d) {
      return "translate(\n          ".concat(state.orientation === 'lr' ? 4 : state.orientation === 'rl' ? x1(d) - x0(d) - 4 : 0, ",\n          ").concat(horiz ? 0 : (y1(d) - y0(d)) / 2, "\n        )");
    }).append('text').attr('class', 'path-label'); // Entering + Updating

    var allCells = cell.merge(newCell);
    allCells.transition(transition).attr('transform', function (d) {
      return "translate(".concat(x0(d), ",").concat(y0(d), ")");
    });
    allCells.select('rect').transition(transition).attr('width', function (d) {
      return "".concat(x1(d) - x0(d) - (horiz ? 1 : 0));
    }).attr('height', function (d) {
      return "".concat(y1(d) - y0(d) - (horiz ? 0 : 1));
    }).style('fill', function (d) {
      return colorOf(d.data, d.parent);
    });
    allCells.select('g.label-container').style('display', state.showLabels ? null : 'none').transition(transition).attr('transform', function (d) {
      return "translate(\n          ".concat(state.orientation === 'lr' ? 4 : state.orientation === 'rl' ? x1(d) - x0(d) - 4 : (x1(d) - x0(d)) / 2, ",\n          ").concat((y1(d) - y0(d)) / 2, "\n        )");
    });

    if (state.showLabels) {
      // Update previous scale
      var prevK = state.prevK || 1;
      state.prevK = zoomTr.k;
      allCells.select('text.path-label').classed('light', function (d) {
        return !tinycolor(colorOf(d.data, d.parent)).isLight();
      }).style('text-anchor', state.orientation === 'lr' ? 'start' : state.orientation === 'rl' ? 'end' : 'middle').text(function (d) {
        return nameOf(d.data);
      }).transition(transition).style('opacity', function (d) {
        return horiz ? LABELS_HEIGHT_OPACITY_SCALE((y1(d) - y0(d)) * zoomTr.k) : LABELS_WIDTH_OPACITY_SCALE((x1(d) - x0(d)) * zoomTr.k / nameOf(d.data).length);
      }) // Scale labels inversely proportional
      .attrTween('transform', function () {
        var kTr = d3Interpolate.interpolate(prevK, zoomTr.k);
        return horiz ? function (t) {
          return "scale(1, ".concat(1 / kTr(t), ")");
        } : function (t) {
          return "scale(".concat(1 / kTr(t), ", 1)");
        };
      });
    } //


    function getNodeStack(d) {
      var stack = [];
      var curNode = d;

      while (curNode) {
        stack.unshift(curNode);
        curNode = curNode.parent;
      }

      return stack;
    }
  }
});

module.exports = icicle;

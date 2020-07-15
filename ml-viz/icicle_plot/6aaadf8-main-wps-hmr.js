webpackHotUpdateicicle_plot("main",{

/***/ "./src/lib/components/Icicle.react.js":
/*!********************************************!*\
  !*** ./src/lib/components/Icicle.react.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Icicle; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_kapsule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-kapsule */ "./node_modules/react-kapsule/dist/react-kapsule.module.js");
/* harmony import */ var _d3_icicle_chart__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../d3/icicle-chart */ "./src/lib/d3/icicle-chart/dist/icicle-chart.module.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





/**
 * ExampleComponent is an example component.
 * It takes a property, `label`, and
 * displays it.
 * It renders an input with the property `value`
 * which is editable by the user.
 */

var Icicle = /*#__PURE__*/function (_Component) {
  _inherits(Icicle, _Component);

  var _super = _createSuper(Icicle);

  function Icicle(props) {
    var _this;

    _classCallCheck(this, Icicle);

    _this = _super.call(this, props);
    _this.state = {
      value: 'default'
    };
    return _this;
  } // componentDidMount() {
  //   // this.icicle.orientation('td').data(data).size('size').color('color')(document.getElementById('chart'));
  // }
  // componentDidUpdate() {
  //     this.sunburst.update(this.props);
  // }


  _createClass(Icicle, [{
    key: "render",
    value: function render() {
      var IcicleComp = Object(react_kapsule__WEBPACK_IMPORTED_MODULE_2__["default"])(_d3_icicle_chart__WEBPACK_IMPORTED_MODULE_3__["default"]);
      var data = {
        name: 'main',
        color: 'magenta',
        children: [{
          name: 'a',
          color: 'yellow',
          size: 1
        }, {
          name: 'b',
          color: 'red',
          children: [{
            name: 'ba',
            color: 'orange',
            size: 1
          }, {
            name: 'bb',
            color: 'blue',
            children: [{
              name: 'bba',
              color: 'green',
              size: 1
            }, {
              name: 'bbb',
              color: 'pink',
              size: 1
            }]
          }]
        }]
      };
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: this.props.id
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, this.props.label));
    }
  }]);

  return Icicle;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]); // {/* <IcicleComp orientation={this.props.orientation} data={this.props.data} /> */}
//           {/* size="size",
//           color="color" */}
// Icicle.defaultProps = {
//   interactive: true
// };



Icicle.propTypes = {
  /**
   * The ID used to identify this component in Dash callbacks.
   */
  id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,

  /**
   * A label that will be printed when this component is rendered.
   */
  label: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,

  /**
   * The value displayed in the input.
   */
  value: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,

  /**
   * Dash-assigned callback that should be called to report property changes
   * to Dash, to make them available for callbacks.
   */
  setProps: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
};

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pY2ljbGVfcGxvdC8uL3NyYy9saWIvY29tcG9uZW50cy9JY2ljbGUucmVhY3QuanMiXSwibmFtZXMiOlsiSWNpY2xlIiwicHJvcHMiLCJzdGF0ZSIsInZhbHVlIiwiSWNpY2xlQ29tcCIsImZyb21LYXBzdWxlIiwiSWNpY2xlRDMiLCJkYXRhIiwibmFtZSIsImNvbG9yIiwiY2hpbGRyZW4iLCJzaXplIiwiaWQiLCJsYWJlbCIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsInN0cmluZyIsImlzUmVxdWlyZWQiLCJzZXRQcm9wcyIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUdBOzs7Ozs7OztJQU9xQkEsTTs7Ozs7QUFDbkIsa0JBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQTs7QUFDakIsOEJBQU1BLEtBQU47QUFDQSxVQUFLQyxLQUFMLEdBQWE7QUFDWEMsV0FBSyxFQUFFO0FBREksS0FBYjtBQUZpQjtBQUtsQixHLENBR0Q7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBOzs7Ozs2QkFFUztBQUNQLFVBQU1DLFVBQVUsR0FBR0MsNkRBQVcsQ0FBQ0Msd0RBQUQsQ0FBOUI7QUFDQSxVQUFNQyxJQUFJLEdBQUc7QUFDWEMsWUFBSSxFQUFFLE1BREs7QUFFWEMsYUFBSyxFQUFFLFNBRkk7QUFHWEMsZ0JBQVEsRUFBRSxDQUFDO0FBQ1RGLGNBQUksRUFBRSxHQURHO0FBRVRDLGVBQUssRUFBRSxRQUZFO0FBR1RFLGNBQUksRUFBRTtBQUhHLFNBQUQsRUFJUjtBQUNBSCxjQUFJLEVBQUUsR0FETjtBQUVBQyxlQUFLLEVBQUUsS0FGUDtBQUdBQyxrQkFBUSxFQUFFLENBQUM7QUFDVEYsZ0JBQUksRUFBRSxJQURHO0FBRVRDLGlCQUFLLEVBQUUsUUFGRTtBQUdURSxnQkFBSSxFQUFFO0FBSEcsV0FBRCxFQUlQO0FBQ0RILGdCQUFJLEVBQUUsSUFETDtBQUVEQyxpQkFBSyxFQUFFLE1BRk47QUFHREMsb0JBQVEsRUFBRSxDQUFDO0FBQ1RGLGtCQUFJLEVBQUUsS0FERztBQUVUQyxtQkFBSyxFQUFFLE9BRkU7QUFHVEUsa0JBQUksRUFBRTtBQUhHLGFBQUQsRUFJUDtBQUNESCxrQkFBSSxFQUFFLEtBREw7QUFFREMsbUJBQUssRUFBRSxNQUZOO0FBR0RFLGtCQUFJLEVBQUU7QUFITCxhQUpPO0FBSFQsV0FKTztBQUhWLFNBSlE7QUFIQyxPQUFiO0FBNkJBLDBCQUFPO0FBQUssVUFBRSxFQUFFLEtBQUtWLEtBQUwsQ0FBV1c7QUFBcEIsc0JBQ0gsMEVBQVEsS0FBS1gsS0FBTCxDQUFXWSxLQUFuQixDQURHLENBQVA7QUFLRDs7OztFQXREaUNDLCtDLEdBd0RwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFFQWQsTUFBTSxDQUFDZSxTQUFQLEdBQW1CO0FBQ2Y7OztBQUdBSCxJQUFFLEVBQUVJLGlEQUFTLENBQUNDLE1BSkM7O0FBTWY7OztBQUdBSixPQUFLLEVBQUVHLGlEQUFTLENBQUNDLE1BQVYsQ0FBaUJDLFVBVFQ7O0FBV2Y7OztBQUdBZixPQUFLLEVBQUVhLGlEQUFTLENBQUNDLE1BZEY7O0FBZ0JmOzs7O0FBSUFFLFVBQVEsRUFBRUgsaURBQVMsQ0FBQ0k7QUFwQkwsQ0FBbkIsQyIsImZpbGUiOiI2YWFhZGY4LW1haW4td3BzLWhtci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBmcm9tS2Fwc3VsZSBmcm9tICdyZWFjdC1rYXBzdWxlJztcbmltcG9ydCBJY2ljbGVEMyBmcm9tICcuLi9kMy9pY2ljbGUtY2hhcnQnO1xuXG5cbi8qKlxuICogRXhhbXBsZUNvbXBvbmVudCBpcyBhbiBleGFtcGxlIGNvbXBvbmVudC5cbiAqIEl0IHRha2VzIGEgcHJvcGVydHksIGBsYWJlbGAsIGFuZFxuICogZGlzcGxheXMgaXQuXG4gKiBJdCByZW5kZXJzIGFuIGlucHV0IHdpdGggdGhlIHByb3BlcnR5IGB2YWx1ZWBcbiAqIHdoaWNoIGlzIGVkaXRhYmxlIGJ5IHRoZSB1c2VyLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJY2ljbGUgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdmFsdWU6ICdkZWZhdWx0J1xuICAgIH1cbiAgfVxuICBcblxuICAvLyBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBcbiAgLy8gICAvLyB0aGlzLmljaWNsZS5vcmllbnRhdGlvbigndGQnKS5kYXRhKGRhdGEpLnNpemUoJ3NpemUnKS5jb2xvcignY29sb3InKShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hhcnQnKSk7XG4gIC8vIH1cblxuICAvLyBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gIC8vICAgICB0aGlzLnN1bmJ1cnN0LnVwZGF0ZSh0aGlzLnByb3BzKTtcbiAgLy8gfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBJY2ljbGVDb21wID0gZnJvbUthcHN1bGUoSWNpY2xlRDMpXG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIG5hbWU6ICdtYWluJyxcbiAgICAgIGNvbG9yOiAnbWFnZW50YScsXG4gICAgICBjaGlsZHJlbjogW3tcbiAgICAgICAgbmFtZTogJ2EnLFxuICAgICAgICBjb2xvcjogJ3llbGxvdycsXG4gICAgICAgIHNpemU6IDFcbiAgICAgIH0se1xuICAgICAgICBuYW1lOiAnYicsXG4gICAgICAgIGNvbG9yOiAncmVkJyxcbiAgICAgICAgY2hpbGRyZW46IFt7XG4gICAgICAgICAgbmFtZTogJ2JhJyxcbiAgICAgICAgICBjb2xvcjogJ29yYW5nZScsXG4gICAgICAgICAgc2l6ZTogMVxuICAgICAgICB9LCB7XG4gICAgICAgICAgbmFtZTogJ2JiJyxcbiAgICAgICAgICBjb2xvcjogJ2JsdWUnLFxuICAgICAgICAgIGNoaWxkcmVuOiBbe1xuICAgICAgICAgICAgbmFtZTogJ2JiYScsXG4gICAgICAgICAgICBjb2xvcjogJ2dyZWVuJyxcbiAgICAgICAgICAgIHNpemU6IDFcbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiAnYmJiJyxcbiAgICAgICAgICAgIGNvbG9yOiAncGluaycsXG4gICAgICAgICAgICBzaXplOiAxXG4gICAgICAgICAgfV1cbiAgICAgICAgfV1cbiAgICAgIH1dXG4gICAgfTtcbiAgICByZXR1cm4gPGRpdiBpZD17dGhpcy5wcm9wcy5pZH0+XG4gICAgICAgIDxsYWJlbD57dGhpcy5wcm9wcy5sYWJlbH08L2xhYmVsPlxuICAgICAgICBcbiAgICAgICAgXG4gICAgICA8L2Rpdj5cbiAgfVxufVxuLy8gey8qIDxJY2ljbGVDb21wIG9yaWVudGF0aW9uPXt0aGlzLnByb3BzLm9yaWVudGF0aW9ufSBkYXRhPXt0aGlzLnByb3BzLmRhdGF9IC8+ICovfVxuLy8gICAgICAgICAgIHsvKiBzaXplPVwic2l6ZVwiLFxuLy8gICAgICAgICAgIGNvbG9yPVwiY29sb3JcIiAqL31cbi8vIEljaWNsZS5kZWZhdWx0UHJvcHMgPSB7XG4vLyAgIGludGVyYWN0aXZlOiB0cnVlXG4vLyB9O1xuXG5JY2ljbGUucHJvcFR5cGVzID0ge1xuICAgIC8qKlxuICAgICAqIFRoZSBJRCB1c2VkIHRvIGlkZW50aWZ5IHRoaXMgY29tcG9uZW50IGluIERhc2ggY2FsbGJhY2tzLlxuICAgICAqL1xuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuXG4gICAgLyoqXG4gICAgICogQSBsYWJlbCB0aGF0IHdpbGwgYmUgcHJpbnRlZCB3aGVuIHRoaXMgY29tcG9uZW50IGlzIHJlbmRlcmVkLlxuICAgICAqL1xuICAgIGxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG5cbiAgICAvKipcbiAgICAgKiBUaGUgdmFsdWUgZGlzcGxheWVkIGluIHRoZSBpbnB1dC5cbiAgICAgKi9cbiAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcblxuICAgIC8qKlxuICAgICAqIERhc2gtYXNzaWduZWQgY2FsbGJhY2sgdGhhdCBzaG91bGQgYmUgY2FsbGVkIHRvIHJlcG9ydCBwcm9wZXJ0eSBjaGFuZ2VzXG4gICAgICogdG8gRGFzaCwgdG8gbWFrZSB0aGVtIGF2YWlsYWJsZSBmb3IgY2FsbGJhY2tzLlxuICAgICAqL1xuICAgIHNldFByb3BzOiBQcm9wVHlwZXMuZnVuY1xufTsiXSwic291cmNlUm9vdCI6IiJ9
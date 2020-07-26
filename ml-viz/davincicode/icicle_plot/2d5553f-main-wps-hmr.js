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
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(IcicleComp, {
        data: data
      }));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pY2ljbGVfcGxvdC8uL3NyYy9saWIvY29tcG9uZW50cy9JY2ljbGUucmVhY3QuanMiXSwibmFtZXMiOlsiSWNpY2xlIiwicHJvcHMiLCJzdGF0ZSIsInZhbHVlIiwiSWNpY2xlQ29tcCIsImZyb21LYXBzdWxlIiwiSWNpY2xlRDMiLCJkYXRhIiwibmFtZSIsImNvbG9yIiwiY2hpbGRyZW4iLCJzaXplIiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwiaWQiLCJQcm9wVHlwZXMiLCJzdHJpbmciLCJsYWJlbCIsImlzUmVxdWlyZWQiLCJzZXRQcm9wcyIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUdBOzs7Ozs7OztJQU9xQkEsTTs7Ozs7QUFDbkIsa0JBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQTs7QUFDakIsOEJBQU1BLEtBQU47QUFDQSxVQUFLQyxLQUFMLEdBQWE7QUFDWEMsV0FBSyxFQUFFO0FBREksS0FBYjtBQUZpQjtBQUtsQixHLENBR0Q7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBOzs7Ozs2QkFFUztBQUNQLFVBQU1DLFVBQVUsR0FBR0MsNkRBQVcsQ0FBQ0Msd0RBQUQsQ0FBOUI7QUFDQSxVQUFNQyxJQUFJLEdBQUc7QUFDWEMsWUFBSSxFQUFFLE1BREs7QUFFWEMsYUFBSyxFQUFFLFNBRkk7QUFHWEMsZ0JBQVEsRUFBRSxDQUFDO0FBQ1RGLGNBQUksRUFBRSxHQURHO0FBRVRDLGVBQUssRUFBRSxRQUZFO0FBR1RFLGNBQUksRUFBRTtBQUhHLFNBQUQsRUFJUjtBQUNBSCxjQUFJLEVBQUUsR0FETjtBQUVBQyxlQUFLLEVBQUUsS0FGUDtBQUdBQyxrQkFBUSxFQUFFLENBQUM7QUFDVEYsZ0JBQUksRUFBRSxJQURHO0FBRVRDLGlCQUFLLEVBQUUsUUFGRTtBQUdURSxnQkFBSSxFQUFFO0FBSEcsV0FBRCxFQUlQO0FBQ0RILGdCQUFJLEVBQUUsSUFETDtBQUVEQyxpQkFBSyxFQUFFLE1BRk47QUFHREMsb0JBQVEsRUFBRSxDQUFDO0FBQ1RGLGtCQUFJLEVBQUUsS0FERztBQUVUQyxtQkFBSyxFQUFFLE9BRkU7QUFHVEUsa0JBQUksRUFBRTtBQUhHLGFBQUQsRUFJUDtBQUNESCxrQkFBSSxFQUFFLEtBREw7QUFFREMsbUJBQUssRUFBRSxNQUZOO0FBR0RFLGtCQUFJLEVBQUU7QUFITCxhQUpPO0FBSFQsV0FKTztBQUhWLFNBSlE7QUFIQyxPQUFiO0FBNkJBLDBCQUFPLHFGQUFLLDJEQUFDLFVBQUQ7QUFBWSxZQUFJLEVBQUVKO0FBQWxCLFFBQUwsQ0FBUDtBQUNEOzs7O0VBbERpQ0ssK0MsR0FvRHBDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUVBWixNQUFNLENBQUNhLFNBQVAsR0FBbUI7QUFDZjs7O0FBR0FDLElBQUUsRUFBRUMsaURBQVMsQ0FBQ0MsTUFKQzs7QUFNZjs7O0FBR0FDLE9BQUssRUFBRUYsaURBQVMsQ0FBQ0MsTUFBVixDQUFpQkUsVUFUVDs7QUFXZjs7O0FBR0FmLE9BQUssRUFBRVksaURBQVMsQ0FBQ0MsTUFkRjs7QUFnQmY7Ozs7QUFJQUcsVUFBUSxFQUFFSixpREFBUyxDQUFDSztBQXBCTCxDQUFuQixDIiwiZmlsZSI6IjJkNTU1M2YtbWFpbi13cHMtaG1yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGZyb21LYXBzdWxlIGZyb20gJ3JlYWN0LWthcHN1bGUnO1xuaW1wb3J0IEljaWNsZUQzIGZyb20gJy4uL2QzL2ljaWNsZS1jaGFydCc7XG5cblxuLyoqXG4gKiBFeGFtcGxlQ29tcG9uZW50IGlzIGFuIGV4YW1wbGUgY29tcG9uZW50LlxuICogSXQgdGFrZXMgYSBwcm9wZXJ0eSwgYGxhYmVsYCwgYW5kXG4gKiBkaXNwbGF5cyBpdC5cbiAqIEl0IHJlbmRlcnMgYW4gaW5wdXQgd2l0aCB0aGUgcHJvcGVydHkgYHZhbHVlYFxuICogd2hpY2ggaXMgZWRpdGFibGUgYnkgdGhlIHVzZXIuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEljaWNsZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB2YWx1ZTogJ2RlZmF1bHQnXG4gICAgfVxuICB9XG4gIFxuXG4gIC8vIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIFxuICAvLyAgIC8vIHRoaXMuaWNpY2xlLm9yaWVudGF0aW9uKCd0ZCcpLmRhdGEoZGF0YSkuc2l6ZSgnc2l6ZScpLmNvbG9yKCdjb2xvcicpKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGFydCcpKTtcbiAgLy8gfVxuXG4gIC8vIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgLy8gICAgIHRoaXMuc3VuYnVyc3QudXBkYXRlKHRoaXMucHJvcHMpO1xuICAvLyB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IEljaWNsZUNvbXAgPSBmcm9tS2Fwc3VsZShJY2ljbGVEMylcbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgbmFtZTogJ21haW4nLFxuICAgICAgY29sb3I6ICdtYWdlbnRhJyxcbiAgICAgIGNoaWxkcmVuOiBbe1xuICAgICAgICBuYW1lOiAnYScsXG4gICAgICAgIGNvbG9yOiAneWVsbG93JyxcbiAgICAgICAgc2l6ZTogMVxuICAgICAgfSx7XG4gICAgICAgIG5hbWU6ICdiJyxcbiAgICAgICAgY29sb3I6ICdyZWQnLFxuICAgICAgICBjaGlsZHJlbjogW3tcbiAgICAgICAgICBuYW1lOiAnYmEnLFxuICAgICAgICAgIGNvbG9yOiAnb3JhbmdlJyxcbiAgICAgICAgICBzaXplOiAxXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBuYW1lOiAnYmInLFxuICAgICAgICAgIGNvbG9yOiAnYmx1ZScsXG4gICAgICAgICAgY2hpbGRyZW46IFt7XG4gICAgICAgICAgICBuYW1lOiAnYmJhJyxcbiAgICAgICAgICAgIGNvbG9yOiAnZ3JlZW4nLFxuICAgICAgICAgICAgc2l6ZTogMVxuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5hbWU6ICdiYmInLFxuICAgICAgICAgICAgY29sb3I6ICdwaW5rJyxcbiAgICAgICAgICAgIHNpemU6IDFcbiAgICAgICAgICB9XVxuICAgICAgICB9XVxuICAgICAgfV1cbiAgICB9O1xuICAgIHJldHVybiA8ZGl2PjxJY2ljbGVDb21wIGRhdGE9e2RhdGF9IC8+PC9kaXY+XG4gIH1cbn1cbi8vIHsvKiA8SWNpY2xlQ29tcCBvcmllbnRhdGlvbj17dGhpcy5wcm9wcy5vcmllbnRhdGlvbn0gZGF0YT17dGhpcy5wcm9wcy5kYXRhfSAvPiAqL31cbi8vICAgICAgICAgICB7Lyogc2l6ZT1cInNpemVcIixcbi8vICAgICAgICAgICBjb2xvcj1cImNvbG9yXCIgKi99XG4vLyBJY2ljbGUuZGVmYXVsdFByb3BzID0ge1xuLy8gICBpbnRlcmFjdGl2ZTogdHJ1ZVxuLy8gfTtcblxuSWNpY2xlLnByb3BUeXBlcyA9IHtcbiAgICAvKipcbiAgICAgKiBUaGUgSUQgdXNlZCB0byBpZGVudGlmeSB0aGlzIGNvbXBvbmVudCBpbiBEYXNoIGNhbGxiYWNrcy5cbiAgICAgKi9cbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcblxuICAgIC8qKlxuICAgICAqIEEgbGFiZWwgdGhhdCB3aWxsIGJlIHByaW50ZWQgd2hlbiB0aGlzIGNvbXBvbmVudCBpcyByZW5kZXJlZC5cbiAgICAgKi9cbiAgICBsYWJlbDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuXG4gICAgLyoqXG4gICAgICogVGhlIHZhbHVlIGRpc3BsYXllZCBpbiB0aGUgaW5wdXQuXG4gICAgICovXG4gICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG5cbiAgICAvKipcbiAgICAgKiBEYXNoLWFzc2lnbmVkIGNhbGxiYWNrIHRoYXQgc2hvdWxkIGJlIGNhbGxlZCB0byByZXBvcnQgcHJvcGVydHkgY2hhbmdlc1xuICAgICAqIHRvIERhc2gsIHRvIG1ha2UgdGhlbSBhdmFpbGFibGUgZm9yIGNhbGxiYWNrcy5cbiAgICAgKi9cbiAgICBzZXRQcm9wczogUHJvcFR5cGVzLmZ1bmNcbn07Il0sInNvdXJjZVJvb3QiOiIifQ==
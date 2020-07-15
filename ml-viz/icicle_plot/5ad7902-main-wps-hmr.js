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
!(function webpackMissingModule() { var e = new Error("Cannot find module './d3/icicle-chart'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
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
      var IcicleComp = Object(react_kapsule__WEBPACK_IMPORTED_MODULE_2__["default"])(!(function webpackMissingModule() { var e = new Error("Cannot find module './d3/icicle-chart'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
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
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(IcicleComp, null, "orientation=\"td\", data=data");
    }
  }]);

  return Icicle;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);


Icicle.defaultProps = {
  interactive: true
};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pY2ljbGVfcGxvdC8uL3NyYy9saWIvY29tcG9uZW50cy9JY2ljbGUucmVhY3QuanMiXSwibmFtZXMiOlsiSWNpY2xlIiwicHJvcHMiLCJzdGF0ZSIsInZhbHVlIiwiSWNpY2xlQ29tcCIsImZyb21LYXBzdWxlIiwiSWNpY2xlRDMiLCJkYXRhIiwibmFtZSIsImNvbG9yIiwiY2hpbGRyZW4iLCJzaXplIiwiQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIiwiaW50ZXJhY3RpdmUiLCJwcm9wVHlwZXMiLCJpZCIsIlByb3BUeXBlcyIsInN0cmluZyIsImxhYmVsIiwiaXNSZXF1aXJlZCIsInNldFByb3BzIiwiZnVuYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7Ozs7Ozs7O0lBT3FCQSxNOzs7OztBQUNuQixrQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBOztBQUNqQiw4QkFBTUEsS0FBTjtBQUNBLFVBQUtDLEtBQUwsR0FBYTtBQUNYQyxXQUFLLEVBQUU7QUFESSxLQUFiO0FBRmlCO0FBS2xCLEcsQ0FHRDtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7Ozs7OzZCQUVTO0FBQ1AsVUFBTUMsVUFBVSxHQUFHQyw2REFBVyxDQUFDQywySUFBRCxDQUE5QjtBQUNBLFVBQU1DLElBQUksR0FBRztBQUNYQyxZQUFJLEVBQUUsTUFESztBQUVYQyxhQUFLLEVBQUUsU0FGSTtBQUdYQyxnQkFBUSxFQUFFLENBQUM7QUFDVEYsY0FBSSxFQUFFLEdBREc7QUFFVEMsZUFBSyxFQUFFLFFBRkU7QUFHVEUsY0FBSSxFQUFFO0FBSEcsU0FBRCxFQUlSO0FBQ0FILGNBQUksRUFBRSxHQUROO0FBRUFDLGVBQUssRUFBRSxLQUZQO0FBR0FDLGtCQUFRLEVBQUUsQ0FBQztBQUNURixnQkFBSSxFQUFFLElBREc7QUFFVEMsaUJBQUssRUFBRSxRQUZFO0FBR1RFLGdCQUFJLEVBQUU7QUFIRyxXQUFELEVBSVA7QUFDREgsZ0JBQUksRUFBRSxJQURMO0FBRURDLGlCQUFLLEVBQUUsTUFGTjtBQUdEQyxvQkFBUSxFQUFFLENBQUM7QUFDVEYsa0JBQUksRUFBRSxLQURHO0FBRVRDLG1CQUFLLEVBQUUsT0FGRTtBQUdURSxrQkFBSSxFQUFFO0FBSEcsYUFBRCxFQUlQO0FBQ0RILGtCQUFJLEVBQUUsS0FETDtBQUVEQyxtQkFBSyxFQUFFLE1BRk47QUFHREUsa0JBQUksRUFBRTtBQUhMLGFBSk87QUFIVCxXQUpPO0FBSFYsU0FKUTtBQUhDLE9BQWI7QUE2QkEsMEJBQU8sMkRBQUMsVUFBRCx3Q0FBUDtBQU1EOzs7O0VBdkRpQ0MsK0M7OztBQTBEcENaLE1BQU0sQ0FBQ2EsWUFBUCxHQUFzQjtBQUNwQkMsYUFBVyxFQUFFO0FBRE8sQ0FBdEI7QUFJQWQsTUFBTSxDQUFDZSxTQUFQLEdBQW1CO0FBQ2Y7OztBQUdBQyxJQUFFLEVBQUVDLGlEQUFTLENBQUNDLE1BSkM7O0FBTWY7OztBQUdBQyxPQUFLLEVBQUVGLGlEQUFTLENBQUNDLE1BQVYsQ0FBaUJFLFVBVFQ7O0FBV2Y7OztBQUdBakIsT0FBSyxFQUFFYyxpREFBUyxDQUFDQyxNQWRGOztBQWdCZjs7OztBQUlBRyxVQUFRLEVBQUVKLGlEQUFTLENBQUNLO0FBcEJMLENBQW5CLEMiLCJmaWxlIjoiNWFkNzkwMi1tYWluLXdwcy1obXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgZnJvbUthcHN1bGUgZnJvbSAncmVhY3Qta2Fwc3VsZSc7XG5pbXBvcnQgSWNpY2xlRDMgZnJvbSAnLi9kMy9pY2ljbGUtY2hhcnQnO1xuXG5cbi8qKlxuICogRXhhbXBsZUNvbXBvbmVudCBpcyBhbiBleGFtcGxlIGNvbXBvbmVudC5cbiAqIEl0IHRha2VzIGEgcHJvcGVydHksIGBsYWJlbGAsIGFuZFxuICogZGlzcGxheXMgaXQuXG4gKiBJdCByZW5kZXJzIGFuIGlucHV0IHdpdGggdGhlIHByb3BlcnR5IGB2YWx1ZWBcbiAqIHdoaWNoIGlzIGVkaXRhYmxlIGJ5IHRoZSB1c2VyLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJY2ljbGUgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdmFsdWU6ICdkZWZhdWx0J1xuICAgIH1cbiAgfVxuICBcblxuICAvLyBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBcbiAgLy8gICAvLyB0aGlzLmljaWNsZS5vcmllbnRhdGlvbigndGQnKS5kYXRhKGRhdGEpLnNpemUoJ3NpemUnKS5jb2xvcignY29sb3InKShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hhcnQnKSk7XG4gIC8vIH1cblxuICAvLyBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gIC8vICAgICB0aGlzLnN1bmJ1cnN0LnVwZGF0ZSh0aGlzLnByb3BzKTtcbiAgLy8gfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBJY2ljbGVDb21wID0gZnJvbUthcHN1bGUoSWNpY2xlRDMpXG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIG5hbWU6ICdtYWluJyxcbiAgICAgIGNvbG9yOiAnbWFnZW50YScsXG4gICAgICBjaGlsZHJlbjogW3tcbiAgICAgICAgbmFtZTogJ2EnLFxuICAgICAgICBjb2xvcjogJ3llbGxvdycsXG4gICAgICAgIHNpemU6IDFcbiAgICAgIH0se1xuICAgICAgICBuYW1lOiAnYicsXG4gICAgICAgIGNvbG9yOiAncmVkJyxcbiAgICAgICAgY2hpbGRyZW46IFt7XG4gICAgICAgICAgbmFtZTogJ2JhJyxcbiAgICAgICAgICBjb2xvcjogJ29yYW5nZScsXG4gICAgICAgICAgc2l6ZTogMVxuICAgICAgICB9LCB7XG4gICAgICAgICAgbmFtZTogJ2JiJyxcbiAgICAgICAgICBjb2xvcjogJ2JsdWUnLFxuICAgICAgICAgIGNoaWxkcmVuOiBbe1xuICAgICAgICAgICAgbmFtZTogJ2JiYScsXG4gICAgICAgICAgICBjb2xvcjogJ2dyZWVuJyxcbiAgICAgICAgICAgIHNpemU6IDFcbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiAnYmJiJyxcbiAgICAgICAgICAgIGNvbG9yOiAncGluaycsXG4gICAgICAgICAgICBzaXplOiAxXG4gICAgICAgICAgfV1cbiAgICAgICAgfV1cbiAgICAgIH1dXG4gICAgfTtcbiAgICByZXR1cm4gPEljaWNsZUNvbXA+XG4gICAgICBvcmllbnRhdGlvbj1cInRkXCIsXG4gICAgICBkYXRhPWRhdGFcbiAgICAgIHsvKiBzaXplPVwic2l6ZVwiLFxuICAgICAgY29sb3I9XCJjb2xvclwiICovfVxuICAgIDwvSWNpY2xlQ29tcD5cbiAgfVxufVxuXG5JY2ljbGUuZGVmYXVsdFByb3BzID0ge1xuICBpbnRlcmFjdGl2ZTogdHJ1ZVxufTtcblxuSWNpY2xlLnByb3BUeXBlcyA9IHtcbiAgICAvKipcbiAgICAgKiBUaGUgSUQgdXNlZCB0byBpZGVudGlmeSB0aGlzIGNvbXBvbmVudCBpbiBEYXNoIGNhbGxiYWNrcy5cbiAgICAgKi9cbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcblxuICAgIC8qKlxuICAgICAqIEEgbGFiZWwgdGhhdCB3aWxsIGJlIHByaW50ZWQgd2hlbiB0aGlzIGNvbXBvbmVudCBpcyByZW5kZXJlZC5cbiAgICAgKi9cbiAgICBsYWJlbDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuXG4gICAgLyoqXG4gICAgICogVGhlIHZhbHVlIGRpc3BsYXllZCBpbiB0aGUgaW5wdXQuXG4gICAgICovXG4gICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG5cbiAgICAvKipcbiAgICAgKiBEYXNoLWFzc2lnbmVkIGNhbGxiYWNrIHRoYXQgc2hvdWxkIGJlIGNhbGxlZCB0byByZXBvcnQgcHJvcGVydHkgY2hhbmdlc1xuICAgICAqIHRvIERhc2gsIHRvIG1ha2UgdGhlbSBhdmFpbGFibGUgZm9yIGNhbGxiYWNrcy5cbiAgICAgKi9cbiAgICBzZXRQcm9wczogUHJvcFR5cGVzLmZ1bmNcbn07Il0sInNvdXJjZVJvb3QiOiIifQ==
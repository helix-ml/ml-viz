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
!(function webpackMissingModule() { var e = new Error("Cannot find module 'icicle-chart'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
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
      var IcicleComp = Object(react_kapsule__WEBPACK_IMPORTED_MODULE_2__["default"])(!(function webpackMissingModule() { var e = new Error("Cannot find module 'icicle-chart'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pY2ljbGVfcGxvdC8uL3NyYy9saWIvY29tcG9uZW50cy9JY2ljbGUucmVhY3QuanMiXSwibmFtZXMiOlsiSWNpY2xlIiwicHJvcHMiLCJzdGF0ZSIsInZhbHVlIiwiSWNpY2xlQ29tcCIsImZyb21LYXBzdWxlIiwiSWNpY2xlRDMiLCJkYXRhIiwibmFtZSIsImNvbG9yIiwiY2hpbGRyZW4iLCJzaXplIiwiQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIiwiaW50ZXJhY3RpdmUiLCJwcm9wVHlwZXMiLCJpZCIsIlByb3BUeXBlcyIsInN0cmluZyIsImxhYmVsIiwiaXNSZXF1aXJlZCIsInNldFByb3BzIiwiZnVuYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7Ozs7Ozs7O0lBT3FCQSxNOzs7OztBQUNuQixrQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBOztBQUNqQiw4QkFBTUEsS0FBTjtBQUNBLFVBQUtDLEtBQUwsR0FBYTtBQUNYQyxXQUFLLEVBQUU7QUFESSxLQUFiO0FBRmlCO0FBS2xCLEcsQ0FHRDtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7Ozs7OzZCQUVTO0FBQ1AsVUFBTUMsVUFBVSxHQUFHQyw2REFBVyxDQUFDQyxzSUFBRCxDQUE5QjtBQUNBLFVBQU1DLElBQUksR0FBRztBQUNYQyxZQUFJLEVBQUUsTUFESztBQUVYQyxhQUFLLEVBQUUsU0FGSTtBQUdYQyxnQkFBUSxFQUFFLENBQUM7QUFDVEYsY0FBSSxFQUFFLEdBREc7QUFFVEMsZUFBSyxFQUFFLFFBRkU7QUFHVEUsY0FBSSxFQUFFO0FBSEcsU0FBRCxFQUlSO0FBQ0FILGNBQUksRUFBRSxHQUROO0FBRUFDLGVBQUssRUFBRSxLQUZQO0FBR0FDLGtCQUFRLEVBQUUsQ0FBQztBQUNURixnQkFBSSxFQUFFLElBREc7QUFFVEMsaUJBQUssRUFBRSxRQUZFO0FBR1RFLGdCQUFJLEVBQUU7QUFIRyxXQUFELEVBSVA7QUFDREgsZ0JBQUksRUFBRSxJQURMO0FBRURDLGlCQUFLLEVBQUUsTUFGTjtBQUdEQyxvQkFBUSxFQUFFLENBQUM7QUFDVEYsa0JBQUksRUFBRSxLQURHO0FBRVRDLG1CQUFLLEVBQUUsT0FGRTtBQUdURSxrQkFBSSxFQUFFO0FBSEcsYUFBRCxFQUlQO0FBQ0RILGtCQUFJLEVBQUUsS0FETDtBQUVEQyxtQkFBSyxFQUFFLE1BRk47QUFHREUsa0JBQUksRUFBRTtBQUhMLGFBSk87QUFIVCxXQUpPO0FBSFYsU0FKUTtBQUhDLE9BQWI7QUE2QkEsMEJBQU8sMkRBQUMsVUFBRCx3Q0FBUDtBQU1EOzs7O0VBdkRpQ0MsK0M7OztBQTBEcENaLE1BQU0sQ0FBQ2EsWUFBUCxHQUFzQjtBQUNwQkMsYUFBVyxFQUFFO0FBRE8sQ0FBdEI7QUFJQWQsTUFBTSxDQUFDZSxTQUFQLEdBQW1CO0FBQ2Y7OztBQUdBQyxJQUFFLEVBQUVDLGlEQUFTLENBQUNDLE1BSkM7O0FBTWY7OztBQUdBQyxPQUFLLEVBQUVGLGlEQUFTLENBQUNDLE1BQVYsQ0FBaUJFLFVBVFQ7O0FBV2Y7OztBQUdBakIsT0FBSyxFQUFFYyxpREFBUyxDQUFDQyxNQWRGOztBQWdCZjs7OztBQUlBRyxVQUFRLEVBQUVKLGlEQUFTLENBQUNLO0FBcEJMLENBQW5CLEMiLCJmaWxlIjoiZDhjYjI5NS1tYWluLXdwcy1obXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgZnJvbUthcHN1bGUgZnJvbSAncmVhY3Qta2Fwc3VsZSc7XG5pbXBvcnQgSWNpY2xlRDMgZnJvbSAnaWNpY2xlLWNoYXJ0JztcblxuXG4vKipcbiAqIEV4YW1wbGVDb21wb25lbnQgaXMgYW4gZXhhbXBsZSBjb21wb25lbnQuXG4gKiBJdCB0YWtlcyBhIHByb3BlcnR5LCBgbGFiZWxgLCBhbmRcbiAqIGRpc3BsYXlzIGl0LlxuICogSXQgcmVuZGVycyBhbiBpbnB1dCB3aXRoIHRoZSBwcm9wZXJ0eSBgdmFsdWVgXG4gKiB3aGljaCBpcyBlZGl0YWJsZSBieSB0aGUgdXNlci5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSWNpY2xlIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHZhbHVlOiAnZGVmYXVsdCdcbiAgICB9XG4gIH1cbiAgXG5cbiAgLy8gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgXG4gIC8vICAgLy8gdGhpcy5pY2ljbGUub3JpZW50YXRpb24oJ3RkJykuZGF0YShkYXRhKS5zaXplKCdzaXplJykuY29sb3IoJ2NvbG9yJykoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoYXJ0JykpO1xuICAvLyB9XG5cbiAgLy8gY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAvLyAgICAgdGhpcy5zdW5idXJzdC51cGRhdGUodGhpcy5wcm9wcyk7XG4gIC8vIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgSWNpY2xlQ29tcCA9IGZyb21LYXBzdWxlKEljaWNsZUQzKVxuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICBuYW1lOiAnbWFpbicsXG4gICAgICBjb2xvcjogJ21hZ2VudGEnLFxuICAgICAgY2hpbGRyZW46IFt7XG4gICAgICAgIG5hbWU6ICdhJyxcbiAgICAgICAgY29sb3I6ICd5ZWxsb3cnLFxuICAgICAgICBzaXplOiAxXG4gICAgICB9LHtcbiAgICAgICAgbmFtZTogJ2InLFxuICAgICAgICBjb2xvcjogJ3JlZCcsXG4gICAgICAgIGNoaWxkcmVuOiBbe1xuICAgICAgICAgIG5hbWU6ICdiYScsXG4gICAgICAgICAgY29sb3I6ICdvcmFuZ2UnLFxuICAgICAgICAgIHNpemU6IDFcbiAgICAgICAgfSwge1xuICAgICAgICAgIG5hbWU6ICdiYicsXG4gICAgICAgICAgY29sb3I6ICdibHVlJyxcbiAgICAgICAgICBjaGlsZHJlbjogW3tcbiAgICAgICAgICAgIG5hbWU6ICdiYmEnLFxuICAgICAgICAgICAgY29sb3I6ICdncmVlbicsXG4gICAgICAgICAgICBzaXplOiAxXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogJ2JiYicsXG4gICAgICAgICAgICBjb2xvcjogJ3BpbmsnLFxuICAgICAgICAgICAgc2l6ZTogMVxuICAgICAgICAgIH1dXG4gICAgICAgIH1dXG4gICAgICB9XVxuICAgIH07XG4gICAgcmV0dXJuIDxJY2ljbGVDb21wPlxuICAgICAgb3JpZW50YXRpb249XCJ0ZFwiLFxuICAgICAgZGF0YT1kYXRhXG4gICAgICB7Lyogc2l6ZT1cInNpemVcIixcbiAgICAgIGNvbG9yPVwiY29sb3JcIiAqL31cbiAgICA8L0ljaWNsZUNvbXA+XG4gIH1cbn1cblxuSWNpY2xlLmRlZmF1bHRQcm9wcyA9IHtcbiAgaW50ZXJhY3RpdmU6IHRydWVcbn07XG5cbkljaWNsZS5wcm9wVHlwZXMgPSB7XG4gICAgLyoqXG4gICAgICogVGhlIElEIHVzZWQgdG8gaWRlbnRpZnkgdGhpcyBjb21wb25lbnQgaW4gRGFzaCBjYWxsYmFja3MuXG4gICAgICovXG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cbiAgICAvKipcbiAgICAgKiBBIGxhYmVsIHRoYXQgd2lsbCBiZSBwcmludGVkIHdoZW4gdGhpcyBjb21wb25lbnQgaXMgcmVuZGVyZWQuXG4gICAgICovXG4gICAgbGFiZWw6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblxuICAgIC8qKlxuICAgICAqIFRoZSB2YWx1ZSBkaXNwbGF5ZWQgaW4gdGhlIGlucHV0LlxuICAgICAqL1xuICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXG4gICAgLyoqXG4gICAgICogRGFzaC1hc3NpZ25lZCBjYWxsYmFjayB0aGF0IHNob3VsZCBiZSBjYWxsZWQgdG8gcmVwb3J0IHByb3BlcnR5IGNoYW5nZXNcbiAgICAgKiB0byBEYXNoLCB0byBtYWtlIHRoZW0gYXZhaWxhYmxlIGZvciBjYWxsYmFja3MuXG4gICAgICovXG4gICAgc2V0UHJvcHM6IFByb3BUeXBlcy5mdW5jXG59OyJdLCJzb3VyY2VSb290IjoiIn0=
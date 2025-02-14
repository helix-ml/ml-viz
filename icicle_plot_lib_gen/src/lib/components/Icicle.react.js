import React, {Component} from 'react';
import PropTypes from 'prop-types';
import fromKapsule from 'react-kapsule';
import IcicleD3 from '../d3/icicle-chart';
import * as d3 from "d3";


export default class Icicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value:props.value
    }
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  
  render() {
    const IcicleComp = fromKapsule(IcicleD3, {
      methodNames: ['zoomToNode']
    });

    return <IcicleComp ref={inpute => this.icicleref = inpute} orientation={'td'} data={this.props.data} size={'size'} color={(d) => {
      if(typeof d.color === 'string'){
        return d.color;
      }

      let color_padding = (this.props.high - this.props.low) * 0.5;
      const color = d3.scaleSequential(d3.interpolate("red", "blue")).domain([this.props.low - color_padding, this.props.high + color_padding]);
      return color(d.color);
    }} border= {(d) => {
      return d.border;
    }} borderWidth = {(d) => {
      return d.borderWidth;
    }} showTooltip = {(d) => {
      if(!d.hasOwnProperty('children') && typeof d.color !== 'string') {
        return true;
      }
      return false;
    }} tooltipTitle = {(d) => {
      return "accuracy: " + d.color; 
    }} height={300} width={860} onClick = {(e) => {
      console.log(e);
      let pathBuilder = "";
      let current = e.__dataNode;
      while(true) {
        pathBuilder = current.data.name + "/" + pathBuilder;
        if(current.parent == null) {
          break;
        }
        current = current.parent;
      }

      if(typeof e.color === 'string') {
        pathBuilder = pathBuilder + " recommendationval";
        // get the value from the DOM node
        const newValue = pathBuilder;
        // update the state!
        this.props.setProps({
          value: newValue
        });
        return;
      }

      if(!e.hasOwnProperty('children')) {
        return;
      }

      var hasMoreThanOneChild = false;

      var traverser = e;
      var high = -1.0;
      var low = 2.0;
      let stack = [];
      stack.push(traverser);
      while(stack.length > 0) {
        traverser = stack.pop();
        if (traverser.children) {
          if(traverser.children.length > 1) {
            hasMoreThanOneChild = true;
          }
          for(let i=0; i<traverser.children.length; i++) {
            stack.push(traverser.children[i]);
          }
        } else {
          if(traverser.color > high) {
            high = traverser.color;
          }
          if(traverser.color < low) {
            low = traverser.color;
          }
        }
      }

      if(!hasMoreThanOneChild) {
        return;
      }

      this.icicleref.zoomToNode(e);

      // get the value from the DOM node
      const newValue = pathBuilder;
      // update the state!
      this.props.setProps({
        value: newValue,
        low: low,
        high: high
      });


      // console.log(this.icicleref)
    }}/>;
  }
}

Icicle.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,

    /**
     * A label that will be printed when this component is rendered.
     */
    label: PropTypes.string.isRequired,

    /**
     * The value displayed in the input.
     */
    value: PropTypes.string,

    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    setProps: PropTypes.func,

    data: PropTypes.object.isRequired,

    low: PropTypes.number,

    high: PropTypes.number
};
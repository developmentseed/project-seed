let React = require('react');
let d3 = require('d3');
let AccessorType = require('../lib/accessor-type');

class Line extends React.Component {
  render () {
    console.log('Line', this.props);

    let line = d3.svg.line()
      .x(this.props.x)
      .y(this.props.y);

    let linestring = line(this.props.data);

    return <path className='line' data-hook={this.props.key} d={linestring}/>;
  }
}

Line.displayName = 'Line';
Line.propTypes = {
  data: React.PropTypes.array.isRequired,
  x: AccessorType.isRequired,
  y: AccessorType.isRequired,
  key: React.PropTypes.string.isRequired
};

module.exports = Line;

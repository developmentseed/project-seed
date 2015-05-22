let React = require('react');
let d3 = require('d3');
let classnames = require('classnames');
let AccessorType = require('../lib/accessor-type');

class Line extends React.Component {
  constructor (props) {
    super();
    this.state = {
      hover: false
    };
  }

  _action (action) {
    if (this.props.Actions && this.props.Actions[action]) {
      this.props.Actions[action](this.props.seriesKey);
    }
  }

  render () {
    let line = d3.svg.line()
      .x(this.props.x)
      .y(this.props.y);

    let linestring = line(this.props.data);

    let klass = classnames('line', {
      active: this.props.emphasis
    });
    return (
      <path className={klass}
        data-hook={this.props.seriesKey}
        onMouseEnter={this._action.bind(this, 'emphasize')}
        onMouseLeave={this._action.bind(this, 'deemphasize')}
        onClick={this._action.bind(this, 'select')}
        d={linestring} />
    );
  }
}

Line.displayName = 'Line';
Line.propTypes = {
  Actions: React.PropTypes.object,
  seriesKey: React.PropTypes.string,
  data: React.PropTypes.array.isRequired,
  x: AccessorType.isRequired,
  y: AccessorType.isRequired,
  emphasis: React.PropTypes.bool
};

module.exports = Line;

let React = require('react');
let d3 = require('d3');
let AccessorType = require('../lib/accessor-type');
let compose = require('../lib/compose');
let Line = require('./line');

class LineChart extends React.Component {
  render () {
    let {data, x, y, group} = this.props;

    // make string accessors into functions
    [x, y, group] = [x, y, group].map((accessor) =>
      typeof accessor === 'string' ? (d) => d[accessor] : accessor);

    // group the flat data
    let series = d3.nest()
      .key(group)
      .entries(data);

    let scaleX = d3.scale.linear()
      .domain(d3.extent(data, x))
      .range([0, 2400]);

    let scaleY = d3.scale.linear()
      .domain(d3.extent(data, y))
      .range([100, 0]);

    console.log(d3.extent(data, x), d3.extent(data, y));
    return (
      <svg viewBox='0 0 2400 100' preserveAspectRatio='none'>
        {series.map((entry) =>
          <Line
            key={entry.key}
            data={entry.values}
            x={compose(scaleX)(x)}
            y={compose(scaleY)(y)} />
        )}
      </svg>
    );
  }
}

LineChart.displayName = 'LineChart';

LineChart.propTypes = {
  data: React.PropTypes.array.isRequired,
  x: AccessorType.isRequired,
  y: AccessorType.isRequired,
  group: AccessorType.isRequired
};

module.exports = LineChart;

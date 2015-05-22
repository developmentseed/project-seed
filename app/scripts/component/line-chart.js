let React = require('react');
let d3 = require('d3');
let AccessorType = require('../lib/accessor-type');
let compose = require('../lib/compose');
let Line = require('./line');

class LineChart extends React.Component {
  render () {
    let {data, x, y, group, Actions, emphasis} = this.props;

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

    console.log(emphasis);
    return (
      <svg viewBox='0 0 2400 100' preserveAspectRatio='none'>
        {series.map((entry) =>
          <Line
            Actions={Actions}
            key={entry.key}
            seriesKey={entry.key}
            data={entry.values}
            x={compose(scaleX)(x)}
            y={compose(scaleY)(y)}
            emphasis={emphasis[entry.key]}
            />
        )}
      </svg>
    );
  }
}

LineChart.displayName = 'LineChart';

LineChart.propTypes = {
  Actions: React.PropTypes.object,
  data: React.PropTypes.array.isRequired,
  x: AccessorType.isRequired,
  y: AccessorType.isRequired,
  group: AccessorType.isRequired,
  selection: React.PropTypes.object,
  emphasis: React.PropTypes.object
};

module.exports = LineChart;

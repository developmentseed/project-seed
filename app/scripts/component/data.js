var React = require('react');
var Actions = require('../actions');
var TimeSeriesStore = require('../store/time-series');
var LineChart = require('./line-chart');

class Data extends React.Component {
  constructor () {
    super();
    this.state = { results: [] };
  }

  componentDidMount () {
    this.unsubscribe = TimeSeriesStore.listen(this.setState.bind(this));
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  render () {
    function x (datum) {
      return datum.year + (datum.month - 1) / 12;
    }

    function y (datum) {
      return +datum.vis_median;
    }

    function group (datum) {
      return datum.key;
    }

    return (
      <div>
        <h2>The Data View</h2>
        <div className='light-curves'>
          <LineChart
            Actions={Actions}
            data={this.state.results}
            x={x}
            y={y}
            group={group}
            selection={this.state.selection}
            emphasis={this.state.emphasis}
            />
        </div>
      </div>
    );
  }
}

Data.displayName = 'Data';
Data.propTypes = {
  params: React.PropTypes.object
};

module.exports = Data;

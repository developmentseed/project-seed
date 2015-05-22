var React = require('react');
var TimeSeriesStore = require('../store/time-series');
var LineChart = require('./line-chart');

class Data extends React.Component {
  constructor () {
    super();
    this.state = { results: [] };
  }

  componentDidMount () {
    console.log('mount');
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
          <LineChart data={this.state.results} x={x} y={y} group={group} />
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

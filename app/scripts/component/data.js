var React = require('react');
var TimeSeries = require('../store/time-series');

class Data extends React.Component {
  componentDidMount () {
    console.log('mount');
    this.unsubscribe = TimeSeries.listen(this.setState.bind(this));
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  render () {
    return (
      <div>
      <h2>The Data View</h2>
      {JSON.stringify(this.state)}
      </div>
    );
  }
};

Data.displayName = 'Data';
Data.propTypes = {
  params: React.PropTypes.object
};

module.exports = Data;

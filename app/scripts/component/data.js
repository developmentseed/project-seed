var React = require('react');

class Data extends React.Component {
  render () {
    return (
      <div>
        <h2>The Data View</h2>
      </div>
    );
  }
};

Data.displayName = 'Data';
Data.propTypes = {
  params: React.PropTypes.object
};

module.exports = Data;

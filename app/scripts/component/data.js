var React = require('react');

class Data extends React.Component {
  render () {
    console.log('render');
    console.log(this.props);
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

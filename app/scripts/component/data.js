var React = require('react');

module.exports = function (actions, store) {
  class Data extends React.Component {
    componentDidMount () {
      console.log('mount');
      this.unsubscribe = store.listen(this.setState.bind(this));
    }

    componentWillUnmount () {
      this.unsubscribe();
    }

    render () {
      console.log('rendering view', this.state);
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

  return Data;
};

'use strict';

var React = require('react');

class Hello extends React.Component {
  render () {
    return <div>Hello, {this.props.name}!</div>;
  }
}

Hello.displayName = 'Hello';
Hello.propTypes = {
  name: React.PropTypes.string.isRequired
};

React.render(<Hello name='fellow earthling'/>, document.body);

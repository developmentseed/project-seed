let React = require('react');

/**
 * A React PropType for use with lodash-style object accessors (string or
 * function)
 */
let AccessorType = React.PropTypes.oneOfType([
  React.PropTypes.func,
  React.PropTypes.string
]);

module.exports = AccessorType;

'use strict';
import React from 'react';
import PropTypes from 'prop-types';

export const TestDescendant = (props) => {
  return (
    <span>
      {props.testValue}
    </span>
  );
};

TestDescendant.propTypes = {
  testValue: PropTypes.string
};

export default TestDescendant;

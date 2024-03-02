import React from 'react';
import PropTypes from 'prop-types';

export default function HiddenInput(props) {
  return (
    <input 
      type="hidden"
      name={props.name}
      value={props.value} 
    />
  );
}
HiddenInput.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  name: PropTypes.string.isRequired,
};

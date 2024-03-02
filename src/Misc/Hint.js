import React from 'react';
import PropTypes from 'prop-types';

export default function Hint(props) {
  if (props.text) {
    return (
      <div className='hint' >
        {props.text}
      </div>
    );
  } else {
    return null;
  }
}
Hint.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
}
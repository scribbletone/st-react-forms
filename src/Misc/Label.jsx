import React from 'react';
import PropTypes from 'prop-types';

export default function Label(props) {
  if (props.text || props.renderIfEmpty) {
    return (
      <label 
        htmlFor={props.field}
        className={props.className}>
        {props.text}
      </label>
    );
  } else {
    return null;
  }
}
Label.propTypes = {
  text: PropTypes.string,
  field: PropTypes.string,
  className: PropTypes.string,
  renderIfEmpty: PropTypes.bool
};

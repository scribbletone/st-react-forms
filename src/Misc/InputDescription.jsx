import React from 'react';
import PropTypes from 'prop-types';

export default function InputDescription(props) {
  const {
    className = 'form-input-description'
  } = props;

  if (props.text || props.renderIfEmpty) {
    return (
      <div 
        className={className}>
        {props.text}
      </div>
    );
  } else {
    return null;
  }
}
InputDescription.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  field: PropTypes.string,
  className: PropTypes.string,
  renderIfEmpty: PropTypes.bool
};




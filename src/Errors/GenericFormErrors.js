import React from 'react';
import PropTypes from 'prop-types';

export default function GenericFormErrors(props) {
  if (props.errors && props.errors.form) {
    return (
      <div className={`form-header-errors ${props.className}`}>
        {props.errors.form}
      </div>
    );
  } else {
    return null;
  }
}

GenericFormErrors.propTypes = {
  className: PropTypes.string,
  errors: PropTypes.object
};

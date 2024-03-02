import React from 'react';

export default function FieldErrors(props) {
  if (props.errors) {
    const message = Array.isArray(props.errors) ? props.errors.join(', ') : props.errors;
    return (
      <span className='error'>
        {message}
      </span>
    );
  } else {
    return null;
  }
}
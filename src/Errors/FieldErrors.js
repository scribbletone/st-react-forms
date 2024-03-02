import React from 'react';

export default function FieldErrors(props) {
  if (props.errors) {
    return (
      <span className='error'>
        {props.errors}{' '}
      </span>
    );
  } else {
    return null;
  }
}
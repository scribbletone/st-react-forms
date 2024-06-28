import React from 'react';
import TextInput from './TextInput';

function PasswordInput(props) {
  return (
    <TextInput
      {...props}
      password={true} />
  );
}

export default PasswordInput;
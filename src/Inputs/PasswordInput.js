import React from 'react';
import TextInput from './TextInput';

const PasswordInput = props => {
  return (
    <TextInput 
      {...props}
      password={true}
    />
  );
};

export default PasswordInput;
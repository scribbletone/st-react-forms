import React from 'react';
import PropTypes from 'prop-types';
import BooleanInput from '../Inputs/BooleanInput';
import Checkboxes from '../Inputs/Checkboxes';
import FileInput from '../Inputs/FileInput';
import HiddenInput from '../Inputs/HiddenInput';
import PasswordInput from '../Inputs/PasswordInput';
import RadioOptions from '../Inputs/RadioOptions';
import TextArea from '../Inputs/TextArea';
import TextInput from '../Inputs/TextInput';

export default function InputList(props) {
  function findComponent(field){
    switch (field.componentName) {
      case 'BooleanInput':
        return BooleanInput;
      case 'Checkboxes':
        return Checkboxes;
      case 'FileInput':
        return FileInput;
      case 'HiddenInput':
        return HiddenInput;
      case 'PasswordInput':
        return PasswordInput;
      case 'RadioOptions':
        return RadioOptions;
      case 'TextArea':
        return TextArea;
      case 'TextInput':
      default:
        return TextInput;
    }
  }
  function renderFields() {
    return props.fields.map((field)=>{
      if (field) {
        let Cmp = findComponent(field);
        return (
          <Cmp
            errors={props.errors}
            key={field.name}
            name={field.name}
            label={field.label}
            hint={field.hint}
            inlineLabel={field.inlineLabel}
            description={field.description}
            onChange={(v)=>{props.onInputChange(field.name, v, field.dataType)}}
            onItemSelect={(v)=>{props.onItemSelect(field.name, v)}}
            onLoadOptions={(v,c)=>{props.onLoadOptions(field.name, v,c)}}
            defaultValue={props.data[field.name]}
            value={props.data[field.name]}
            {...field.extraProps}
          />
        );
      }
    })
  }
  return (
    <div>
      {renderFields()}
    </div>   
  );
}

InputList.propTypes = {
  fields: PropTypes.array.isRequired,
  onInputChange: PropTypes.func.isRequired,
  data: PropTypes.object
};

/* 
Example field input
[
  {
    name: 'name',
    componentName: 'TextInput',
    label: 'Name'
  },
  {
    name: 'description',
    componentName: 'TextArea',
    label: 'Description'
  }
]
*/
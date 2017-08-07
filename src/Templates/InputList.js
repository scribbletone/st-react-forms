import React from 'react';
import PropTypes from 'prop-types';
import AjaxSelectInput from '../Inputs/AjaxSelectInput';
import BooleanInput from '../Inputs/BooleanInput';
import FileInput from '../Inputs/FileInput';
import HiddenInput from '../Inputs/HiddenInput';
import PasswordInput from '../Inputs/PasswordInput';
import RadioOptions from '../Inputs/RadioOptions';
import SelectInput from '../Inputs/SelectInput';
import TextArea from '../Inputs/TextArea';
import TextInput from '../Inputs/TextInput';


export default class InputList extends React.Component {
  constructor(props) {
    super(props);
  }
  findComponent(field){
    switch (field.componentName) {
      case 'AjaxSelectInput':
        return AjaxSelectInput;
      case 'BooleanInput':
        return BooleanInput;
      case 'FileInput':
        return FileInput;
      case 'HiddenInput':
        return HiddenInput;
      case 'PasswordInput':
        return PasswordInput;
      case 'RadioOptions':
        return RadioOptions;
      case 'SelectInput':
        return SelectInput;
      case 'TextArea':
        return TextArea;
      case 'TextInput':
      default:
        return TextInput;
    }
  }
  renderFields() {
    return this.props.fields.map((field)=>{
      let Cmp = this.findComponent(field);
      return (
        <Cmp
          errors={this.props.errors}
          key={field.name}
          name={field.name}
          label={field.label}
          hint={field.hint}
          inlineLabel={field.inlineLabel}
          onChange={(v)=>{this.props.onInputChange(field.name, v, field.dataType)}}
          onItemSelect={(v)=>{this.props.onItemSelect(field.name, v)}}
          onLoadOptions={(v,c)=>{this.props.onLoadOptions(field.name, v,c)}}
          defaultValue={this.props.data[field.name]}
          value={this.props.data[field.name]}
          {...field.extraProps}
        />
      );
    })
  }
  render() {
    return (
      <div>
        {this.renderFields()}
      </div>   
    );
  }
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
import React from 'react';
import PropTypes from 'prop-types';
import Hint from '../Misc/Hint';
import Label from '../Misc/Label';
import InputDescription from '../Misc/InputDescription';
import FieldErrors from '../Errors/FieldErrors';

export default function BareSelectInput(props) {
  const {
    errors: errorsFromProps = {},
    labelClassName = '',
    className = '',
    defaultValue = 'default'
  } = props;
  
  function handleChange(e){
    props.onChange && props.onChange(e.target.value);
  }
  function renderOptions(){
    let options = []
    props.options.map((option, i) => {
      options.push(
        <option 
          key={i + '-' + option.name}
          value={option.value} >
          {option.name}
        </option>
      );
    });
    return options;
  }
  const errors = errorsFromProps[props.name];
  const errorClassName = (errors ? ' field_with_errors ' : '');
  
  const shouldShowTabIndex = typeof props.tabIndex !== 'undefined';
  const tabIndexProp = shouldShowTabIndex ? {
    tabIndex: props.tabIndex
  } : {};
  return (
    <div className={`form-input select-input--wrapper input-${props.name} ${errorClassName}`}>
      <Label
        field={props.name}
        text={props.label}
        className={`form-label select-input--label ${labelClassName}`} />
      <InputDescription 
        className={props.descriptionClassName}
        text={props.description} />
      <select 
        name={props.name}
        className={`select-input ${className}`}
        defaultValue={defaultValue || 'default'}
        onChange={(e)=>{handleChange(e)}}
        {...tabIndexProp} >
        <option disabled value='default'>{props.prompt}</option>
        {renderOptions()}
      </select>
      <Hint text={props.hint} />
      <FieldErrors 
        name={props.name}
        errors={errors} />
    </div>
  );
}

BareSelectInput.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  errors: PropTypes.object,
  description: PropTypes.string,
  descriptionClassName: PropTypes.string,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
  prompt: PropTypes.string
};

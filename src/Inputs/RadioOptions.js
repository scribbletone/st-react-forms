import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Hint from '../Misc/Hint';
import Label from '../Misc/Label';
import InputDescription from '../Misc/InputDescription';
import FieldErrors from '../Errors/FieldErrors';

export default function RadioOptions(props) {
  const {
    errors:errorsFromProps = {},
    defaultValue = '',
    newValue = null,
    options = []
  } = props;

  const [value, setValue] = useState(defaultValue);

  useEffect(()=>{
    setNextValue(newValue);
  },[newValue]);

  function setNextValue(nextValue){
    setValue(nextValue);
    props.onChange && props.onChange(nextValue);
  }
  function handleChange(nextValue){
    setNextValue(nextValue);
  }
  function renderOptions(){
    return options.map((option)=>{
      return (
        <label 
          key={`option-${option.value}`}
          className='radio-input'>
          <input 
            name={props.name}
            type="radio" 
            value={option.value} 
            className='radio-input--option'
            checked={(option.value == value)}
            onChange={()=>{handleChange(option.value)}}
          />
          <span className='radio-input--option-label'>
            {option.label}
          </span>
        </label>
      )
    });
  }
  const errors = errorsFromProps[props.name];
  const errorClassName = (errors ? ' field_with_errors ' : '');
  
  return (
    <div className={`form-input radio-input--wrapper input-${props.name} ${errorClassName}`}>
      <Label
        field={props.name}
        text={props.label}
        className={`form-label radio-input--label ${props.labelClassName}`} />
      <InputDescription 
        className={props.descriptionClassName}
        text={props.description} />
      {renderOptions()}
      <Hint text={props.hint} />
      <FieldErrors 
        name={props.name}
        errors={errors} />
    </div>
  );
}

RadioOptions.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool
  ]),
  errors: PropTypes.object,
  description: PropTypes.string,
  descriptionClassName: PropTypes.string,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  wrapperClassName: PropTypes.string,
  newValue: PropTypes.string,
  options: PropTypes.array
};

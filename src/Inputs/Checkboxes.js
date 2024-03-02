import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Hint from '../Misc/Hint';
import Label from '../Misc/Label';
import InputDescription from '../Misc/InputDescription';
import FieldErrors from '../Errors/FieldErrors';
import {usePrevious} from '../Hooks/UsePrevious';

export default function Checkboxes(props) {
  const {
    errors:errorsFromProps = {},
    defaultValue = '',
    newValue = null,
    options = []
  } = props;

  const [value, setValue] = useState(defaultValue);

  const prevNewValue = usePrevious(newValue);

  useEffect(()=>{
    if (newValue != prevNewValue) {
      setNextValue(newValue, props.preventUpdateOnNewValue);
    }
  },[newValue]);

  function setNextValue(nextValue, preventUpdateOnNewValue){
    setValue(nextValue);

    if (!preventUpdateOnNewValue) {
      props.onChange && props.onChange(nextValue);
    }
  }
  function handleChange(r, optionValue){
    let values = value.split(',');
    if (optionChecked(optionValue)) {
      values = values.filter((v)=>{
        return v != optionValue;
      })
    } else {
      values.push(optionValue);
    }
    values = values.filter((v)=>{return v != ''})
    setNextValue(values.join(','));
  }
  function optionChecked(v){
    return v.split(',').indexOf(v) >= 0;
  }
  function renderOptions(){
    return options.map((option)=>{
      const checkedClass = optionChecked(option.value) ? 'checkbox-input--checked' : '';
      return (
        <label 
          key={`option-${option.value}`}
          className={`checkbox-input ${checkedClass}`}>
          <input 
            name={props.name}
            type="checkbox" 
            value={option.value} 
            className='checkbox-input--option'
            checked={optionChecked(option.value)}
            onChange={(r)=>{handleChange(r, option.value)}}
          />
          <span className='checkbox-input--option-label'>
            {option.label}
          </span>
        </label>
      )
    });
  }
  const errors = errorsFromProps[props.name];
  const errorClassName = (errors ? ' field_with_errors ' : '');
  
  return (
    <div className={`form-input checkbox-input--wrapper input-${props.name} ${errorClassName}`}>
      <Label
        field={props.name}
        text={props.label}
        className={`form-label checkbox-input--label ${props.labelClassName}`} />
      <InputDescription 
        className={props.descriptionClassName}
        text={props.description} />
      <div className='checkbox-input--checkboxes'>
        {renderOptions()}
      </div>
      <Hint text={props.hint} />
      <FieldErrors 
        name={props.name}
        errors={errors} />
    </div>
  );
}

Checkboxes.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  errors: PropTypes.object,
  description: PropTypes.string,
  descriptionClassName: PropTypes.string,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  wrapperClassName: PropTypes.string,
  newValue: PropTypes.string,
  options: PropTypes.array,
  preventUpdateOnNewValue: PropTypes.bool
};

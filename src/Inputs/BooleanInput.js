import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Hint from '../Misc/Hint';
import FieldErrors from '../Errors/FieldErrors';
import InputDescription from '../Misc/InputDescription';

export default function BooleanInput(props) {
  const {
    errors:errorsFromProps = {},
    defaultValue = '',
    newValue = null
  } = props;

  const [value, setValue] = useState(defaultValue);

  useEffect(()=>{
    setNextValue(newValue, true);
  }, [newValue]);

  function setNextValue(nextValue, ignoreCallback){
    setValue(nextValue);

    if (!ignoreCallback) {
      props.onChange && props.onChange(nextValue);  
    }
  }
  function handleChange(e){
    setNextValue(e.target.checked);
  }

  const errors = errorsFromProps[props.name];
  const errorClassName = (errors ? ' field_with_errors ' : '');

  const safeVal = (value === null) ? '' : value;
  return (
    <div className={`form-input boolean-input--wrapper input-${props.name} ${errorClassName}`}>

      {props.label ? 
        <div className={`form-label boolean-input--label ${props.labelClassName}`}>
          {props.label}
        </div>
      : null }
      <InputDescription 
        className={props.descriptionClassName}
        text={props.description} />
      <label 
        className='boolean-input' >
        <input 
          type="checkbox" 
          name={props.name} 
          className='boolean-input--input'
          value={safeVal}
          checked={safeVal}
          onChange={(e)=>{handleChange(e)}} 
        />
        <span 
          className="boolean-input--inline-label">
            {props.inlineLabel}
        </span>
      </label>
      <Hint text={props.hint} />
      <FieldErrors 
        name={props.name}
        errors={errors} />
    </div>
  );
}

BooleanInput.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool
  ]),
  errors: PropTypes.object,
  inlinedescription: PropTypes.string,
  descriptionClassName: PropTypes.string,
  label: PropTypes.string,
  inlineLabelClassName: PropTypes.string,
  description: PropTypes.string,
  descriptionClassName: PropTypes.string,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  wrapperClassName: PropTypes.string,
  newValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool
  ])
};

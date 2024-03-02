import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Hint from '../Misc/Hint';
import Label from '../Misc/Label';
import InputDescription from '../Misc/InputDescription';
import FieldErrors from '../Errors/FieldErrors';
import {usePrevious} from '../Hooks/UsePrevious';

export default function FileInput(props) {
  const {
    errors:errorsFromProps = {},
    defaultValue = '',
    newValue = null
  } = props;

  const [value, setValue] = useState(defaultValue);

  const prevNewValue = usePrevious(newValue);

  useEffect(()=>{
    if (newValue != prevNewValue) {
      setNextValue(newValue);
    }
  },[newValue]);

  function setNextValue(nextValue){
    setValue(nextValue);
    props.onChange && props.onChange(nextValue);
  }
  function handleChange(e){
    setNextValue(e.target.checked);
  }
  const errors = errorsFromProps[props.name];
  const errorClassName = (errors ? ' field_with_errors ' : '');
  return (
    <div className={`form-input file-input--wrapper input-${props.name} ${errorClassName}`}>
      <Label
        field={props.name}
        text={props.label}
        className={`form-label file-input--label ${props.labelClassName}`}/>
      <InputDescription 
        className={props.descriptionClassName}
        text={props.description} />
      <input 
        type="file" 
        name={props.name}
        className={`file-input ${props.className}`}
        onChange={(e)=>{handleChange(e)}} />
      <Hint text={props.hint} />
      <FieldErrors 
        name={props.name}
        errors={errors} />
    </div>
  );
}

FileInput.propTypes = {
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
  newValue: PropTypes.string
};
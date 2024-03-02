import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Hint from '../Misc/Hint';
import Numeral from 'numeral';
import Label from '../Misc/Label';
import InputDescription from '../Misc/InputDescription';
import FieldErrors from '../Errors/FieldErrors';
import Slugify from 'slugify';
import {usePrevious} from '../Hooks/UsePrevious';

Numeral.nullFormat('');
Numeral.register('locale', 'en-custom', {
  ...Numeral.localeData('en'),
  abbreviations: {}
});
Numeral.locale('en-custom');

export default function TextInput(props) {
  const {
    autoFocus = false,
    errors:errorsFromProps = {},
    format = 'none',
    defaultValue = '',
    newValue = '',
    autoFill = ''
  } = props;

  const [value, setValue] = useState(defaultValue);
  const [formattedValue, setFormattedValue] = useState(formatValue(defaultValue));
  const [focused, setFocused] = useState(false);

  const prevNewValue = usePrevious(newValue);

  useEffect(()=>{
    if (newValue != prevNewValue) {
      setNextValue(newValue);
    }
  },[newValue]);

  function setNextValue(nextValue){
    const cleanedValue = cleanValue(nextValue);
    const formattedValue = formatValue(cleanedValue);

    setValue(nextValue);
    setFormattedValue(formattedValue);

    props.onChange && props.onChange(nextValue, formattedValue);
  }
  function handleChange(e){
    setNextValue(e.target.value);
  }
  function handleFocus(e){
    setFocused(true);
    props.onFocus && props.onFocus(value, formattedValue);
  }
  function handleBlur(e){
    setFocused(false);
    props.onBlur && props.onBlur(value, formattedValue);
  }
  function trimValue(v){
    if (props.maxLength) {
      return v.slice(0, props.maxLength);
    } else {
      return v;
    }
  }
  function uniqArray(inArr){
    return inArr.filter((elem, pos, newArr) => {
      return newArr.indexOf(elem) == pos;
    });
  }
  function allZeros(v){
    const values = uniqArray(v.toString().split('').map((v)=>{return v}));
    return (values.length == 1) && (values[0] == "0");
  }
  function cleanValue(v){
    let newVal = trimValue(v);

    switch (format) {
      case 'number':
        if (allZeros(newVal)) {
          return newVal;
        } else {
          return Numeral(newVal).format('0');
        }
      case 'unformattedNumber':
        return Numeral(newVal).format('0');
      case 'parameterize':
        return Slugify(newVal, {remove: /[$*+~#.`()#%^=\[\]{};,\\\/\?'"‘’“”!:@]/g});
      case 'none':
      default:
        return v;
    }
  }
  function formatValue(v){
    switch (format) {
      case 'number':
        return Numeral(v).format(',');
      case 'unformattedNumber':
        return Numeral(v).format('0');
      case 'none':
      default:
        return v;
    }
  }
  const errors = errorsFromProps[props.name];
  const errorClassName = (errors ? ' field_with_errors ' : '');
  
  return (
    <div className={`form-input text-input--wrapper input-${props.name} ${errorClassName}`}>
      <Label
        field={props.name}
        text={props.label}
        className={`form-label text-input--label ${props.labelClassName}`} />
      <InputDescription 
        className={props.descriptionClassName}
        text={props.description} />
      <input 
        autoComplete={autoFill}
        autoFocus={autoFocus}
        type={props.password ? 'password' : 'text'}
        name={props.name}
        className={`text-input ${props.className}`}
        value={(focused ? value : formattedValue) || ''}
        onFocus={(e)=>handleFocus(e)}
        onBlur={(e)=>handleBlur(e)}
        onChange={(e)=>{handleChange(e)}}
        placeholder={props.placeholder} />
      <Hint text={props.hint} />
      <FieldErrors 
        name={props.name}
        errors={errors} />
    </div>
  );
}

TextInput.propTypes = {
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
  ]),
  errors: PropTypes.object,
  format: PropTypes.string,
  description: PropTypes.string,
  descriptionClassName: PropTypes.string,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  maxLength: PropTypes.number,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  password: PropTypes.bool,
  placeholder: PropTypes.string,
  wrapperClassName: PropTypes.string,
  newValue: PropTypes.string,
  autoFill: PropTypes.string
};

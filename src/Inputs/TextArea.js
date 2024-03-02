import React, {useState, useRef} from 'react';
import PropTypes from 'prop-types';
import DomStyle from '../Utils/DomStyle';
import Hint from '../Misc/Hint';
import Label from '../Misc/Label';
import FieldErrors from '../Errors/FieldErrors';
import InputDescription from '../Misc/InputDescription';

export default function TextArea(props) {
  const {
    autoFocus = false,
    defaultInputHeight = 40,
    defaultValue = '',
    errors:errorsFromProps = {},
    newValue = '',
    resizable = true
  } = props;

  const [inputHeight, setInputHeight] = useState(defaultInputHeight);
  const [value, setValue] = useState(defaultValue);
  const [focused, setFocused] = useState(false);

  const textareaRef = useRef(null);

  useEffect(()=>{
    setFilledTextareaHeight();
  },[]);

  useEffect(()=>{
    setNextValue(newValue);
  },[newValue]);

  function setNextValue(nextValue){
    setValue(nextValue);
    props.onChange && props.onChange(nextValue);
  }
  function setFilledTextareaHeight() {
    const el = textareaRef.current;
    const borderTop = parseInt(DomStyle.getProperty(el, 'border-top-width'));
    const borderBottom = parseInt(DomStyle.getProperty(el, 'border-bottom-width'));
    const scrollHeight = el.scrollHeight;
    setInputHeight(scrollHeight  + borderTop + borderBottom);
  }
  function handleChange(e){
    setNextValue(e.target.value);
    setFilledTextareaHeight();
  }
  function handleFocus(e){
    setFocused(true);
    props.onFocus && props.onFocus(value);
  }
  function handleBlur(e){
    setFocused(false);
    props.onBlur && props.onBlur(value);
  }
  function renderInput(){
    const style = (resizable ? 
      {
        height: inputHeight
      } 
      : {});
    return (
      <textarea 
        ref={textareaRef}
        autoFocus={autoFocus}
        name={props.name}
        className={`text-area ${props.className}`}
        value={value || ''}
        onFocus={(e)=>handleFocus(e)}
        onBlur={(e)=>handleBlur(e)}
        onChange={(e)=>{handleChange(e)}}
        placeholder={props.placeholder}
        style={style} />
      );
  }
  const errors = errorsFromProps[props.name];
  const errorClassName = (errors ? ' field_with_errors ' : '');
  
  return (
    <div className={`form-input text-area--wrapper input-${props.name} ${errorClassName}`}>
      <Label
        field={props.name}
        text={props.label}
        className={`form-label text-area--label ${props.labelClassName}`} />
      <InputDescription 
        className={props.descriptionClassName}
        text={props.description} />
      {renderInput()}
      <Hint text={props.hint} />
      <FieldErrors 
        name={props.name}
        errors={errors} />
    </div>
  );
}

TextArea.propTypes = {
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  defaultInputHeight: PropTypes.number,
  defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
  ]),
  description: PropTypes.string,
  descriptionClassName: PropTypes.string,
  errors: PropTypes.object,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  name: PropTypes.string,
  newValue: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  resizable: PropTypes.bool,
  wrapperClassName: PropTypes.string
};

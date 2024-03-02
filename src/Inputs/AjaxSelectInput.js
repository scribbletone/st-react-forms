import React, {useState, useRef} from 'react';
import PropTypes from 'prop-types';
import Hint from '../Misc/Hint';
import Label from '../Misc/Label';
import InputDescription from '../Misc/InputDescription';
import FieldErrors from '../Errors/FieldErrors';
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';
import {useTimeout} from '../Hooks/UseTimeout';

export default function AjaxSelectInput(props) {
  const {
    allowEmptySearch = false,
    autoload = false,
    className = '',
    defaultOptions:defaultOptionsFromProps = [],
    errors:errorsFromProps = {},
    joinValues = true,
    labelClassName = '',
    labelKey = 'label',
    multi = false,
    name = 'text-array',
    placeholder = 'Search...',
    requestBuffer = 500,
    simpleValue = true,
    wrapperClassName = '',
    valueKey = 'value'
  } = props;

  const [value, setValue] = useState(props.value || '');
  
  const [isTyping, setIsTyping] = useState(false);
  const selectInputRef = useRef(null);

  const typingValue = useRef(props.value || '');
  const loadOptionsCallbackRef = useRef(null);

  useTimeout(() => {
    props.onLoadOptions(typingValue.current, (options)=>{
      loadOptionsCallbackRef.current && loadOptionsCallbackRef.current(null, {options})
    });
    setIsTyping(false);
  }, isTyping ? requestBuffer : null);

  function handleItemSelect(v) {
    if (props.onSelectResetsInput) {
      setValue(null);
    } else {
      setValue(v);
    }
    props.onItemSelect && props.onItemSelect(value)
  }
  function handleInputChange(value) {
    props.onInputChange && props.onInputChange(value);
  }
  function handleLoadOptions(input, callback) {
    // callback(null, {options: defaultOptions()})
    if (input || allowEmptySearch) {
      setIsTyping(true);
      // move to timeout
      loadOptionsCallbackRef.current = callback;
      typingValue.current = input
    } else {
      loadOptionsCallbackRef.current = null;
      typingValue.current = input
      callback(null, {options: defaultOptions()})
    }
  }
  function defaultOptions() {
    return defaultOptionsFromProps.filter((opt)=>{
      return opt;
    });
  }
  const errors = errorsFromProps[name];
  const errorClassName = (errors ? ' field_with_errors ' : '');
  const Cmp = (props.creatable ? ReactSelect.AsyncCreatable : ReactSelect.Async);
  return (
    <div className={`form-input select-input--wrapper input-${name} ${errorClassName} ${wrapperClassName}`}>
      <Label
        field={name}
        text={props.label}
        className={`form-label select-input--label ${labelClassName}`} />
      <InputDescription 
        className={props.descriptionClassName}
        text={props.description} />
      <Cmp
        ref={selectInputRef}
        autoload={autoload || defaultOptions().length > 0}
        className={`select-input ${className}`}
        joinValues={joinValues}
        labelKey={labelKey}
        loadOptions={(i,c)=>{handleLoadOptions(i,c)}}
        multi={multi}
        name={name}
        onChange={(v)=>{handleItemSelect(v)}}
        onInputChange={(v)=>{handleInputChange(v)}}
        placeholder={placeholder}
        simpleValue={simpleValue}
        value={value}
        valueKey={valueKey}
        valueRenderer={props.renderValue}
        valueComponent={props.valueComponent}
        optionRenderer={props.optionRenderer}
        optionComponent={props.optionComponent}
        
        openOnFocus={props.openOnFocus}
        openOnClick={props.openOnClick}
        autosize={props.autosize}
        onFocus={props.onFocus}
        onBlur={props.onBlur}

        onSelectResetsInput={props.onSelectResetsInput}
        filterOptions={props.filterOptions}
        filterOption={props.filterOption}
        cache={props.cache}
        autoBlur={props.autoBlur}
        noResultsText={props.noResultsText}
        searchPromptText={props.searchPromptText}

        autoComplete={props.autoComplete}
        inputProps={{name: 'search', autoComplete: props.autoFill}}

        // creatable props
        isOptionUnique={props.isOptionUnique}
        isValidNewOption={props.isValidNewOption}
        newOptionCreator={props.newOptionCreator}
        onNewOptionClick={props.onNewOptionClick}
        shouldKeyDownEventCreateNewOption={props.shouldKeyDownEventCreateNewOption}
        promptTextCreator={props.promptTextCreator}
      />
      <Hint text={props.hint} />
      <FieldErrors 
        name={name}
        errors={errors} />
    </div>
  );
}

AjaxSelectInput.propTypes = {
  onLoadOptions: PropTypes.func.isRequired,
  allowEmptySearch: PropTypes.bool,
  autoload: PropTypes.bool,
  className: PropTypes.string,
  errors: PropTypes.object,
  description: PropTypes.string,
  descriptionClassName: PropTypes.string,
  joinValues: PropTypes.bool,
  description: PropTypes.string,
  descriptionClassName: PropTypes.string,
  label: PropTypes.string,
  labelKey: PropTypes.string,
  multi: PropTypes.bool,
  name: PropTypes.string,
  onInputChange: PropTypes.func,
  onItemSelect: PropTypes.func,
  placeholder: PropTypes.string,
  simpleValue: PropTypes.bool,
  renderValue: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
    PropTypes.string,
    PropTypes.object
  ]),
  valueKey: PropTypes.string
};